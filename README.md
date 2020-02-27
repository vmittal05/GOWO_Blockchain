# GOWO Blockchain - Minor Project Workflow

## How to deploy :

1. ### Install Hyperledger Fabric Pre-Requisites
---
```bash
- curl -O https://hyperledger.github.io/composer/v0.19/prereqs-ubuntu.sh
- chmod u+x prereqs-ubuntu.sh
- curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
- touch .bash_profile
- curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
- nvm install --lts	
- npm install -g composer-cli@0.19
- npm install -g composer-rest-server@0.19
- npm install -g generator-hyperledger-composer@0.19
- npm install -g yo
- npm install -g composer-playground@0.19
- mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers
- curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
- cd ~/fabric-dev-servers
- export FABRIC_VERSION=hlfv11
- ./downloadFabric.sh
- ./startFabric.sh
- ./createPeerAdminCard.sh
```

2. ### Deploy GOWO - Blockchain Model to Hyperledger
---
```bash
- cd GOWO-BLockchain/gowo
- composer archive create -a dist/gowo040.bna --sourceType dir --sourceName .
- cd dist
- composer network install -a gowo040.bna -c PeerAdmin@hlfv1
- composer network start -c PeerAdmin@hlfv1 -n gowo -V 0.0.40 -A admin -S adminpw
- composer card import -f ./admin\@gowo.card
- composer-rest-server -c admin@gowo -n always -w true
- composer-playground
- node gowoEventListner.js
```
3. ### Starting Front End on port 4000
---
```bash
- cd GOWO-Blockchain/front-end
- chmod 755 server.js
- node ./server.js
```

