import StorageService from './StorageService';
import SInfo from 'react-native-sensitive-info';

const { saveToken, saveUserData, getToken } = StorageService;

jest.mock('react-native-sensitive-info', () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}));

describe('StorageService', () => {
  let dataUser;
  let token;
  beforeEach(() => {
    SInfo.setItem.mockResolvedValue({});
    dataUser = {
      email: 'a@a.a',
      password: '123'
    };
    token = 'asdf';
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('StorageService', () => {
    it('should call a axios.post function with the dataUser', async () => {
      await saveToken(token);

      expect(SInfo.setItem).toHaveBeenCalledWith('Token', token, {});
    });

    it('should call saveToken with the response token', async () => {
      await saveUserData(dataUser);

      expect(SInfo.setItem).toHaveBeenCalledWith(
        'User',
        JSON.stringify(dataUser),
        {}
      );
    });

    it('should call getToken with Token keyword', async () => {
      await getToken();

      expect(SInfo.getItem).toHaveBeenCalledWith('Token', {});
    });
  });
});
