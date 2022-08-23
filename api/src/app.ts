import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
const mongoose = require('mongoose');
const Post = require("./models/postModal");

const app: Application = express();
const postRoute = require("./routes/postRoute");
const authRoute = require("./routes/authRoute");

mongoose.connect("mongodb+srv://sandaru:sandaru123@cluster0.z1bfc.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log("connected to database");
}).catch(() => {
  console.log("Connection failed!");
});

app.listen(5000, ()=> {console.log("server running")});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
   next();
});


app.use("/api/posts", postRoute);
app.use("/api/user", authRoute);

module.exports = app;
