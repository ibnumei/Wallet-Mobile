import { StyleSheet } from 'react-native';

const transferOptionStyles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    color: '#F79C06',
    fontWeight: 'bold'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconBox: {
    backgroundColor: '#F79C06',
    width: 150,
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  optionContainer: {
    marginTop: 40,
    width: '30%',
    marginLeft: 195
  },
  box: {
    justifyContent: 'flex-end',
    marginRight: 20
  },
  transactionType: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  insideBox: {
    paddingBottom: 5
  }
});

export default transferOptionStyles;
