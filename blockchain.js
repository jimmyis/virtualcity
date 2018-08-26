// Initializing
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}

// Get default address
web3.eth.defaultAccount = web3.eth.accounts[0];

// TODO: Replace your SimpleContract abi here
var abi = [{
        "constant": false,
        "inputs": [{
            "name": "newAlias",
            "type": "bytes32"
        }],
        "name": "setAlias",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAlias",
        "outputs": [{
            "name": "",
            "type": "bytes32"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

var contractAddress = '0xa9cBAB388abeF930C0dee3a945f50B0dA13bC08B';

var _VirtualCityContract = web3.eth.contract(abi);
var VirtualCityContract = _VirtualCityContract.at(contractAddress);