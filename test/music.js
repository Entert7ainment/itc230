var expect = require("chai").expect;

var music = require("../hw3/lyric/music"); 

 

 describe("Music",  () => { 

     it(" returns requested song", () =>{ 

var result = music.get("is"); 

 expect(result).to.deep.equal({title: "is", author:"davis", pubDate:1974}); 

         

     });

     

 it("get fails w/ invalid song",  () => { 

    var result = music.get("thinking out loud");

 expect(result).to.be.undefined; 

  

 });

 

 //It fail with a fake song

 it("delete fails w/ invalid song",  () => { 

    var result = music.delete("thinking out loud");

 expect(result.deleted).to.be.false; 

  

 });

 

it("delete success w/ real song",  () => { 

    var result = music.delete("stop it");

 expect(result.deleted).to.be.true; 

  

 });

 it("add fails w/ existence song",  () => { 

    var result = music.add({title:"going down", author:"chris", pubDate:2015});

 expect(result.added).to.be.false; 

  

 });

 it("add success w/ new song",  () => { 

    var result = music.add({title:"Tennessee Whiskey", author:"chris", pubDate:2015});

 expect(result.added).to.be.true; 

  

 });     

 });
 
 // end describe
 //console.log(this.add( {title:"Tennessee Whiskey", author:"chris", pubDate:2015}));
//console.log(this.add( {title:"is", author:"xx2", pubDate:1}