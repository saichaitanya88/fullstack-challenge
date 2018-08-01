FROM mongo
RUN mongod --fork --logpath /var/log/mongodb.log --bind_ip_all
# EXPOSE 27019/27017
# EXPOSE 28019:28017

# docker run -p 0.0.0.0:2707017 -p 0.0.0.0:28017:28017 mongodb