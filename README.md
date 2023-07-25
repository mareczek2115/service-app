<h1>A simple web application for recording services performed, e.g. in a computer service</h1>

You need Node.js environment installed to run.

Additionally, several modules need to be installed:
`npm install express mongoose ejs method-override shortid`

If you want to use MongoDB in the cloud, you need to create a cluster there, add a user with read and write permissions, and add your public IP address to be able to connect to the cluster. You can also use Mongo locally, then change the address to: `mongodb://127.0.0.1:27017/<database>` and create a database with two collections: `active-services` and `completed-services`

To run the application, type:
`npm start`.
