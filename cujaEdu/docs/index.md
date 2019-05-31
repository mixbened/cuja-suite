# cujaEdu Documentation

## Development
The Package is called cujaEdu on Github. It includes a server and a client. The Client is build from VueJS webpack Template.
Github is the platform for saving your development work. If you want to develop on the App clone this repo and run either the server from root with ```nodemon```or go into the client folder and start the local webpack server with ```npm run start```

The Development is saved in Github. There is a Cuja Convenience to work with branches and Pull Requests. The Branch Name must be the name of a single feature. When finished working on that branch, E2E Tests have to be run and when successfull, a Pull Request to the master branch has to be done.

## Deployment
For matching our policy, we only want to deploy from the master branch.

Deployment is done by Firebase Hosting. Because of the serverless Architecture, we need two host two parts at two different locations. One is the client. To do so, we only have to host the SPA. For client deployment: in the client directory run ```npm run build``` to create a *dist* directoy and from the root directory run ```firebase deploy --only hosting``` to deploy the app to google servers. For server functions deployment: from the root directory run ```firebase deploy --only functions``` to deploy the app to google servers. 

That is it. The App is updated. 


## The Feature Parts

###Styling

We use Bootstrap and minimalistic styling for the Application.

### Authentication

Authentication is handled by Google Firebase. As Methods you can choose between Google Sign-in or use an e-mail plus password. If you use the password method, then a manual registration is obligated. This is only the Auth Section. For working with User Data and Profiles, we store additional information in the Firebase Firestore. Each User has to have a profile document. These profiles are stored in the Firestore Collection */users*.

When registering, the User enters additional information. This is information is stored directly when registering the User to Firebase Authentication. When using Google Sign-In, the App has to ask the User for more detailed Information.

### Modules

Modules are stored in Google Drive. They have to be located in an specific Folder. This ID is saved in the Firebase Functions File as Variable _folderId_. In the Instructor View, Modules from that Folder can be listed. The Subelements to this Folder are requested when clicking on one and then click show. Each Module in the Application has its ID through Google Drive, where the ID is set when the Module Folder is created.

The Single Module View uses three resources from that Google Folder. 