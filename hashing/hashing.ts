import keccakHash from 'keccak';
import { promises } from 'fs';
import sha256 from 'js-sha256';

const fileToRead = await promises.readFile('./secondSorrow.txt', {
  encoding: 'utf8',
});

//console.log(fileToRead);
class Block {
  constructor(word) {
    this.index = blockChain.length;
    this.data = word;
    this.timeStamp = Date.now();
    this.prevHash =
      //accessing prev has of obj in array
      blockChain.length === 0
        ? undefined
        : blockChain[blockChain.length - 1].hash;
    this.dataToHash = (
      this.index +
      this.data +
      this.timeStamp +
      this.prevHash
    ).toString();
    this.hash = blockChain.length === 0 ? '000000' : sha256(this.dataToHash);
  }
}
const blockChain = [];
const createBlock = (string) => {
  //loop though strings passed into create block
  //each new string will be asigned to new obj

  string.split(' ').forEach(addToChain);

  function addToChain(word) {
    //create obj
    //compute hash
    //push obj into blockchain

    blockChain.push(new Block(word));
  }
};

createBlock(fileToRead);
console.log(blockChain);

const verifyChain = (chain) => {
  let chainVerified;
  let unverifiedBlock;

  const registerAndBreak = (block) => {
    unverifiedBlock = block;
    chainVerified = false;
    return;
  };

  for (let block of chain) {
    if (block.data === undefined || block.index < 0) registerAndBreak(block);
    if (block.index === 0 && block.hash !== '000000') registerAndBreak(block);

    if (block.index > 0) {
      if (block.prevBlockHash === undefined) registerAndBreak(block);
      let prevBlockHash = blockChain[block.index - 1].hash;
      if (block.prevHash !== prevBlockHash) registerAndBreak(block);
    }
  }
  if (chainVerified === false) return unverifiedBlock;
  return (chainVerified = true);
};
console.log(verifyChain(blockChain));
