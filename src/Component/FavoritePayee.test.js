import React from 'react';
import { shallow } from 'enzyme';
import FavoritePayee from './FavoritePayee';

describe('FavoritePayee', () => {
  let wrapper;
  let payeeMock;
  let onFavoriteMock;
  describe('#render', () => {
    payeeMock = {
      id: 1,
      name: 'Adit A A',
      cashtag: 'adit',
      address: 'Jakarta',
      phoneNumber: '09871221090',
      email: 'adit@gmail.com',
      profileImage: 'profil image',
      createdAt: '2019-12-12T16:21:19.936Z',
      updatedAt: '2019-12-12T16:21:19.936Z'
    };
    onFavoriteMock = jest.fn();

    beforeEach(() => {
      wrapper = shallow(
        <FavoritePayee payee={payeeMock} onFavorite={onFavoriteMock} />
      );
    });

    it('should render card payee', () => {
      expect(wrapper.find({ testID: 'card-payee' })).toHaveLength(1);
    });

    it('should call onFavorite with the received payee when the favorite button is clicked', () => {
      wrapper.find({ testID: 'favorite' }).simulate('press');

      expect(onFavoriteMock).toBeCalledWith(payeeMock);
    });
  });
});
