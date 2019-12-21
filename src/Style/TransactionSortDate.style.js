import { StyleSheet } from 'react-native';

const TransactionSortDateStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: '#F79C06',
    padding: 5,
    width: '40%',
    borderRadius: 10
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15
  }
});

export default TransactionSortDateStyles;
