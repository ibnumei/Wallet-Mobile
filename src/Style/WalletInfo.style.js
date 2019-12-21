import { StyleSheet } from 'react-native';

const walletInfoStyles = StyleSheet.create({
  actionIcon: {
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: '#F79C06'
  },
  actionIconBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-evenly'
  },
  action: {
    alignItems: 'center'
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#138ee6'
  },
  titleBalance: {
    color: '#a5a5a5',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    marginTop: 20
  },
  currency: {
    flex: 1,
    marginTop: 3,
    fontFamily: 'Poppins-Regular',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  idr: {
    color: '#a5a5a5',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold'
  }
});

export default walletInfoStyles;
