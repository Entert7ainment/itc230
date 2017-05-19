var Music = require("./models/music");

// insert data into the database
new Music({title: "stop it", author:"taylor", pubDate:1973}).save();
new Music({title: "is", author:"davis", pubDate:1974}).save();
new Music({title: "going down", author:"royce", pubDate:1976}).save();
new Music({title: "Tennessee Whiskey",author:"chirs",pubDate:2015}).save();
new Music({title: "Thinking Out Loud",author:"ed",pubDate:2014}).save();