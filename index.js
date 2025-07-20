const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

let data =[
    {
        id : uuidv4(),
        image : "/Images/coffeeday.jpg",
        caption : "Caffinated Always!!",
    },
    {
        id : uuidv4(),
        image : "/Images/jornal.webp",
        caption : "Journalling is peaceful",
    },
    {
        id : uuidv4(),
        image : "/Images/scenery.jpg",
        caption : "Too pretty",
    },
    {
        id : uuidv4(),
        image : "/Images/dogs.jpeg",
        caption : "<3",
    }
];

app.set("view engine", "ejs"); 
app.set("views",path.join(__dirname,"views")); 
app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req,res) => {
    res.render("index.ejs");
})

app.post("/login",(req,res) => {
    const username = req.body.username;
    res.redirect(`/profile/${username}`);
})

app.get("/profile/:username",(req,res) => {
    const {username} = req.params;
    res.render("profile.ejs",{username,data});
})

app.get("/profile/:username/post/new",(req,res) => {
    const {username} = req.params;
    res.render("add.ejs", {username});
})

app.post("/profile/:username/post/new",(req,res) => {
    const {username} = req.params;
    let {image,caption} = req.body;
    let newID = uuidv4();
    data.push({newID,image,caption})
    res.redirect(`/profile/${username}`);
})

app.get("/profile/:username/post/:id/edit",(req,res) => {
    const {username,id} = req.params;
    let post = data.find( (p) => id == p.id);
    res.render("edit.ejs", {username,post});
})

app.post("/profile/:username/post/:id/edit",(req,res) => {
    const {username,id} = req.params;
    let post = data.find( (p) => id == p.id);
    post.caption = req.body.caption;
    res.redirect(`/profile/${username}`);
})

app.listen(port,()=>{
    console.log("Listening to port : 8080");
})

app.delete("/profile/:username/post/:id",(req,res) => {
    const {username,id} = req.params;
    data = data.filter( (p) => id !== p.id);
    res.redirect(`/profile/${username}`);
})