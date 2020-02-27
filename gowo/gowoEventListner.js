var counter = 0;
var WebSocketClient = require('websocket').client
const express = require('express');
const app = express();
const PDFDocument = require('pdfkit');
const ipfsAPI = require('ipfs-api');
var cmd=require('node-cmd');
const fs = require('fs');
const rp =require('request-promise');

var client = new WebSocketClient();

client.on('connectFailed',function(error){
    console.log('Connect Error :',+error.toString());
});

client.on('connect', (connection)=>{
    console.log("Connected to REST-Server over WS protocol!");

    connection.on('message',(msg)=>{
        var event = JSON.parse(msg.utf8Data);

        switch(event.$class){
            case 'org.gowo.network.powerPlant.jobCreated':
                 counter++;
                 console.log('Event#', counter);
                 processJobCreatedEvent(event);
                 break;
            case 'org.gowo.network.document.DocumentCreated':
                 counter++;
                 console.log('Event#', counter);
                 processJobCreatedEvent(event);
                 generatePDF(event);
                 break;
            case 'org.gowo.network.document.documentRequested':
                 counter++;
                 console.log('Event#', counter);
                 processJobCreatedEvent(event);
                 downloadAndDecryptFile(event);
                 break;
            case 'org.gowo.network.document.AssignedChanged':
                 counter++;
                 console.log('Event#', counter);
                 processJobCreatedEvent(event);
                 generatePDF(event);
                 break;
            case 'org.gowo.network.document.verifiedDoc':
                 counter++;
                 console.log('Event#', counter);
                 makeTPATX(event);
                 break
                 
            default:
                console.log("Ignored event :", event.$class);
        }
    })
})

client.connect('ws://localhost:3000');

function generatePDF(event){
    const doc = new PDFDocument;
    data = event;
    var filename = data.documentID+'.pdf';
    doc.pipe(fs.createWriteStream('./'+filename));

    doc.fontSize(25).text('Transaction Details :', 100, 80);
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.';
doc
  .text('And here is some wrapped text...', 100, 300)
  .font('Times-Roman', 13)
  .moveDown()
  .text(lorem,{width: 412,align: 'justify',indent: 30,columns: 2,height: 300,ellipsis: true
  });

  doc.end();
  console.log(filename);
  console.log(data.AssignedTo);
  console.log(data.documentID);
  encryptAndUpload(filename, data.AssignedTo, data.documentID);


}

function encryptAndUpload(filename, offid, docID){
    console.log('In Encrypt :',offid);
    console.log('In Encrypt :',filename);
    cmd.run('gpg --encrypt --recipient "'+offid+'" '+filename);
    var res ='';
    cmd.get(
        'ipfs add '+filename+'.gpg',
        function(err, data, stderr){
            console.log(data);
            res = data.slice(6, 52);
            console.log('Hash is  : ',res);
            updateTx(docID, res);
        }
    ); 
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

function updateTx(docID, res){
    console.log('HASH is :',res);
    
    const requestOptions = {
        uri : 'http://localhost:3000/api/org.gowo.network.document.updateHash',
        method : 'POST',
        body : {
          "$class": "org.gowo.network.document.updateHash",
          "documentID": docID,
          "documentHash": res
        },
        json : true
      }
      
      rp(requestOptions).then(data =>{
        console.log("Success in POST REQUEST OF HASH!");
      });
}

function makeTPATX(event){
    const requestOptions = {
        uri : 'http://localhost:3000/api/org.gowo.network.document.updateHash',
        method : 'POST',
        body : {
          "$class": "org.gowo.network.money.CreateTransaction",
          "walletID": 'Wallet'+counter,
          "senderID": 'YachintY',
          "recieverID": event.relatedTPA,
          "amtToSend": '100',
          "bankNodeID": 'BAK01',
          "statusType": "RECIEVED_TX"
        },
        json : true
      }
      
      rp(requestOptions).then(data =>{
        console.log("Success in POST REQUEST OF HASH!");
      });
}

function downloadAndDecryptFile(event){
    data = event;
    var DocumentID = data.documentID;
    var hash = data.documentHash;
    console.log(documentID);
    console.log(hash);
    cmd.get(
      'ipfs get '+hash,
      function(err, data, stderr){
          console.log(data);
      }
  );
    cmd.run(' gpg --decrypt '+hash+' > '+DocumentID+'.pdf');
}


function  processJobCreatedEvent(event){
    console.log('Received event:')
    // Pretty printing the received JSON string
    console.log(JSON.stringify(event,null,4));
    console.log();
}