import { StyleSheet } from 'react-native';

const transactionSortStyle = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  selectedSort: {
    backgroundColor: '#F79C06',
    padding: 5,
    width: '45%',
    borderRadius: 10,
    marginTop: 20
  },
  applyButton: {
    backgroundColor: '#F79C06',
    padding: 5,
    width: '50%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    marginLeft: '10%',
    marginRight: '5%'
  },
  unselectedSort: {
    borderColor: '#F79C06',
    borderWidth: 2,
    padding: 5,
    width: '45%',
    borderRadius: 10,
    marginTop: 20
  },
  selectedText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15
  },
  selectedApply: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
  unselectedText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15
  },
  optionsContainer: {
    marginTop: '10%',
    padding: 5,
    paddingBottom: '10%'
  }
});

export default transactionSortStyle;
