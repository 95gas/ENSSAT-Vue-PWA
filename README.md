# Integration Web Project

This project aims at realizing a progressive web app (PWA) exploting the vue framework for building the user interface. The service offered by the app consists in 
1. Displaying the schedule for a specific degree offered by ENSSAT selected by the user. 
2. a chat with different channels that offers different options based on the type of user logged in.
   - ADMIN: They can send new messages over the channels.
   - NORMAL USER: They can only read the messages emitted by the admins on the several channels.
   
The project consists of two main components:

###1. App
The app, realized in vue js, deals with displaing the user interface trough which the user can use the service. 

###2. Server
It 

## Deployment over internet

### Deployment of the server on Heroku.com
   1. Create a new project. 
      ( The name of the project will be used to name the URL of your server: https://<Name of your project>.herokuapp.com/)
   2. Go on the section 'Deploy'. 
      a. Select 'Github' on the Deployment method section
      b. On the section 'App connected to Github' connect the repository containing the project you wish to          build
      c. At the bottom of the page, on the section 'Manual deploy', click on the button 'Deploy Branch'.
   3. Open the app. To test if the server is running, you can visit the page 'https://<Name of your project>.herokuapp.com/'. You should get a white page with the writing ' Server launched .. ' 

   ( If some errors occur during the launch on the server, you can check the logs on 'View logs' by clicking on the button 'More' placed at the top of the same page where the building process occur )
  
### Deployment of the vue app on Netlify.com
   1. After creating an account, on your project page ( 'team' page based on Netlify terms), click on 'New site from Git'.
   2. On the poped up page, click on 'Github'.
   3. After authorized github, on the same page as before, select your repository.
   4. Click on 'Deploy site' at the bottom of the page.
   5. Click on 'Preview' at the top of the page to launch the site.
   6. Enjoy.
   
