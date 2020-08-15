const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Codeial_App', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to DB :: Mongoose");
});
module.exports=db;