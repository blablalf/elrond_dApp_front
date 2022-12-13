import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import {
  BigUIntValue,
  BooleanValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  StringValue,
  TypedValue
} from '@elrondnetwork/erdjs';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { contractAddress } from 'config';

function stringToHex(str: string): string {
  return (
    '0x' +
    str
      .split('')
      .map((char: string) =>
        ('000' + char.charCodeAt(0).toString(16)).slice(-4)
      )
      .join('')
  );
}

export const Actions = () => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const setBaseDatas = async () => {
    const args: TypedValue[] = [
      new StringValue(
        stringToHex('QmWij4TM2BJ2CNHrdUYam6imQxQdL3dxL9GiUwjHGQajC1')
      ),
      new StringValue(
        stringToHex('QmTRUExHZfnUQKQM4x9AbZYAjhHC8687DrPdiF7bJUuzQB')
      ),
      //new NumericalValue(new U32Type(), 0.1), // for decimals values
      new BigUIntValue(1),
      new BigUIntValue(1),
      new BigUIntValue(15),
      new BigUIntValue(3000000000000000000),
      new StringValue(stringToHex('jpeg')),
      new StringValue(stringToHex('')),
      new StringValue(stringToHex('')),
      new BooleanValue(false)
      //new AddressValue(new Address(address.trim())) // If u want ot add a segwit or endoded address
    ];

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('setBaseDatas'))
      .setArgs(args)
      .build();

    // data could also be a string like this : 'setBaseDatas@516D57696A34544D32424A32434E4872645559616D36696D517851644C3364784C39476955776A484751616A4331@516D5452554578485A666E55514B514D34783941625A59416A6848433836383744725064694637624A55757A5142@01@01@0F@4563918244F40000@6A706567@@@00'

    const setBaseDatasTransaction = {
      value: '50000000000000000',
      data: data,
      receiver: contractAddress,
      gasLimit: '60000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: setBaseDatasTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing setBaseDatas transaction',
        errorMessage: 'An error has occured during setBaseDatas',
        successMessage: 'setBaseDatas transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <div className='d-flex mt-4 justify-content-center'>
      {!hasPendingTransactions ? (
        <div className='action-btn' onClick={setBaseDatas}>
          <button className='btn'>
            <FontAwesomeIcon icon={faArrowDown} className='text-primary' />
          </button>
          <a href='/' className='text-white text-decoration-none'>
            Set Base Datas
          </a>
        </div>
      ) : (
        <>
          You have a pending transaction, please wait until it is finished and
          retry
        </>
      )}
    </div>
  );
};
