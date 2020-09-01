const mongoose = require('mongoose');
const env = require('./environment');
const path = require('path');
mongoose.connect(`mongodb://localhost/${env.db_name}`, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to DB :: Mongoose");
});
module.exports=db;