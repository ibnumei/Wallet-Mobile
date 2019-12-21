import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    fontFamily: 'Poppins-Regular',
    shadowOffset: { width: 2, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    padding: '1% 2% 2% 2%'
  },
  boxHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular'
  },
  boxHeaderModal: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f2f2f2'
  },
  modalTitle: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 15
  },
  boxTitle: {
    color: '#a5a5a5',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular'
  },
  boxLink: {
    color: '#F79C06'
  },
  header: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderRadius: 25
  },
  headerTitle: {
    alignSelf: 'center',
    color: '#444444',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 8,
    fontFamily: 'Poppins-Regular'
  },
  dashboardBody: {
    maxHeight: '100%',
    fontFamily: 'Poppins-Regular',
    margin: '2% 2%'
  },
  body: {
    maxHeight: '83%',
    fontFamily: 'Poppins-Regular',
    margin: '2% 2%'
  },
  rectangle: {
    backgroundColor: '#e6e6e6',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 50,
    marginHorizontal: 15,
    height: '40%'
  },
  topUpInput: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 1,
    fontSize: 25,
    width: '90%',
    fontWeight: 'bold',
    color: '#393939'
  },
  topUpIDR: {
    fontSize: 18,
    color: '#646464',
    marginBottom: 10,
    marginRight: 5,
    fontWeight: 'bold'
  },
  rectangleDescription: {
    color: '#838383',
    fontSize: 15,
    paddingBottom: 10
  },
  rectangleBody: {
    flexDirection: 'row'
  },
  fontType: {
    fontFamily: 'Poppins-Regular'
  },
  topUpButton: {
    justifyContent: 'center',
    width: '93%',
    marginHorizontal: 16,
    height: 50,
    backgroundColor: '#F79C06',
    borderRadius: 25,
    marginTop: 15
  },
  toUpButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  detailRectangle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    marginTop: 20,
    justifyContent: 'space-between',
    borderRadius: 15,
    shadowColor: '#d1d1d1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1
  },
  detailRectangleRow: {
    flexDirection: 'column'
  },
  detailRectangleRowHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 2,
    color: '#393939'
  },
  detailRectangleRowDescription: {
    color: '#656565',
    marginLeft: 15
  }
});

export default globalStyles;
