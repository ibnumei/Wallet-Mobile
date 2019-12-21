import React from 'react';
import { Image, Text, View } from 'react-native';
import userInfoStyles from '../Style/UserInfo.style';
import iconProfile from '../asset/image/icon-profile.png';
import globalStyles from '../Style/Global.style';
import PropTypes from 'prop-types';

class UserInfo extends React.PureComponent {
  _renderDetail = (cashtag, address, phoneNumber, email, name) => {
    return (
      <>
        <View style={userInfoStyles.infoItem}>
          <Image
            testID="profile-image"
            style={userInfoStyles.profileImage}
            source={iconProfile}
          />
          <Text testID="hi-message" style={userInfoStyles.hiMessage}>
            {`Hi, ${name}!`}
          </Text>
        </View>
        <View style={userInfoStyles.infoItem}>
          <Text style={userInfoStyles.infoTitle}>$Cashtag</Text>
          <Text testID="cashtag" style={globalStyles.fontType}>
            ${cashtag}
          </Text>
        </View>
        <View style={userInfoStyles.infoItem}>
          <Text style={userInfoStyles.infoTitle}>Phone number</Text>
          <Text testID="phone-number" style={globalStyles.fontType}>
            {phoneNumber}
          </Text>
        </View>
        <View style={userInfoStyles.infoItem}>
          <Text style={userInfoStyles.infoTitle}>Email</Text>
          <Text testID="email" style={globalStyles.fontType}>
            {email}
          </Text>
        </View>
        <View style={userInfoStyles.infoItem}>
          <Text style={[userInfoStyles.infoTitle]}>Address</Text>
          <Text testID="address" style={globalStyles.fontType}>
            {address}
          </Text>
        </View>
      </>
    );
  };

  render() {
    const { user } = this.props;
    const { name, cashtag, address, phoneNumber, email } = user;
    const renderedDetail = this._renderDetail(
      cashtag,
      address,
      phoneNumber,
      email,
      name
    );
    return (
      <>
        <View style={globalStyles.box}>{renderedDetail}</View>
      </>
    );
  }
}
UserInfo.defaultProps = {
  user: {}
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    profileImage: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  })
};

export default UserInfo;
