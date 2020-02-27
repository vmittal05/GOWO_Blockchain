'use strict';
module.exports = {
    cardStore : require('composer-common').FileSystemCardStore,
    BusinessNetworkConnection : require('composer-client').BusinessNetworkConnection,
    cardName: "admin@gowo",
    connection: {},
    connect : function(callback){

        var cardType = { type: 'composer-wallet-filesystem' };
        this.connection = new this.BusinessNetworkConnection(cardType);

        return this.connection.connect(this.cardName).then(function(){
            callback();
        }).catch((error)=>{
            callback(error);
        });
    },
    disconnect : function(callback) {
        this.connection.disconnect();
    },
    ping : function(callback){
        return this.connection.ping().then((response)=>{
            callback(response);
        }).catch((error)=>{
            callback({},error);
        });
    }
}