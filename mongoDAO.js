const MongoClient = require('mongodb').MongoClient

var coll;

MongoClient.connect('mongodb://localhost:27017')//connecting to mongodb
   .then((client) => {
       db = client.db('lecturersDB')
       coll = db.collection('lecturers')
   })
   .catch((error) => {
       console.log(error.message)
   })

var findLect = function(){//displays lectures
   return new Promise((resolve, reject)=>{
       var cursor = coll.find()
       cursor.toArray()
       .then((data)=>{
           resolve(data)
       })
       .catch((error)=>{
        reject(error)
       })
   })
}

function addLect(lecturers){//adds lecturers
    return new Promise((resolve, reject)=>{
        coll.insertOne(lecturers)
        .then((data)=>{
            resolve(data)
            
        })
        .catch((error)=>{
            reject(error)
        })
       
    })
 }


module.exports = { findLect ,addLect}//exports the functions