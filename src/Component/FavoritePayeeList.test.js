import React from 'react';
import { shallow } from 'enzyme';
import FavoritePayeeList from './FavoritePayeeList';

describe('FavoritePayeeList', () => {
  let wrapper;
  let firstPayee;
  let favoritePayeesMock;
  let onFavoriteMock;
  describe('#render', () => {
    beforeEach(async () => {
      firstPayee = {
        id: 2,
        user: {
          id: 1,
          name: 'Adit A A',
          cashtag: 'adit',
          address: 'Jakarta',
          phoneNumber: '09871221090',
          email: 'adit@gmail.com',
          profileImage: 'profil image',
          createdAt: '2019-12-12T16:21:19.936Z',
          updatedAt: '2019-12-12T16:21:19.936Z'
        }
      };
      favoritePayeesMock = [firstPayee];
      onFavoriteMock = jest.fn();

      wrapper = shallow(
        <FavoritePayeeList
          favoritePayees={favoritePayeesMock}
          onFavorite={onFavoriteMock}
        />
      );
      await flushPromises();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should receive the props from favorite payees', () => {
      const favoritePayeeList = wrapper.find('FlatList');

      expect(favoritePayeeList.props().data).toEqual(favoritePayeesMock);
    });

    it('should call onFavoriteMock when the user click the favorite', async () => {
      const FavoritePayeeElement = wrapper.find('FlatList').props().renderItem;

      const secondWrapper = shallow(<FavoritePayeeElement item={firstPayee} />);

      secondWrapper.simulate('favorite');

      expect(onFavoriteMock).toHaveBeenCalled();
    });

    it('should render key extractor favorite element id to string', () => {
      const keyExtractorFavorite = wrapper
        .find('FlatList')
        .props()
        .keyExtractor(firstPayee);

      expect(keyExtractorFavorite).toEqual(firstPayee.id.toString());
    });
  });
});
