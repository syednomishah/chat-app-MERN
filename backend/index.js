const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require("passport");
const fs = require('fs');
const initSocket = require('./socketioEvents/index');

const app = express();
const port=5000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(cors());
//passport middleware
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);


var routePath = "./routes/";

fs.readdirSync(routePath).forEach(function(file) {
	var route = routePath + file;
	app.use(require(route).router);
});

var server = app.listen(port,()=>{
    console.log('server listeneing at port:',port)
});

var io = require('socket.io').listen(server);



// console.log(io)
io.on('connection', function(socket) {

    initSocket({io,socket})
    
});
