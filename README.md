# pingpongchallenge

Instructions for building and running the interview Ping/Pong Challenge Application:

Prerequisites: 
•	These applications (angular web app, expressjs api server) built with NodeJS version 10.14.1 
o	I believe the applications should work using anything above nodejs version 8.6
•	The Angular7 web application was created and built using the latest Angular CLI.  I have included instructions on how to install the Angular CLI.  

File Description: 

The interview.zip file contains two folders: 
•	web: this contains the Angular application
•	server: this contains the nodejs express API server.  
o	NOTE: Once the Angular app is built (instructions to follow), this API server will also serve up the Angular web application form this server.

Instructions:

Unzip the contents of the ZIP file.  

Building and running the API web server:

Go into the top level "server" folder and run the following command to retrieve the necessary nodejs dependencies for the server.

npm install

After this, you can run the server by typing the following in the "server" folder:

npm start

This will start nodemon (which is a nodejs utility that runs a node app in a way that watches the server for changes and should relaunch in the event of a crash).

When this is running, this will expose the following API endpoints on localhost:3000.  You can use an HTTP tool like postman (https://www.getpostman.com) to try them out.



GET http://localhost:3000/api/actions
This API will list all of the PING and PONG actions that have already taken place.  It will begin with a "START" action, signifying that no actions have been taken and will be followed by "PING" and "PONG" actions, along with a timestamp when they occur.

GET http://localhost:3000/api/latestAction
This API call will only return the very last action taken.  It is used by the web application to determine the next allowed action.

POST http://localhost:3000/api/ping
This POST API call will execute a PING action.  It will only allow the PING if we have just started the app or if the previous action was a PONG.  A 400 error is returned if you execute two PING calls in a row.

POST http://localhost:3000/api/pong
This POST API call will execute a PONG action.  It will only allow the PONG if the previous action was a PING.  A 400 error is returned if you execute two PONG calls in a row.

 








 
Building and running the Angular Web Application:

Now that the API server is built, you can build the associated Angular7 web application.  To do this, do the following:

NOTE: assumes you are using version 10 of nodejs (although I think any version above 8.6 will probably work).

In order to build the Angular web application, you will need to get the latest Angular CLI (https://cli.angular.io/).  To install the Angular CLI go to a command prompt and type the following

npm install -g @angular/cli

Next into the top level "web" folder.  From inside this folder, execute the following command to download the dependencies for the web application:

npm install

Once the dependencies are downloaded, you will be able to build the application by typing the following command:

npm run build

Once the application is build, you will be able to serve it from the the API server application (assuming it is still running) by going to the following url:

http://localhost:3000

This will server up the page that will list the PING and PONG actions that have been taken.  

 

To execute a PING, go to the following page in the browser:
http://localhost:3000/ping

This will display the following page:
 


Note: If the last action was a PONG, you can press the PING button.  The refresh button is used to refresh the page in case the latest action was changed. 

If the last action was already a PING, you would see the following:
 
To execute a PONG, go to the following page in the browser:
http://localhost:3000/pong

This will display the following page:

 
If the last action was a PING, you would see the screen above.  Pressing the PONG button would be allowed.  If the last action was already a PONG, you would see the following page:

 



Improvements:
Creating an Angular application and a NodeJS API application takes a bit of boiler plate to get right.  The application I provided above was what I was able to do in the time allotted.

I realized that when I was done, I missed the mark on what this challenge was trying to get at.  Given more time and thought, I would do the following:

•	Create two different NodeJS server applications.  One PING server and one PONG server.
•	Use PUB/SUB messaging (maybe using a queuing library or Redis) to keep the two servers in sync with each other so that they would know the last Action (PING or PONG) that was executed.
•	Then create two small Angular web applications that would could be served up by each node server application, one PING web app and one PONG web app.
•	Two make them look more presentable, I would include the Angular Material library.
•	I would also include the Swagger library so that we could have a better API experience allowing a user to see a Swagger development portal as opposed to having to use a tool like Postman to exercise the API.


