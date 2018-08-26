// Initializing
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
}

// Get default address
web3.eth.defaultAccount = web3.eth.accounts[0];

// TODO: Replace your SimpleContract abi here
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "newAlias",
				"type": "string"
			}
		],
		"name": "setAlias",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAlias",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var contractAddress = '0xb13F7f9eF94Cd6388EB6B8f0A7F40d416Fc63ab8';

var _VirtualCityContract = web3.eth.contract(abi);
var VirtualCityContract = _VirtualCityContract.at(contractAddress);