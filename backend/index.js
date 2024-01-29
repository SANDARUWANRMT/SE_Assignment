require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const UserModel = require('./user')
const mongoose = require('mongoose')
const passport = require("passport");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");


// database connection
connection();

app.use(
	cookieSession({
		name: "session",
		keys: ["project"],
		maxAge: 24 * 60 * 60 * 100,
	})
);


app.use(passport.initialize());
app.use(passport.session());

// middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,

}));


// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));


mongoose.connect('mongodb+srv://user2:user123@mernapp.vfhva0n.mongodb.net/',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));
 
app.get('/', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
 
 
app.get('/get/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({_id: id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
})
 
app.post('/create', (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
 
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }).then(user => res.json(user))
    .catch(err => res.json(err))
})
 
app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})
 
app.listen(3001, () => {
    console.log("Server is Running");
})