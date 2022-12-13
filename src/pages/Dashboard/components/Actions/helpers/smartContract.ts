import {
  AbiRegistry,
  Address,
  SmartContract,
  SmartContractAbi
} from '@elrondnetwork/erdjs/out';

import { contractAddress } from 'config';
import json from 'elven-nft-minter.abi.json';

const abiRegistry = AbiRegistry.create(json);
const abi = new SmartContractAbi(abiRegistry);

export const smartContract = new SmartContract({
  address: new Address(contractAddress),
  abi
});
