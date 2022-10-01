const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const user = require("./routers/userRouter");

app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", user);

module.exports = app;
