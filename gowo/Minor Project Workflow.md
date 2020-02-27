# Minor Project Workflow

## Things to do :
---
1. ### Build Front-End to Interact with HLF
  - Website/Web client that can perform actions like :
    1. Creating a transaction
    2. Show all transactions ( By Accessing historian)
    3. Create/Update/Delete an Asset etc.
  - Website should have access control implemented :
    1. Users will authenticate via password/private key that are locally stored (Either use REST Sever auth or build custom solution that checks the card of the user)
    2. Admin should be able to manage existing cards, create new participants etc


2. ### Simple Chain code Demonstration (NOT IN LECTURES)
  - The chain code should be able to set up a simple contract between the government department , third party and the bank.
  - Third party should be chosen either by voting or by who is giving the best price + previous reputation.
  - Upon successful creation of asset from the third-party, the govt department will validate it and launch a transaction.
  - An event to the bank-node to transfer said money to the third party's account which will also be done in the form of a transaction.


3. ### Build Back-end JS files to complement Front-end
  - Use Composer API or Rest-Server to make function calls to get following attributes (and others if needed in ) of the HLF:
    1. Get Registries
    2. Manage-Cards
    3. Submit-Transaction
    4. Create/Delete/Update an Asset/Resources
    5. Create/Delete/Update a Participants
    6. Get-Historian
    7. Queries 
    8. etc...


4. ### Final Model Files creation and Unit-testing using Mocha and Chai
	- The Final Model files should contain every aspect/variable required to successfully demonstrate the chain code + general workings of the network
	- Please consult the group before doing any major changes or adding new features
	- The important functions of the network like creating transactions, updating assets etc, should be unit-tested 
	- Any additional features added like Private Key encryption or document storage should also be unit-tested


