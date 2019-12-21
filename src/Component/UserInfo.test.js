import React from 'react';
import { shallow } from 'enzyme';
import UserInfo from './UserInfo';

describe('UserInfo', () => {
  describe('#render', () => {
    it('should render name, cashtag, phoneNumber, and email', () => {
      const user = {
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
      const wrapper = shallow(<UserInfo user={user} />);
      const cashtag = wrapper.find({ testID: 'cashtag' });
      const address = wrapper.find({ testID: 'address' });
      const phoneNumber = wrapper.find({ testID: 'phone-number' });
      const email = wrapper.find({ testID: 'email' });

      expect(cashtag.props().children).toEqual(['$', user.cashtag]);
      expect(address.props().children).toEqual(user.address);
      expect(phoneNumber.props().children).toEqual(user.phoneNumber);
      expect(email.props().children).toEqual(user.email);
    });
  });
});
