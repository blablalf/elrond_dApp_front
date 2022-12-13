import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@elrondnetwork/dapp-core/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@elrondnetwork/dapp-core/services';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import {
  BigUIntValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  TypedValue
} from '@elrondnetwork/erdjs';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { contractAddress } from 'config';

export const Actions = () => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const mint = async () => {
    const args: TypedValue[] = [new BigUIntValue(1)];

    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('mint'))
      .setArgs(args)
      .build();

    const setBaseDatasTransaction = {
      value: '3000000000000000000',
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
        <div className='action-btn' onClick={mint}>
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
