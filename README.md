# ENSSAT Vue PWA


---

## Introduction

This project aims at realizing a progressive web app (PWA) exploiting the vue framework for building the user interface, and NodeJS for the implementation of the backend. The service offered by the app consists in :
1. Displaying the schedule for a specific degree ( selected by the user ) offered by the ENSSAT school.
  * ![Image of calendar view](https://github.com/95gas/ENSSAT-Vue-PWA/blob/main/app/src/views/Home.png)

2. A chat with different channels that offers different options based on the type of the user that is logged in.
   - _ADMIN_: They can send new messages over the channels.

   ![Image of admin chat view](https://github.com/95gas/ENSSAT-Vue-PWA/blob/main/app/src/views/NewsAdmin.png)
   
   - _NORMAL_ USER: They can only read the messages emitted by the admins on the several channels.

   ![Image of user chat view](https://github.com/95gas/ENSSAT-Vue-PWA/blob/main/app/src/views/NewsClient.png)
   
The project consists of two main components:

###### 1. App
The app, realized in vue js, deals with displaying the user interface trough which the user can use the service. In particular, it shows the calendar and the chat view.

###### 2. Server
Realized with NodeJS, it deals with:
- Fetching the calendars from the ENSSAT scheduling platform and stores them ( in particular such task is executed daily at 1am ).
- Initializing the websocket for the implementation of the chat.
- Storing the messages sent by the admins in a lowDB database.

---

## Technologies
FRONTEND:
* Vue.JS  v3.0.0
* [v-calendar](https://vcalendar.io/) package - For rendering the calendar.
* [Vue-Socket.io-Extended](https://github.com/probil/vue-socket.io-extended/tree/alpha) package - For implementing the chat.

BACKEND:
* Node.JS v14.16.0
* [LowDB](https://github.com/typicode/lowdb) database - For storing the messages.
* [socket-io](https://www.npmjs.com/package/socket.io) - For reading the messages sent on the chat.
* [Node-ical](https://www.npmjs.com/package/node-ical) - For reading the ics file from URL.
* [ical-generator](https://www.npmjs.com/package/ical-generator) - For generate the ics file from URL.

---

## Deployment over internet
For all the web hosting platforms you will be asked for creating a profile. 
Before starting, create two new repositories on your github account: one for the app and one for the server. Place in the respective repository the files included in the 'app' folder and the ones in the 'server' folder.  

### Deployment of the server on [Heroku.com](https://www.heroku.com/)
   1. Create a new project. 
      ( The name of the project will be used as part of the URL of your server: 'https://_Name_of_your_project_.herokuapp.com/')
   2. Go on the section 'Deploy'. 
      a. Select 'Github' on the Deployment method section
      b. On the section 'App connected to Github' connect the repository containing the files for the server.
      c. At the bottom of the page, on the section 'Manual deploy', click on the button 'Deploy Branch'.
   3. Open the app. To test if the server is running, you can visit the page 'https://_Name_of_your_project_.herokuapp.com/''. You should get a white page with the writing ' Server launched .. ' 

   ( If some errors occur during the launch of the server, you can check the logs on 'View logs' by clicking on the button 'More' placed at the top of the same page where the building process occurs )
  
### Deployment of the vue app on [Netlify.com](https://www.netlify.com/)
   ***IMPORTANT : Change the _**URL.domain**_ attribute in the _config.json_ file ( you find it in the ROOT of the folder 'app' ) by setting the URL of the server deployed before (https://_Name_of_your_project_.herokuapp.com/). Push the changes on the repository on github.*** 
   1. On your project page ( this is the 'team' page based on Netlify terms), click on 'New site from Git'.
   2. A page will pop up. On this page, click on 'Github'.
   3. After having authorized github, on the same page as before, select your repository containing the files for the app.
   4. Click on 'Deploy site' at the bottom of the page.
   5. Click on 'Preview' at the top of the page to launch the site.
   6. Enjoy.

---

## Bugs known

In the OFFLINE USE v-calendar is not working properly. In particular:
1. The calendar is not going to be redirected to the view with the current month. 
2. The component built with v-calendar ( that is the component 'CalendarLayout.vue' ) is not going to be rerendered by updating its key. This causes the overlapping of the events of the new calendar with the ones of the previous calendar, but ONLY on the current month view. Indeed, by moving to a different month, the component is going to be updated 'manually' and there is no longer the overlapping of the new and old events. 
   
