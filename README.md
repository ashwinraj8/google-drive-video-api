# google-drive-video-api

# About
This app allows you to download and upload a video file from Google Drive. It makes use of the API offered by gdrive. It operates in a nodejs environment.

#How to run
To launch this application, the user must have a node js environment installed on their PC. After cloning this application, the prerequisites may be installed with git init.
Now, under Google Cloud, establish a service account for Gdrive to obtain the authentication key for accessing the Gdrive API. After obtaining the API key, save it under the name 'apikeys.json' in the root directory. Put all of the keys in this file.
Run the script node app.js in the console. This will launch the server.

#Running API
To use the API for downloading and uploading videos, launch any app that can contact the endpoint, such as postman. Then make a post request to this end point -> 'http://localhost:3000/download-and-upload/'. Make sure user first provide the destination gdrive folder id in required places in the application.
Then, in the nodejs console, check the download progress; it will indicate the percentage of data (chunks) being downloaded in realtime. Once the download is complete, 
the upload will begin immediately and display the completion percentage of data (chunks) in the terminal. Once all of the events have been completed, 
a response will be provided in the console as well as in Postman, with the 'File id' and Gdrive directory id.


#Further enhancements.
On the future, I plan to add UI to this app to make it more interactive for users and allow them to see real-time data on the frontend.
