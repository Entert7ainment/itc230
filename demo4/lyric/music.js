'use strict'
let music = [
   {title:"stop it", author:"taylor", pubDate:1973},
   {title:"is", author:"davis", pubDate:1974},
   {title:"going down", author:"royce", pubDate:1976}
];

//let get = (title) =>{
    //return books.find((item) => {
       // console.log(item);
       //return item.title == title;
    //});
   // return title;
//}
//console.log (get("it"));
//console.log(books[0].title)
//module.exports ={
   // get
//}


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
    console.log(music);
    return {delete: music.length !== oldLength, total: music.length};  
}

//exports. =(title)=>{
//return music.filter((item)=>{
  //  return item.title==title;
   // });
//}