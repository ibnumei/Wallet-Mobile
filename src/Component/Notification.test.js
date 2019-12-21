import Notification from './Notification';
import Toast from 'react-native-root-toast';

const { toastNotification } = Notification;

jest.mock('react-native-root-toast', () => ({
  show: jest.fn(),
  durations: {
    SHORT: 1
  }
}));

describe('LoginForm', () => {
  describe('#toastNotification', () => {
    it('should has Toast component with background color and message as expected', () => {
      const expectBackgroundColor = '#FFF';
      const expectedOption = {
        duration: 1,
        position: -100,
        shadow: false,
        animation: true,
        hideOnPress: true,
        backgroundColor: expectBackgroundColor
      };
      const expectedMessage = 'tidak bisa login';

      toastNotification(expectedMessage, expectBackgroundColor);

      expect(Toast.show).toHaveBeenCalledWith(expectedMessage, expectedOption);
    });
  });
});
