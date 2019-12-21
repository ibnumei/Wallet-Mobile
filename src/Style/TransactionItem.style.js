import { StyleSheet } from 'react-native';

const transactionItemStyles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    width: 35,
    height: 35
  },
  item: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA'
  },
  type: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%'
  },
  nominal: {
    fontWeight: 'bold',
    fontSize: 18
  },
  nominalDeposit: {
    color: '#00c853'
  },
  nominalWithdraw: {
    color: '#dd2c00'
  }
});

export default transactionItemStyles;
