# cujaEdu Documentation

## Development
The Package is called cujaEdu on Github. It includes a server and a client. The Client is build from VueJS webpack Template.
Github is the platform for saving your development work. If you want to develop on the App clone this repo and run either the server from root with ```nodemon```or go into the client folder and start the local webpack server with ```npm run start```

## Deployment
Deployment is done by Firebase Hosting. Because of the serverless Architecture, we just need to host our SPA. For deployment: in the client directory run ```npm run build``` to create a *dist* directoy  and from the root directory run ```firebase deploy``` to deploy the app to google servers. 


## Usage

### Authentication

Authentication is handled by Google Firebase. As Methods you can choose between Google Sign-in or use an e-mail plus password. If you use the password method, then a manual registration is obligated. The Registration only needs these two fields. The User Database is seperate from the Authentication Handler. Each User has an unique User-ID for the Application, the Database just references this ID to store additional information.
