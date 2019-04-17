import express from 'express';
import fs from 'fs'
import GoogleCredentialController from './controllers/google.credentials.controller';
import Office from './office.server';


const app = express();
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
const GOOGLECREDENTIAL = process.env.googleCredential || '990846956506-bfhbjsu4nl5mvlkngr3tsmfcek24e8t8.apps.googleusercontent.com';

// set the template engine ejs
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));

//css
app.use('/css/bootstrap', express.static(`${__dirname}/node_modules/bootstrap/dist/css`));
app.use('/css/font_awesome', express.static(`${__dirname}/node_modules/font-awesome/css`));

//js
app.use('/js/bootstrap', express.static(`${__dirname}/node_modules/bootstrap/dist/js`));


// FIX ME: here we have to get the google APIkey in another way.
app.locals.googleCredential = new GoogleCredentialController(GOOGLECREDENTIAL);


const roomData = process.env.roomData || fs.readFileSync('./file/default.room.web.json');
const roomsDetail = JSON.parse(roomData);
var defaulRoom = "room-1";

if (roomsDetail!=null && roomsDetail.length >0 ) {
	defaulRoom = roomsDetail[0].id;	
}

console.log(defaulRoom);

console.log(roomsDetail);

app.locals.roomsDetail = roomsDetail;

// routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/office', (req, res) => {
  res.render('office');
});

// Listen on port 8080
const server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

new Office(server, defaulRoom);

module.exports = server;
