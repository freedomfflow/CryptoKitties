/* Initialize Web3 Lib taking provider we define in metamask */
var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x366C1CFa85f875E85111675C3736C2e14CC19a2b";

$(document).ready(function() {
    // Prompt user
    window.ethereum.enable().then((accounts) => {
        user = accounts[0];
        instance = new web3.eth.Contract(abi, contractAddress, {from: user})

        /*
         * Need to console log so we can get contract address after we deploy
         *  - truffle migrate --reset
         *  - now we can copy/paste contract address above in variable declaration
         * Get abi - Application Binary Interface
         *  - this is a contract definition - i.e. what functions are available in the contract
         *  - go to 'build' folder, and get entire array from KittyContract.js
         *  - after copying the entire array, create 'abi.js' in client folder
         *  - the 'var abi = ...' copy the entire array
         *  - then in index.html, import the abi.js file
         */
        console.log(instance);

        /*
         *  Send msg to screen upon successful kitty generation
         */
        instance.events.Birth().on('data', function(event) {
            console.log('Birth Event Sent');
            console.log(event);
            // console.log(event.returnValues);
            let owner = event.returnValues.owner;
            let kittenId = event.returnValues.kittenId;
            let maternalId = event.returnValues.maternalId;
            let paternalId = event.returnValues.paternalId;
            let genes = event.returnValues.geneSequence;
            // let msg = 'Owner: ' + event.returnValues.owner + '\n';
            // msg += ' KittyId: ' + event.returnValues.kittenId + '\n';
            // msg += ' DNA Sequence; ' + event.returnValues.geneSequence + '\n';
            // alert(msg);
        })
        .on('error', console.error);
    })

    // Create Kitty click function to write new kitty to blockchain
    $('#create-kitty').click((e) => {
        e.preventDefault();
        console.log('CLicked create kitty');
        createKitty(getDna());
    });
});

function createKitty(dnaStr) {
    console.log('Create Kitty DNA STRING');
    console.log(dnaStr);
    instance.methods.createKittyGen0(dnaStr).send({}, (error, txnHash) => {
        if(error) {
            console.log('Instance Error - create Kitty Gen0');
            console.log(error);
        } else {
            console.log('Txn Hash = ' + txnHash);
        }
    });
}

// Get all the kitties for an owner
async function getKitties() {
    let id;
    let kitty;
    try {
        id = await instance.methods.getKittiesByOwner(user).call();
    } catch (err) {
        console.log('Error getting kitties by owner');
        console.log(err);
    }

    // For each kitty, we need to render
    // - with react, render a component -- append component selector to new html page
    // - with jquery, need to modify all the css selectors to us a dynamic index
    for (i = 0; i < id.length; i++) {
        kitty = await instance.methods.getKitty(id[i]).call();
        console.log('Got Kitty struct data');
        console.log(kitty);
    }
}