
var mysql = require('promise-mysql');
var pool


mysql.createPool({//connects to mysql
    connectionLimit : 10,
    host :'localhost',
    user: 'root',
    password: 'current password',
    database: 'collegedb'
})
 .then((result)=>{
    pool = result
})
.catch((error)=>{
    console.log(error)
});


var getModules = function(){//selects everything from modules and displays them using its corrosponding ejs file
    return new Promise((resolve , reject)=> {
    pool.query('select * from module')
    .then((result) => {
        console.log("ok")
        resolve(result)
    })
    .catch((error)=>{
        console.log("nok")
        reject(error)
    })
})
}

var getStudents = function(){//selects everything from Students and displays them using its corrosponding ejs file
    return new Promise((resolve , reject)=> {
    pool.query('select * from student')
    .then((result) => {
        console.log("ok")
        resolve(result)
    })
    .catch((error)=>{
        console.log("nok")
        reject(error)
    })
})
}


var getStudMod = function(){//selects everything from Student modules and displays them using its corrosponding ejs file
    return new Promise((resolve , reject)=> {
    pool.query('select * from student_module')
    .then((result) => {
        console.log("ok")
        resolve(result)
    })
    .catch((error)=>{
        console.log("nok")
        reject(error)
    })
})
}


var getdept = function(){//selects everything from Departments and displays them using its corrosponding ejs file
    return new Promise((resolve , reject)=> {
    pool.query('select * from dept')
    .then((result) => {
        console.log("ok")
        resolve(result)
    })
    .catch((error)=>{
        console.log("nok")
        reject(error)
    })
})
}

var getSid = function(sid){//gets the sudent id from the user and finds it in the db and removes it 
    return new Promise((resolve , reject)=> {
        var myQuery = {
    sql: 'delete from student where sid = ?',
    values: [sid]       
        }
    pool.query(myQuery)
    .then((result) => {
        console.log("ok")
        resolve(result)
    })
    .catch((error)=>{
        console.log("nok")
        reject(error)
    })
})
}

var addStud = function(){//cant get this to work for some reason 
    return new Promise((resolve , reject)=> {
        var myQuery = {
            sql: 'INSERT INTO student (sid, name, gpa) VALUES ?,?,?',
            values: [req.body.sid, req.body.name, req.body.gpa]
        }
    pool.query(myQuery)
    .then((result) => {
        console.log(result)
        resolve(result)
    })
    .catch((error)=>{
        console.log("nok")
        
        reject(error)
    })
})
}

var editMod = function(){//cant get this to work eaither
    return new Promise((resolve , reject)=> {
        var myQuery = {
            sql: 'UPDATE module SET name=?, credits=? WHERE mid=?;',
            values: [req.body.name, req.body.credits, req.body.mid]
        }
    pool.query(myQuery)
    .then((result) => {
        console.log(result)
        resolve(result)
    })
    .catch((error)=>{
        console.log("nok")
        
        reject(error)
    })
})
}



module.exports = { getModules, getStudents, getStudMod, getdept, addStud, getSid, editMod}//exports everything


