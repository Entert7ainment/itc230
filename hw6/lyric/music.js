'use strict'
let music = [
   {title:"stop it", author:"taylor", pubDate:1973},
   {title:"is", author:"davis", pubDate:1974},
   {title:"going down", author:"royce", pubDate:1976},
   {title:"Tennessee Whiskey", author:"chris", pubDate:2015}
];

exports.getAll=()=>{
    return music;
};

exports.get =(title)=>{
return music.find((item) =>{
    return item.title==title;
});    
}

exports.delete =(title)=>{
    // delete requested title from music array
    // return success/failure & new total
    let oldLength = music.length;
    let newMusic = music.filter((item) =>{
        return item.title!==title;
    });
 music = newMusic;
    return {deleted: music.length !== oldLength, total: music.length};  
}
exports.add =(newObject)=>{
    var added= false;
    
    //check if song exist

    var found = this.get(newObject.title);
    
    if (!found){
        music.push(newObject);
        
        added = true;
    }
    //if it is new then add it
    //respond with information if worked
    return {added: added, total: music.length};
}

//console.log(this.add( {tittle:"Tennessee Whiskey", author: "chris", pubDate:2015}));
//console.log(this.add( title: "is", author: "xx2", pubDate: 1}));