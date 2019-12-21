import { StyleSheet } from 'react-native';

const transferStyles = StyleSheet.create({
  transferButton: {
    justifyContent: 'center',
    width: '93%',
    marginHorizontal: 16,
    height: 50,
    backgroundColor: '#F79C06',
    borderRadius: 25,
    marginTop: 15
  },
  checkingButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 25,
    alignSelf: 'center'
  },
  selectedApply: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
  checkText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 7
  },
  right: {
    textAlign: 'center',
    color: 'green',
    fontSize: 35
  },
  wrong: {
    textAlign: 'center',
    color: 'red',
    fontSize: 35
  },
  rectangleDescription: {
    color: '#838383',
    fontSize: 15
  },
  inputTransferForm: {
    backgroundColor: '#e6e6e6',
    borderRadius: 25,
    padding: 20,
    width: '95%',
    marginTop: 50
  },
  transferForm: {
    backgroundColor: '#e6e6e6',
    borderRadius: 25,
    padding: 20,
    marginTop: 50,
    width: '95%'
  },
  payeeDetail: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginTop: 50,
    width: '95%'
  },
  rectangleBody: {
    flexDirection: 'row'
  },
  inputCashtag: {
    flex: 1,
    borderBottomColor: '#F79C06',
    borderTopColor: '#e8e8e8',
    borderLeftColor: '#e8e8e8',
    borderRightColor: '#e8e8e8',
    padding: 0,
    paddingTop: 1,
    borderWidth: 1,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#393939'
  },
  inputText: {
    flex: 1,
    borderBottomColor: '#F79C06',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 5,
    borderWidth: 1,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#393939'
  },
  inputAmount: {
    flex: 1,
    borderBottomColor: '#F79C06',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 5,
    borderWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#393939'
  },
  cashtagIcon: {
    fontSize: 25,
    paddingTop: 6,
    marginRight: 10,
    color: '#646464',
    fontWeight: 'bold'
  },
  IDRIcon: {
    paddingBottom: 8,
    fontSize: 24,
    marginRight: 10,
    color: '#646464',
    fontWeight: 'bold'
  },
  userImage: {
    width: 50,
    height: 50
  },
  favoriteIcon: {
    width: 30,
    height: 30,
    marginVertical: 10
  },
  userInfoDetail: {
    flexDirection: 'row'
  },
  inputBox: {
    marginTop: 40,
    marginBottom: 10
  },
  checkingButtonDisabled: {
    backgroundColor: 'darkgrey',
    padding: 5,
    borderRadius: 25,
    alignSelf: 'center'
  },
  transferCard: {
    alignItems: 'center'
  }
});

export default transferStyles;
