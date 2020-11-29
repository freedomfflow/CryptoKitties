/* Initialize Web3 Lib taking provider we define in metamask */
var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x40FcC0549eC0D3a12C43b15c92Cb9CA486D31db3";

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
        // console.log(instance);

        /*
         *  Send msg to screen upon successful kitty generation
         */
        instance.events.Birth().on('data', (event) => {
            // console.log(event.returnValues);
            let msg = 'Owner: ' + event.returnValues.owner + '\n';
            msg += ' KittyId: ' + event.returnValues.kittenId + '\n';
            msg += ' DNA Sequence; ' + event.returnValues.geneSequence + '\n';
            alert(msg);
        })
        .on('error'), console.log(error);
    })

    // Create Kitty click function to write new kitty to blockchain
    $('#create-kitty').click((e) => {
        e.preventDefault();
        console.log('CLicked create kitty');
        createKitty(getDna());
    });
});

function createKitty(dnaStr) {
    instance.methods.createKittyGen0(dnaStr).send({}, (error, txnHash) => {
        if(error) {
            console.log(err);
        } else {
            // console.log('Txn Hash = ' + txnHash);
        }
    });
}
