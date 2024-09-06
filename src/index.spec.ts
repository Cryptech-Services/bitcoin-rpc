import { deepEqual, equal } from 'assert';
import sinon from 'sinon';
import RPC from './index';

describe('RPC Client tests', () => {
  let rpc: RPC;
  let callStub: sinon.SinonStub;

  beforeEach(() => {
    rpc = new RPC('user', 'pass', 'localhost', 8332);
    callStub = sinon.stub(rpc, 'call');
  });

  afterEach(() => {
    callStub.restore();
  });

  it('should construct an RPC client', () => {
    equal(rpc instanceof RPC, true);
  });

  it('should fetch the latest block count', async () => {
    callStub.withArgs('getblockcount').resolves(700000);

    const nBlocks = await rpc.call('getblockcount');
    equal(nBlocks, 700000);
    equal(callStub.calledOnce, true, 'callStub should be called once');
    equal(
      callStub.calledWith('getblockcount'),
      true,
      'callStub should be called with "getblockcount"'
    );
  });

  it('should fetch a raw block based on its block hash', async () => {
    // Mock the btcRPC.call method
    const mockBlock = {
      hash: 'e1cc780b0e995aace587dd511094168d31821cfd0d1cb40fe263b95da61d84ab',
      confirmations: 368858,
      strippedsize: 763,
      size: 799,
      weight: 3088,
      height: 1000000,
      version: 973078528,
      versionHex: '3a000000',
      merkleroot:
        'dca4bd5887e1c3197850e3d78c104e6d3763fd7f6936ca74afd28127da541299',
      hashStateRoot:
        'b902738e4f1110670fe7cd3482028f5879e71cb14c28d11b6d53b3b527e08027',
      hashUTXORoot:
        'eae2a6a98210a757a6aa46dc7ae9db291a4aa51cf95aa1bc66a219d0834b7cfc',
      prevoutStakeHash:
        'ad1de70e7d620802d05cdbb4486e369a78396bf3166986d744f1e8515755bb58',
      prevoutStakeVoutN: 1,
      tx: [
        '47ee826fcb671c885b58a0575f76272eb30a44bd4806bb7086ee7c269ad6ab0e',
        '63cc108da767592358b045d3ebc5b56b6037c76b2f9a286e43f46ab92bcaeac4',
        '55d7fe24db6a49395937378bc6120fa8125d606007e084a16e8a539d002b55aa'
      ],
      time: 1691487712,
      mediantime: 1691487328,
      nonce: 0,
      bits: '190bb6eb',
      difficulty: 366630518.7461624,
      chainwork:
        '000000000000000000000000000000000000000000015ba36fe1c92d4d7c51aa',
      nTx: 3,
      previousblockhash:
        'a8f9082d2c897b84df3118a5c0688c45a1c7ab211fb8beeabc541648a8a0050d',
      nextblockhash:
        '6da270af08a2190c6bf98f7bd6ab065a12cec9a9f4d79df2a822081c43f93747',
      flags: 'proof-of-stake',
      proofhash:
        '0000000000000000000000000000000000000000000000000000000000000000',
      modifier:
        '5743097fc7f32d310463e9a91d56a8b958eb75107e149fec417277bfc8808e91',
      signature:
        '304402203b8d806a10b774d4223090ac6bd04e0ed6a0ebf3a3a32522f5c093519300cbd0022007bfde2a6657e1e2e890c9de675f6d828717246ba7145f513de780fab0702058'
    };
    callStub
      .withArgs(
        'getblock',
        'e1cc780b0e995aace587dd511094168d31821cfd0d1cb40fe263b95da61d84ab'
      )
      .resolves(mockBlock);

    const cBlock = await rpc.call(
      'getblock',
      'e1cc780b0e995aace587dd511094168d31821cfd0d1cb40fe263b95da61d84ab'
    );

    equal(callStub.calledOnce, true, 'callStub should be called once');
    equal(
      callStub.calledWith(
        'getblock',
        'e1cc780b0e995aace587dd511094168d31821cfd0d1cb40fe263b95da61d84ab'
      ),
      true,
      'callStub should be called with the correct arguments'
    );
    deepEqual(cBlock, mockBlock);
  });
});
