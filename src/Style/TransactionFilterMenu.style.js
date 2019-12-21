import { StyleSheet } from 'react-native';

const transactionFilterMenuStyles = StyleSheet.create({
  optionsContainer: {
    marginTop: '10%',
    padding: 5,
    paddingBottom: '10%'
  },
  applyButton: {
    backgroundColor: '#00c853',
    padding: 5,
    width: '50%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    marginLeft: '10%',
    marginRight: '5%'
  },
  selectedApply: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
  iconBox: {
    width: 30,
    height: 30,
    backgroundColor: '#F79C06',
    borderRadius: 50,
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  iconFilter: {
    width: 10,
    height: 10
  }
});

export default transactionFilterMenuStyles;
