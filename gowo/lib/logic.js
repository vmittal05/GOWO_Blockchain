/**
 * Create a Document Transaction
 * @param {org.gowo.network.document.CreateDocument} documentData
 * @transaction
 */
function createDocument(documentData){
    return getAssetRegistry('org.gowo.network.document.Document')
    .then(function(documentRegistry){
        var factory = getFactory();
        var NS = 'org.gowo.network.document';

        var document = factory.newResource(NS,'Document',documentData.documentID);

        document.documentID = documentData.documentID;
        document.documentName = documentData.documentName;
        document.creationDate = documentData.creationDate;
        document.documentHash = documentData.documentHash;
        document.AssignedTo = documentData.AssignedTo;
        document.AssignedFrom = documentData.AssignedFrom;
        document.SigningAuthority = documentData.SigningAuthority;
        document.verifiedType = documentData.verifiedType;
        document.statusType = document.statusType;


        var event = factory.newEvent(NS, 'DocumentCreated');
        event.documentID = documentData.documentID;
        event.AssignedTo = documentData.AssignedTo;
        emit(event);

        return documentRegistry.addAll([document]);
    })
}

/**
 * Create a Document Transaction
 * @param {org.gowo.network.document.ChangeAssignedStatus} documentData
 * @transaction
 */

 function ChangeAssignedStatus(documentData){
     var docRegistry;
     return getAssetRegistry('org.gowo.network.document.Document').then(function(registry){
         docRegistry = registry;
         return docRegistry.get(documentData.documentID);
    }).then(function(docExist){
        if(!docExist) throw new Error("PJOB :"+documentData.documentID," Not Found!!");
        var factory = getFactory();
        docExist.AssignedTo = documentData.AssignedTo;
        docExist.AssignedFrom = documentData.AssignedFrom;
        return docRegistry.update(docExist);
     }).then(function(){
         var event = getFactory().newEvent('org.gowo.network.document','AssignedChanged');
         event.documentID = documentData.documentID;
         event.AssignedTo = documentData.AssignedTo;
         emit(event);
     }).catch(function(error){
         throw new Error(error);
     });
 }

 /**
 * Create a Document Transaction
 * @param {org.gowo.network.document.updateHash} documentData
 * @transaction
 */

 function updateHash(documentData){
    var docRegistry;
     return getAssetRegistry('org.gowo.network.document.Document').then(function(registry){
         docRegistry = registry;
         return docRegistry.get(documentData.documentID);
    }).then(function(docExist){
        if(!docExist) throw new Error("PJOB :"+documentData.documentID," Not Found!!");
        var factory = getFactory();
        docExist.documentHash = documentData.documentHash;
        return docRegistry.update(docExist);
     }).then(function(){
         var event = getFactory().newEvent('org.gowo.network.document','hashChanged');
         event.documentID = documentData.documentID;
         emit(event);
     }).catch(function(error){
         throw new Error(error);
     });
 }

  /**
 * Create a Document Transaction
 * @param {org.gowo.network.document.verifiedStatusChange} documentData
 * @transaction
 */

 function verifiedStatusChange(documentData){
    var docRegistry;
    return getAssetRegistry('org.gowo.network.document.Document').then(function(registry){
        docRegistry = registry;
        return docRegistry.get(documentData.documentID);
   }).then(function(docExist){
       if(!docExist) throw new Error("PJOB :"+documentData.documentID," Not Found!!");
       var factory = getFactory();
       docExist.verifiedType = documentData.verifiedType;
       docExist.relatedTPA = documentData.relatedTPA;
       return docRegistry.update(docExist);
    }).then(function(){
        var event = getFactory().newEvent('org.gowo.network.document','verifiedDoc');
        event.documentID = documentData.documentID;
        event.relatedTPA = documentData.relatedTPA;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
 }

   /**
 * Create a Document Transaction
 * @param {org.gowo.network.document.getDocument} documentData
 * @transaction
 */

 function getDocument(documentData){
    var hash= '';
    var docRegistry;
    return getAssetRegistry('org.gowo.network.document.Document').then(function(registry){
        docRegistry = registry;
        return docRegistry.get(documentData.documentID);
   }).then(function(docExist){
       if(!docExist) throw new Error("PJOB :"+documentData.documentID," Not Found!!");
       hash = docExist.documentHash;
       return docRegistry.update(docExist);
    }).then(function(){
        var event = getFactory().newEvent('org.gowo.network.document','documentRequested');
        event.documentID = documentData.documentID;
        event.documentHash = hash;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });
 }
