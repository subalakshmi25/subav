const mysql = require('mysql');

const express = require("express");
const jwt = require('jsonwebtoken');

const bodyParser = require("body-parser");
const mysqlConnection=require("./connection");
const CustomerRoutes=require("./routes/customer");
const http = require('http');

const hostname = process.env.HOST;
const port = process.env.PORT;
require('dotenv').config();


let app = express();
app.use(bodyParser.json());
app.use("/customer",CustomerRoutes);
app.listen(6000);



















