import Web3 from "web3";

const web3 = new Web3();

const privatekey = "0x005e46f2818e5fbafa6945b65e8b6ffb18105b8640a8809257deef8b7cc40616";
const account = web3.eth.accounts.privateKeyToAccount(privatekey);

console.log(account);