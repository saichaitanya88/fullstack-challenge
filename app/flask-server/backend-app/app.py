"""
AUTHOR : PRATIK DHAGE
RESTful API using flask, PyMongo, MongoDB for the collection cities
"""
from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_path='/static')

cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})

# app.config['MONGO_DBNAME'] = 'rest_python_mongo'
# """
# app.config['MONGO_URI'] = 'mongodb://pratikdhage:thedarkknightrises@ds125113.mlab.com:25113/angularjs-python-mongo'
# """
# app.config['MONGO_URI'] = 'mongodb://127.0.0.1:27017/testdb2' #  # mongodb://mongodb/testdb2
app.config['MONGO_URI'] = 'mongodb://mongodb/testdb2'

mongo = PyMongo(app)

def reverse_string(input_string):
    return input_string[::-1]


@app.route('/todo/api/v1.0/')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def index():
    return render_template("cities.html")


# HTTP GET request for displaying all cities
@app.route('/todo/api/v1.0/cities/', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def get_all_city_records():
    cities = mongo.db.cities
    output = []
    for q in cities.find():
        output.append(map_city_to_dto(q))
    return jsonify({'output': output})


# HTTP POST request for adding new city
@app.route('/todo/api/v1.0/cities/', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def add_city_state():
    cities = mongo.db.cities
    cityname = request.json['cname']
    state = request.json['state']
    zip = request.json['zip']
    userAgent = request.json['userAgent']
    city_id = cities.insert({'cname': cityname, 'state': state, "zip": zip, 'userAgent': userAgent})
    new_city = cities.find_one({'_id': city_id})
    output = map_city_to_dto(new_city)
    return jsonify({'output': output})


# HTTP GET request for getting a particular city
@app.route('/todo/api/v1.0/cities/<string:cname>', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def get_city_record(cname):
    cities = mongo.db.cities
    q = cities.find_one({'cname': cname})
    if q:
        output = map_city_to_dto(q)
    else:
        output = 'Sorry !....record not exists.'
    return jsonify({'output': output})


# HTTP PUT request for modifying existing city
@app.route('/todo/api/v1.0/cities/<string:cname>', methods=['PUT'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def update_state(cname):
    data = request.get_json()
    mongo.db.cities.update({'cname': cname}, {'$set': data})
    return jsonify({'output': "success"})


# HTTP DELETE request for deleting/removing a particular city
@app.route('/todo/api/v1.0/cities/<string:cname>', methods=['DELETE'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def delete_city_record(cname):
    cities = mongo.db.cities
    q = cities.find_one({'cname': cname})
    if q:
        output = q['cname']
        mongo.db.cities.delete_one({'cname': cname})
    else:
        output = 'Sorry !....no results found.'
    return jsonify({'output': output})

def map_city_to_dto(q):
    return ({
            'cname': q['cname'], 
            'state': q['state'], 
            'cnameReversed': q['cname'][::-1], 
            'zip': q.get('zip', None),
            'userAgent': q.get('userAgent', None)
        })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8001, debug=True)
