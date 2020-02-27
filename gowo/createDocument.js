const namespace = "org.gowo.network.document"
const transactiontype = "CreateFlight";

const bnUtil = require('./bn-conn-util');


function main(error){
    if(error){
        console.log(error);
        process.exit(1);
    }

    let bnDef = bnUtil.connection.getBusinessNetwork();
    return bnDef;

}

function createDoc(docID){

    let bnDef  = bnUtil.connect(main);

    let factory = bnDef.getFactory();

    let options = {
        generate : false,
        includeOptionalFields: false
    }

    let transaction  = factory.newTransaction(namespace,transactiontype,docID,options);

    var datetime = new Date();
    transaction.setPropertyValue('documentID',docID);
    transaction.setPropertyValue('creationDate',datetime);
    transaction.setPropertyValue('statusType','NEW');

    return bnUtil.connection.submitTransaction(transaction).then((res)=>{
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });


};

module.exports = createDoc;