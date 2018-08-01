Issues encountered: 
1. Issue with pymongo3. keeps complaining about `serverselectiontimeouterror`.
2. had to create and update my machine to make sure that dockerfile allows running docker separately so that I can build app.py without problems
3. had to test again with docker-compose.. same connectivity issues. 
4. Angular1 is so old! :) I haven't used it in years. 
5. Setting up docker on my laptop - version 1.11.2 -> latest
6. package.json missing on the angular-client folder. I had trouble setting up my npm test command. had error module `lib/cli` not found

Challenge:
    For each city / state render the field in a column in the table as it is recorded in MongoDB.
        - Isn't this already implemented in the starter code? 
    For each city render an additional column in the table where the string is reversed. This operation should be executed server side.
        - server-side ok
        - 
    Add a new field to capture zipcodes to the application 
        - server-side ok
        - client-side
    Display to the user if their browser has webgl enabled
        - From: https://developer.mozilla.org/en-US/docs/Learn/WebGL/By_example/Detect_WebGL
        ```
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl &&  gl instanceof WebGLRenderingContext){
            console.log("WegGL is enabled");
        }
        ```
        - 
    When a new record is added, record and render user agent in the table. (The user agent might be too long to render neatly into the table, shorten the user agent to only render the machine name, like “Macintosh”
        - https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent


Bonus Points:
    Catch and gracefully handle API errors client side 
    Write unit tests for features add in the challenge
    Create an Angular directive that will populate the zip codes when not present in the db
    Modify / customize the header responses from the server
    Make the DB is persistent
        - Possible if we mount a folder into docker-container


Development Notes (possibly not relevant for the test):
    Several things are missing on the server-side:
        - Field data type checks
        - PUT assumes success. Doesn't work when we update non-existing records. 
    Several things are missing in the front-end:
        - user can edit records while save in progress
        - no-feedback that records are being loaded in the background
        - 

Other notes: 
startup mongodb docker:
	docker build -t mongodb .
	docker run mongodb
startup flask
startup each project separately with dockerfile runs
