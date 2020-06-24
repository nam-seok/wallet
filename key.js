//const crypto = require("crypto");

import crypto, { Hash } from "crypto";
import secp256k1 from "secp256k1";
import createkeccakHash from "keccak";
import Mnemonic from "bitcore-mnemonic";
//import keccak from "keccak"

function createPrivateKey() {
    let privatekey;
    do {
        privatekey = crypto.randomBytes(32);
        //secp256k1.privateKeyVerify(privatekey);
    } while (secp256k1.privateKeyVerify(privatekey) === false);
    return privatekey;
}

//console.log(createPrivateKey().toString("hex"));

function createPublicKey(privatekey, compressde = false) {
    return Buffer.from(secp256k1.publicKeyCreate(privatekey, compressde));
}

function createAddress(publickey) {
    const hash = createkeccakHash("keccak256").update(publickey.slice(1)).digest("hex");
    return "0x" + hash.slice(24);
}

function toChecksumAddress (address) {
    address = address.toLowerCase().replace('0x', '')
    var hash = createkeccakHash('keccak256').update(address).digest('hex')
    var ret = '0x'
  
    for (var i = 0; i < address.length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        ret += address[i].toUpperCase()
      } else {
        ret += address[i]
      }
    }
  
    return ret
  }


function privatekeyToAddress(privatekey) {
  const publickey = createPublicKey(privatekey);
  const address = createAddress(publickey);
  return toChecksumAddress(address);
}

function createMnemonic(wordsCount = 12) {
  if (wordsCount < 12 || wordsCount > 24 || wordsCount % 3 !== 0) {
    throw new Error("invalid number of words");
  }
  const entropy =(16 + (wordsCount - 12) / 3 * 4) * 8;
  return new Mnemonic(entropy);
  //return new Mnemonic(crypto.randomBytes(entropy));
}

function mnemonicToPrivateKey(mnemonic) {
  const privateKey = mnemonic.toHDPrivateKey().derive("m/44'/60'/0'/0/0").privateKey;
  return Buffer.from(privateKey.toString(), "hex");
}

const mnemonic = createMnemonic();
console.log(mnemonic.toString());

const privateKey = mnemonicToPrivateKey(mnemonic);
console.log(privateKey.toString("hex"));

const address = privatekeyToAddress(privateKey);
console.log(address);




//const privatekey = createPrivateKey();
//const publickey = createPublicKey(privatekey);
//const address = createAddress(publickey);
//const checksumAddress = toChecksumAddress(address);

//console.log(address);
//console.log(checksumAddress);








//const privatekey = Buffer.from("005e46f2818e5fbafa6945b65e8b6ffb18105b8640a8809257deef8b7cc40616", "hex");

//const publickey = createPublicKey(privatekey);
//const address = createAddress(publickey);

//console.log(address);




//let privatekey = createPrivateKey();
//console.log("private Key:", privatekey.toString("hex"));

//const publickey = createPublicKey(privatekey);
//const address = createAddress(publickey);
//console.log("Address:", address);
//console.log("Address:", createAddress(createPublicKey(privatekey))); (위에 3줄을 한 줄로 표현한 것)


//console.log(createPublicKey(privatekey).toString("hex"));
//console.log(createPublicKey(privatekey, true).toString("hex"));

