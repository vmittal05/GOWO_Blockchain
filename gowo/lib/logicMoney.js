/**
 * Create a Money Transaction
 * @param {org.gowo.network.money.CreateTransaction} moneyData
 * @transaction
 */
function createTransaction(moneyData){
    return getAssetRegistry('org.gowo.network.money.Money')
    .then(function(moneyRegistry){
        var factory = getFactory();
        var NS = 'org.gowo.network.money';

        var datetime = new Date();

        var walletID = generatePPJID(moneyData.walletID,datetime);
        var money = factory.newResource(NS,'Money',walletID);

        money.amtToSend = moneyData.amtToSend;
        money.bankNodeID = moneyData.bankNodeID;
        money.senderID = moneyData.senderID;
        money.recieverID = moneyData.recieverID;
        money.transactionDate = datetime;

        var event = factory.newEvent(NS, 'TransactionCreated');
        event.walletID = walletID;
        emit(event);

        return moneyRegistry.addAll([money]);

    })
}

function generatePPJID(jobName, jobDeadline){
    var dt = new Date(jobDeadline)
   
    var month = dt.getMonth()+1;
    if((month+'').length == 1)  month = '0'+month;
    var dayNum = dt.getDate();
    if((dayNum+'').length == 1)  dayNum = '0'+dayNum;
   
    return jobName+'-'+month+'-'+dayNum+'-'+(dt.getFullYear()+'').substring(2,4);
   }