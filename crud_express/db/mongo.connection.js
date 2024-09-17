var mongoose = require('mongoose');

var mongoDB_URI = 'mongodb+srv://lukhascastro120:lucas0467@ap2.2z67r.mongodb.net/?retryWrites=true&w=majority&appName=ap2';
mongoose.connect(mongoDB_URI, {useNewUrlParser: true});

var db = mongoose.connection;

db.on('connected', () => console.log(`Mongoose Connected to ${mongoDB_URI}`));
db.on('disconnected', () => console.log(`Mongoose Disconnected to ${mongoDB_URI}`));
db.on('error', (error) => console.log(`Mongoose Disconnected to ${error}`));