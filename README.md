# ENSSAT Vue PWA

This project aims at realizing a progressive web app (PWA) exploiting the vue framework for building the user interface and NodeJS for the implementation of the backend development. The service offered by the app consists in :
1. Displaying the schedule for a specific degree ( selected by the user ) offered by the ENSSAT school. 
2. A chat with different channels that offers different options based on the type of the user that is logged in.
   - _ADMIN_: They can send new messages over the channels.
   - _NORMAL_ USER: They can only read the messages emitted by the admins on the several channels.
   
The project consists of two main components:

###### 1. App
The app, realized in vue js, deals with displaing the user interface trough which the user can use the service. In particular it shows the calendar and chat view.

###### 2. Server
Realized with NodeJS, it deals with:
- Fetching the calendars from the main ENSSAT schedule site and stores it ( in particular such task is executed daily at 1am ).
- Initialize the websocket for the implementation of the chat.
- Stores the messages sent by the admins in a lowDB database.

# Deployment over internet
For all the hosts you will be asked for creating a profile. 
Before starting, create two new repository on your github account: one for the app and one for the server. Place in the respective repository the files included in the 'app' folder and the ones in the 'server' folder.  

## Deployment of the server on Heroku.com
   1. Create a new project. 
      ( The name of the project will be used as part of the URL of your server: https://<Name of your project>.herokuapp.com/)
   2. Go on the section 'Deploy'. 
      a. Select 'Github' on the Deployment method section
      b. On the section 'App connected to Github' connect the repository containing the files for the server.
      c. At the bottom of the page, on the section 'Manual deploy', click on the button 'Deploy Branch'.
   3. Open the app. To test if the server is running, you can visit the page 'https://<Name of your project>.herokuapp.com/'. You should get a white page with the writing ' Server launched .. ' 

   ( If some errors occur during the launch on the server, you can check the logs on 'View logs' by clicking on the button 'More' placed at the top of the same page where the building process occurs )
  
## Deployment of the vue app on Netlify.com
   ***IMPORTANT : Change the _**URL.domain**_ attribute in the _config.json_ file ( you find it in the ROOT of the folder 'app' ) by setting the URL of the server deployed before. Push the changes on the repository on github.*** 
   1. On your project page ( that is the 'team' page based on Netlify terms), click on 'New site from Git'.
   2. A page will pop up. On this page, click on 'Github'.
   3. After having authorized github, on the same page as before, select your repository containing the files for the app.
   4. Click on 'Deploy site' at the bottom of the page.
   5. Click on 'Preview' at the top of the page to launch the site.
   6. Enjoy.
   
