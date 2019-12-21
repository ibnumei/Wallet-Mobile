import { StyleSheet } from 'react-native';

const userInfoStyles = StyleSheet.create({
  infoHeader: {},
  profileImage: {
    backgroundColor: '#F79C06',
    marginTop: 10,
    borderRadius: 100
  },
  hiMessage: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    color: '#F79C06',
    width: '100%',
    marginLeft: '10%'
  },
  infoItem: {
    flexDirection: 'row',
    fontFamily: 'Poppins-Regular',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  infoTitle: {
    color: '#a5a5a5',
    fontFamily: 'Poppins-Regular'
  }
});

export default userInfoStyles;
