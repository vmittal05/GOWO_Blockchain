## HLF Initiation Notes

- ### How to Properly deploy BNA on HLF

---
1. composer archive create -a dist/airlinev5.bna --sourceType dir --sourceName .
2. composer network install -a airlinev8.bna -c PeerAdmin@hlfv1
3. composer network start -c PeerAdmin@hlfv1 -n airlinev1 -V 0.0.1 -A admin -S adminpw
    (here airlinev1 is the folder name with all the models and stuff)
4. composer card import -f ./admin\@airlinev1.card
5. composer network ping -c admin@airlinev1
6. composer-rest-server -c admin@airlinev1 -n always -w true



- ### For Updating Network From CLI

---

composer network upgrade -c PeerAdmin@hlfv1 -n airlinev9 -V 0.0.21




- ### If Composer Playground not working :
---

 - Clear Firefox cache
 - Uninstall all composer composer
 - Install latest version again



- ### For Resetting Fabric and Composer :
---

- ./stopFabric.sh
- rm -rf ~/.composer
- ./teardownFabric.sh
- npm uninstall -g composer-cli composer-rest-server generator-hyperledger-composer
- npm uninstall -g composer-playground
- npm install -g composer-cli composer-rest-server generator-hyperledger-composer
- npm install -g composer-playground
- ./createPeerAdminCard.sh



- ### Deleting extra Docker Containers 
---
-  docker rmi -f $(docker images | grep latest | tr -s ' ' | cut -d ' ' -f 3)


