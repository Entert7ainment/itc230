var mongoose = require('mongoose');
var credentials = require("../lyric/credentials");


// connection string for remote database 
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(credentials.connectionString, options);
// connectionlocal db settings 


var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Person model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 author: String,
 pubDate: Date

}); 

module.exports = mongoose.model('Lyric', mySchema);