import * as should from 'should';
import TransactionBuilder from '../../src/transactionBuilder';
import { CoinFactory } from '../../src/coinFactory';
import BigNumber from 'bignumber.js';
import { TransactionType } from '../../src/coin/baseCoin/enum';
import { NetworkType } from '@bitgo/statics';
import TestCoin, { Address } from '../../src/coin/testcoin';

describe('Transaction builder', () => {
  let txBuilder: TransactionBuilder;
  let coin: TestCoin;

  before(() => {
    coin = CoinFactory.getCoin('test') as TestCoin;
    txBuilder = new TransactionBuilder({ coin });
  });

  it('should add an destination address that is valid', () => {
    coin.setVariable({ validateAddress: true });

    txBuilder.addDestination(new Address(), new BigNumber(0));
  });

  it('should add an from address that is valid', () => {
    coin.setVariable({ validateAddress: true });

    txBuilder.addFrom(new Address());
  });

  it('should parse a raw transaction that is valid', () => {
    const validTx = { isValid: () => true, rawTx: null, parsedTx: null, transactionType: TransactionType.Send };
    coin.setVariable({ parseTransaction: validTx });

    txBuilder.from(null, TransactionType.Send);
  });

  it('should sign a transaction that is valid', () => {
    const validTx = { isValid: () => true, rawTx: null, parsedTx: null, transactionType: TransactionType.Send };

    coin.setVariable({ sign: { signature: '' }, validateKey: true, parseTransaction: validTx });

    txBuilder.from(null, TransactionType.Send);
    txBuilder.sign({ key: ''  }, new Address());
  });

  it('should build an existing transaction that is valid', () => {
    const validTx = { isValid: () => true, rawTx: null, parsedTx: null, transactionType: TransactionType.Send };
    coin.setVariable({ buildTransaction: validTx });

    txBuilder.from(null, TransactionType.Send);
    txBuilder.build();
  });
});