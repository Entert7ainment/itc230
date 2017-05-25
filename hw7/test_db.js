var Lyric = require("./models/music");

// insert data into the database
// new Lyric({title: "stop it", author:"taylor", pubDate:1973}).save();
// new Lyric({title: "is", author:"davis", pubDate:1974}).save();
// new Lyric({title: "going down", author:"royce", pubDate:1976}).save();
// new Lyric({title: "Tennessee Whiskey",author:"chirs",pubDate:2015}).save();
//new Lyric({title: "Thinking Out Loud",author:"ed",pubDate:2014}).save();
new Lyric({title: "Thinking Out Loud", author:"ed", pubDate:2014}).save();
// find all documents 
Lyric.find((err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
});