require('dotenv').config();
const express  =  require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const userRouter = require("./api/users/user.router");
const cors = require('cors');


app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(cors());

app.use("/api/users",userRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log("server is running on port !!")
})