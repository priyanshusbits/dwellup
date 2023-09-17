// Replace with your contract ABI and deployed contract address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_buyer",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "_seller",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "Approved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "Rejected",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "burnStakedAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buyer",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buyerStaked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "seller",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sellerApproved",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sellerRejected",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stakedAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const contractAddress = '...';

let web3;
let contract;
let account;

// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
  contract = new web3.eth.Contract(contractABI, contractAddress);
} else {
  alert('Please install MetaMask to use this dApp.');
}

// Request account access
async function requestAccount() {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
  } catch (error) {
    console.error('User denied account access');
  }
}

// Interact with the contract functions
async function stake(amount) {
  await requestAccount();
  const weiAmount = web3.utils.toWei(amount, 'ether');
  await contract.methods.stake().send({ from: account, value: weiAmount });
}

async function approve() {
  await requestAccount();
  await contract.methods.approve().send({ from: account });
}

async function reject() {
  await requestAccount();
  await contract.methods.reject().send({ from: account });
}

async function withdraw() {
    await requestAccount();
    await contract.methods.withdraw().send({ from: account });
  }
  
  async function burnStakedAmount() {
    await requestAccount();
    await contract.methods.burnStakedAmount().send({ from: account });
  }
  
  // Add UI event listeners and DOM manipulation
  document.getElementById('stakeBtn').addEventListener('click', async () => {
    const stakeAmount = document.getElementById('stakeAmount').value;
    if (stakeAmount) {
      await stake(stakeAmount);
    } else {
      alert('Please enter a valid stake amount.');
    }
  });
  
  document.getElementById('approveBtn').addEventListener('click', async () => {
    await approve();
  });
  
  document.getElementById('rejectBtn').addEventListener('click', async () => {
    await reject();
  });
  
  document.getElementById('withdrawBtn').addEventListener('click', async () => {
    await withdraw();
  });
  
  document.getElementById('burnBtn').addEventListener('click', async () => {
    await burnStakedAmount();
  });
  