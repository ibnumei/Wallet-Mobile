import axios from 'axios';
import TransactionService from './TransactionService';

const {
  getTransactionByUserId,
  topUpWallet,
  transfer,
  checkPayee
} = TransactionService;

jest.mock('axios');

describe('TransactionService', () => {
  let transaction;
  let response;
  let topUpResponse;
  let payeeResponse;
  let wallet;
  let payee;

  beforeEach(() => {
    transaction = [
      {
        id: 1,
        walletId: 1,
        nominal: 1000,
        balance: 1000,
        type: 'deposit',
        description: 'test',
        createdAt: '2019-12-01T00:03:03.432Z',
        updatedAt: '2019-12-01T00:03:03.432Z',
        beneficiaryData: {
          id: 1,
          cashtag: 'mitshuki',
          name: 'Mitshuki Temannya Boruto'
        }
      }
    ];

    topUpResponse = {
      data: {
        id: 6,
        walletId: 1,
        nominal: 100000,
        type: 'deposit',
        description: 'top up wallet balance',
        beneficiaryId: null,
        updatedAt: '2019-12-16T07:28:55.412Z',
        createdAt: '2019-12-16T07:28:55.412Z'
      }
    };

    payee = {
      id: 2,
      name: 'Adit A A',
      cashtag: 'adit',
      address: 'Jakarta',
      phoneNumber: '09871221090',
      email: 'adit@gmail.com',
      profileImage: 'profil image',
      createdAt: '2019-12-12T16:21:19.936Z',
      updatedAt: '2019-12-12T16:21:19.936Z'
    };

    payeeResponse = {
      data: [payee]
    };

    wallet = {
      id: 1
    };

    response = { data: transaction };
    axios.get.mockResolvedValue(response);
    axios.post.mockResolvedValue(topUpResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransactionByUserId', () => {
    it('should return list of transaction based on user id', async () => {
      const result = await getTransactionByUserId(1, null, wallet.id);

      expect(result).toEqual(response);
    });

    it('should return zero list of transaction based on user id when the limit is 0', async () => {
      axios.get.mockResolvedValue({});

      const result = await getTransactionByUserId(1, 0, wallet.id);

      expect(result).toEqual({});
    });

    it('should return two list of transaction based on user id when the limit is 2', async () => {
      const result = await getTransactionByUserId(1, 2, wallet.id);

      expect(result).toEqual(response);
    });
  });

  describe('#topUpWallet', () => {
    it('should return new deposit transaction', async () => {
      const result = await topUpWallet(1, 100000, wallet.id);

      expect(result).toEqual(topUpResponse);
    });

    it('should call axios post with new deposit transaction', async () => {
      const resultBody = {
        type: 'deposit',
        nominal: 100000,
        description: 'top up wallet balance'
      };

      topUpWallet(1, 100000, wallet.id);
      await flushPromises();

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/users/1/wallets/1/transactions',
        resultBody
      );
    });
  });

  describe('#transfer', () => {
    it('should return new transfer transaction', async () => {
      axios.post.mockResolvedValue(payeeResponse);
      await flushPromises();
      const result = await transfer(1, 1, 2, 100000, 'bayar utang');

      expect(result).toEqual(payeeResponse);
    });

    it('should call axios post with new transfer transaction', async () => {
      const resultBody = {
        beneficiaryId: 2,
        type: 'withdraw',
        nominal: 100000,
        description: ' bayar utang'
      };

      transfer(1, 1, 2, 100000, 'bayar utang');

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/users/1/wallets/1/transactions',
        resultBody
      );
    });
  });

  describe('#checkPayee', () => {
    it('should return payee data', async () => {
      axios.get.mockResolvedValue(payeeResponse);
      const result = await checkPayee('adit');

      expect(result).toEqual(payee);
    });

    it('should call axios get with cashtag', async () => {
      const cashtag = 'adit';

      checkPayee(cashtag);

      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:3000/users?cashtag=${cashtag}`
      );
    });
  });
});
