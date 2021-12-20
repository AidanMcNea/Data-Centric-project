var express = require("express")
var mySqlDOA = require('./SqlDAO')
let mongoDAO = require("./mongoDAO")
let ejs = require("ejs")
var bodyParser = require('body-parser')


var app = express()



app.use(bodyParser.urlencoded({extended: false}))

app.set("view engine", "ejs")

app.get('/', (req,res)=>{//home page
    res.send('<p><a href="http://localhost:3004/ListModules">List Modules</a></p>\n <p><a href="http://localhost:3004/ListStudents">List Students</a></p>\n <p><a href="http://localhost:3004/ListLecturers">List Lecturers</a></p>\n');
    
})

app.get('/ListModules', (req,res)=>{//takes all modules from the mysql db
   mySqlDOA.getModules()
   .then((result)=>{
    res.render("modules", {module:result})
   })
   .catch((error)=>{
       res.send(error)
})
});

app.get('/StudMod', (req,res)=>{//takes all studnet modules from the mysql db
    mySqlDOA.getStudMod()
    .then((result)=>{
        res.render("studMod", {studMod:result})
    })
    .catch((error)=>{
        res.send(error)
 })
 });

 app.get('/ListStudents', (req,res)=>{//takes all students from the mysql db
    mySqlDOA.getStudents()
    .then((result)=>{
    res.render("students", {student:result})
    })
    .catch((error)=>{
        res.send(error)
 })
 });

 app.get('/dept', (req,res)=>{//takes all departments from the mysql db
    mySqlDOA.getdept()
    .then((result)=>{
    res.render("dept", {dept:result})
    })
    .catch((error)=>{
        res.send(error)
 })
 });

 app.get('/ListLecturers', (req, res)=>{//takes all lecturers from the mongo db
    var x = mongoDAO.findLect()
    .then((data)=>{
      //res.send(data)
      //console.log(data)
       res.render("lecturers", {lecturers:data})
      // res.send(data)
    })
    .catch((error)=>{
       res.send(error)
   })
    //res.send("OK")
   })


   app.get('/addLectureres', (req, res) => {//adds lecturers to the mongo db
    res.render("addLect")
    })
    
app.post('/addLectureres', (req, res) => {
    mongoDAO.addLect(req.body)
 .then((data)=>{
     res.send(data)
 })
 .catch((error)=>{
    res.send(error)
})
    })


app.get('/addStudent', (req, res) => {//adds students to the mysql db, not working for some reason
    res.render("addStud")
    })
    
app.post('/addStudent', (req, res) => {
    mySqlDOA.addStud(req.body)
    .then((result)=>{
        res.send(result)
    })
    .catch((error)=>{
    res.send(error)
})
    })

app.get('/EditModule', (req, res) => {//edits modules from the mysql db, not working for some reason too
    res.render("editMod")
    })
    
app.post('/EditModule', (req, res) => {
    mySqlDOA.editMod(req.body)
    .then((result)=>{
        res.send(result)
    })
    .catch((error)=>{
    res.send(error)
})
    })

app.get('/Student/delete/:sid', (req,res)=>{//deletes students using there id 
    mySqlDOA.getSid(req.params.sid)
    .then((result)=>{
        console.log(result)
            res.send(req.params.sid + " was deleted")
            
    })
    .catch((error)=>{
        res.send(error)
    })
    });

app.listen(3004,()=>{
    console.log("listen on port 3004")
})