const express = require('express');
const hbs = require('hbs');
var request = require('request');
var axios = require('axios');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var value1;
var request = require('request');

var url = 'http://localhost:3000/api/org.gowo.network.document.CreateDocument';

var data = {
  
    "$class": "org.gowo.network.document.CreateDocument",
    "documentID": "123456",
    "creationDate": "2019-05-05T14:18:59.213Z",
    "documentName": "doc3",
    "documentPath": "path1",
    "statusType": "FINISHED"
};

request.post({url:url, formData: data}, function(err, httpResponse, body) {
  if (err) {
    return console.error('post failed:', err);
  }

  console.log('Post successful!  Server responded with:', body);
});

axios.get('http://localhost:3000/api/org.gowo.network.participants.Citizen').then(function (response) {
    value1=JSON.stringify(response.data[0]['personalDetails'],undefined,2);
    console.log(JSON.stringify(response.data[0]['personalDetails'],undefined,2));
}).catch(function (error) {
    console.log(error);
});
axios.get('http://localhost:3000/api/org.gowo.network.participants.ICICIBank').then(function (response) {
    value2=JSON.stringify(response.data[0]['personalDetails'],undefined,2);
    console.log(JSON.stringify(response.data[0]['personalDetails'],undefined,2));
}).catch(function (error) {
    console.log(error);
});
axios.get('http://localhost:3000/api/org.gowo.network.money.Money').then(function (response) {
    value3=JSON.stringify(response.data,undefined,2).split('{').join("");
    value3=value3.split('}').join("");
    console.log(value3);
}).catch(function (error) {
    console.log(error);
});
axios.get('http://localhost:3000/api/org.gowo.network.document.Document').then(function (response) {
    value4=JSON.stringify(response.data,undefined,2).split('{').join("");
    value4=value4.split('}').join("");
    console.log(value4);
}).catch(function (error) {
    console.log(error);
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.get('/send1', (req, res) => {
  res.send(value1);
});
app.get('/send2', (req, res) => {
  res.send(value2);
});
app.get('/send3', (req, res) => {
  res.send(value3);
});
app.get('/send4', (req, res) => {
  res.send(value4);
});
app.post('/send5',urlencodedParser, (req, res) => {
  
  console.log(req.body);
res.send('Transaction Submitted Successfully!!');
});
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear(),
    myfun:value1
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(4000, () => {
  console.log('Server is up on port 4000');
});
