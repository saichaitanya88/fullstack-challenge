docker build -t mongodb .
docker run -p 0.0.0.0:27017:27017 -p 0.0.0.0:28017:28017 mongodb