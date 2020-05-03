const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto")
const fs = require("fs");

const server = express();
const DB = require("./models/index")
const user = require("./routes/user");
const admin = require("./routes/admin");



server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/user", user);
server.use("/admin", admin);




// const salt = crypto.randomBytes(64).toString("hex");
// const hash = crypto.pbkdf2Sync("amritanjali", salt, 10, 256, `sha512`).toString("hex")

// const newHas = crypto.pbkdf2Sync("amritanjali", salt1, 10, 256, `sha512`).toString("hex")
// console.log(hash === newHas);







server.delete('/delete', function (req, res) {
    //console.log(req.body);

    DB.User.destroy({ where: { email: req.body.email } }).then(user => {
        res.json(user)
    })
});






server.get("/", function (req, res) {
    // res.json({name:"raubinsh"})
    const stream = fs.createReadStream("./123.pdf");
    stream.pipe(res)
})

// const data = {};

// data.name = "Amrit";
// data.year = "2nd";


// const data1 = [];

// data1.push("name");
// data1.push("class");
// data1.push("trade");
// data1.push("college");
// data1.push(965855888);


// server.get("/:name", function (req, res) {
//     res.sendFile(__dirname + "/" + req.params.name)

//     console.log(req.params.name);

// })




// server.get("/login/cart/user/:name/:xyz", function (req, res) {
//     console.log(req.params.name, req.params.xyz)
// })

server.post("/login", function (req, res) {
    if (req.body.username === "raubinsharya" && req.body.password === "12345")
        res.send("login successful")
    else res.send("login failed")
})


server.get("/", function (req, res) {
    console.log(req.query);

})



server.get("/show", function (req, res) {
    res.send("show")
})


server.listen(3000, function () {
    console.log("Server is running on port 3000 ")
});



// function show(data){
//     console.log("from show", data)
// }

// function display(ob){

//     console.log("from display");

//     ob("hello")
// }



// display(show)