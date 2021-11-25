const express = require('express');
const app = express();
const dotenv = require('dotenv');
var cors = require('cors');
const port = 3000;

//Import Routers
const authRoute = require('./router/auth');
const dataRoute = require('./router/user');



// // // app.use(express.static('public/upload'));
// // app.use(express.static(__dirname + '/public'));
// // app.use('/public/upload', express.static('/public/upload'));
// // app.use(express.static(`${__dirname}/public`));

// // app.use('/public', express.static(__dirname + "/public"));
// // app.use('/', express.static(__dirname + "/public/upload"));
// // app.use(express.static('public'));
 
dotenv.config();
const mongoose = require('mongoose');

app.use(cors());

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db!'));

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/users', authRoute);
app.use('/api/data' , dataRoute);




app.listen(process.env.PORT || port, () => console.log(`Server up and running ${port}`));