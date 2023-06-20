import {ethers} from './ethers-5.7.esm.min.js'
import {bankABI, bankAddress} from './constants.js'

const connectButton = document.getElementById('connectButton');
const withdraw = document.getElementById('withdraw');
const send = document.getElementById('send');
const inputNumber = document.getElementById('inputNumber');
const balanceButton = document.getElementById('balanceButton');
const balance = document.getElementById('balance');

let connectedAccount

// What happens when the user clicks on the connect button
connectButton.addEventListener('click', async function() {
    if(typeof window.ethereum !== 'undefined') {
        const resultAccount = await window.ethereum.request({ method: 'eth_requestAccounts' })  
        connectedAccount = ethers.utils.getAddress(resultAccount[0])
        connectButton.innerHTML = "Connected with " + connectedAccount.substring(0, 4) + "..." + connectedAccount.substring(connectedAccount.length - 4)
    }
    else {
        connectButton.innerHTML = "Please install Metamask!"
    }
})

withdraw.addEventListener('click', async function() {
    if(typeof window.ethereum !== "undefined" && connectedAccount) {
        try {
            let inputNumberByUser = inputNumber.value 
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const network = await provider.getNetwork()
            console.log(network.chainId.toString())
            const signer = provider.getSigner()
            const contract = new ethers.Contract(bankAddress, bankABI, signer)

            let value = ethers.utils.parseEther(inputNumberByUser, 'ether')

            const number = await contract.withdraw(value)
        }
        catch(e) {
            console.log(e)
        }
    }
})

send.addEventListener('click', async function() {
    if(typeof window.ethereum !== "undefined" && connectedAccount) {
        try {
            let inputNumberByUser = inputNumber.value 
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const network = await provider.getNetwork()
            console.log(network.chainId.toString())
            const signer = provider.getSigner()
            const contract = new ethers.Contract(bankAddress, bankABI, signer)
            let msg = {
                value: ethers.utils.parseEther(inputNumberByUser, 'ether'),
                gasLimit: 3e7
            }
            await contract.sendEthers(msg)

            /*
            let tx = {
                to: bankAddress,
                value: ethers.utils.parseEther(inputNumberByUser, 'ether'),
                gasLimit: 3e7
            };
            const transaction = await signer.sendTransaction(tx);
            */
        }
        catch(e) {
            console.log(e)
        }
    }
})

balanceButton.addEventListener('click', async function() {
    if(typeof window.ethereum !== "undefined" && connectedAccount) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const network = await provider.getNetwork()
            console.log(network.chainId.toString())
            let bal = await provider.getBalance(bankAddress);
            console.log(bal)
            balance.innerHTML = ethers.utils.formatEther(bal)
            /*
            let tx = {
                to: bankAddress,
                value: ethers.utils.parseEther(inputNumberByUser, 'ether'),
                gasLimit: 3e7
            };
            const transaction = await signer.sendTransaction(tx);
            */
        }
        catch(e) {
            console.log(e)
        }
    }
})

