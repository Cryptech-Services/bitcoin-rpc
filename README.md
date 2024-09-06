[![GitHub license](https://img.shields.io/github/license/Cryptech-Services/bitcoin-rpc)](https://github.com/Cryptech-Services/bitcoin-rpc/blob/master/LICENSE.md) [![npm version](https://badge.fury.io/js/@cryptech.services%2Fbitcoin-rpc.svg)](https://badge.fury.io/js/@cryptech.services%2Fbitcoin-rpc) ![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Cryptech-Services/bitcoin-rpc/master) [![Node.js CI](https://github.com/Cryptech-Services/bitcoin-rpc/actions/workflows/node.js.yml/badge.svg)](https://github.com/Cryptech-Services/bitcoin-rpc/actions/workflows/node.js.yml)

# bitcoin-rpc

A simple, efficient, zero-dep Bitcoin RPC interface.

## Why?

Most other Bitcoin RPC libraries either:

- Have unnecessary dependencies.
- Don't follow proper standards (silent RPC errors, strange Promise handling, etc).
- Have hardcoded RPC commands, meaning the lib must be upgraded every time the RPC daemon changes, seriously?

## But why fork it?

TypeScript compilation allows the types to be easily exported, meaning that when the library updates, users of it won't have to update their types definitions manually in a separate file.

## How?

```ts
import RPC from '@cryptech.services/bitcoin-rpc';

// Create a new RPC class for a Bitcoind RPC daemon
//                      user    pass      host      port
const btcRPC = new RPC('user', 'pass', '127.0.0.1', 8332);

// EXAMPLE: Fetch the latest block count
btcRPC.call('getblockcount').then((nBlocks) => {
  console.log("There's " + nBlocks + ' blocks in the blockchain, nice!');
});

// EXAMPLE: Fetch a raw block based on it's block hash
btcRPC
  .call(
    'getblock',
    '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
  )
  .then((cBlock) => {
    console.log(cBlock);
  });

// EXAMPLE: Asynchronously fetch the latest block count
async function getBlockCount() {
  const nBlocks = await btcRPC.call('getblockcount');
  console.log("There's " + nBlocks + ' blocks in the blockchain, nice!');
}
```
