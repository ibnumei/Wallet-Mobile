import Toast from 'react-native-root-toast';

const toastNotification = (message, backgroundColor) => {
  return Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: -100,
    shadow: false,
    animation: true,
    hideOnPress: true,
    backgroundColor: backgroundColor
  });
};

export default {
  toastNotification
};
