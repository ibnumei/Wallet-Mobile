import React from 'react';
import { shallow } from 'enzyme';
import Transfer from './Transfer';
import { Alert } from 'react-native';

describe('Transfer', () => {
  describe('#render', () => {
    let rightWrapper;
    let wrongWrapper;
    let onCheckMock;
    let onTransferMock;
    let onFavoriteMock;
    let onAddFavoriteMock;
    let payeeMock;

    beforeEach(async () => {
      onCheckMock = jest.fn();
      onTransferMock = jest.fn();
      onFavoriteMock = jest.fn();
      onAddFavoriteMock = jest.fn();
      payeeMock = {};
      Alert.alert = jest.fn();

      rightWrapper = shallow(
        <Transfer
          payee={payeeMock}
          onCheck={onCheckMock}
          onTransfer={onTransferMock}
          onFavorite={onFavoriteMock}
          onAddFavorite={onAddFavoriteMock}
          isExist={true}
        />
      );

      wrongWrapper = shallow(
        <Transfer
          payee={payeeMock}
          onCheck={onCheckMock}
          onTransfer={onTransferMock}
          onFavorite={onFavoriteMock}
          isExist={false}
        />
      );
      await flushPromises();
    });

    it('should call onCheck with the input cashtag as typed', async () => {
      const inputtedCashtag = 'monang';

      const cashtagInput = rightWrapper.find({ testID: 'cashtag' });
      cashtagInput.simulate('changeText', inputtedCashtag);
      const checkButton = rightWrapper.find({ testID: 'check' });
      checkButton.simulate('press');

      expect(onCheckMock).toHaveBeenCalledWith(inputtedCashtag);
    });

    it('should render wrong symbol when the cashtag is not exist', () => {
      wrongWrapper.find({ testID: 'check' }).simulate('press');

      expect(wrongWrapper.find({ testID: 'right-cashtag' })).toHaveLength(0);
      expect(wrongWrapper.find({ testID: 'wrong-cashtag' })).toHaveLength(1);
    });

    it('should call onTransfer with the transfer data that has been inputted', () => {
      const inputtedCashtag = 'monang';
      const inputtedAmount = '100000';
      const inputtedDescription = 'beli kopi';

      const cashtagInput = rightWrapper.find({ testID: 'cashtag' });
      cashtagInput.simulate('changeText', inputtedCashtag);
      const checkButton = rightWrapper.find({ testID: 'check' });
      checkButton.simulate('press');
      const amountInput = rightWrapper.find({ testID: 'amount' });
      amountInput.simulate('changeText', inputtedAmount);
      const descriptionInput = rightWrapper.find({ testID: 'description' });
      descriptionInput.simulate('changeText', inputtedDescription);
      const transferButton = rightWrapper.find({ testID: 'transfer' });
      transferButton.simulate('press');
      const {
        onPress: onPressTransferButton
      } = Alert.alert.mock.calls[0][2][1];
      onPressTransferButton();

      expect(onTransferMock).toHaveBeenCalledWith(
        inputtedAmount,
        inputtedDescription
      );
    });

    it('should call onAddFavorite with the verified payee', () => {
      const inputtedCashtag = 'monang';

      const cashtagInput = rightWrapper.find({ testID: 'cashtag' });
      cashtagInput.simulate('changeText', inputtedCashtag);
      const checkButton = rightWrapper.find({ testID: 'check' });
      checkButton.simulate('press');
      const favoriteButton = rightWrapper.find({ testID: 'favorite' });
      favoriteButton.simulate('press');

      expect(onAddFavoriteMock).toHaveBeenCalledWith(payeeMock);
    });
  });
});
