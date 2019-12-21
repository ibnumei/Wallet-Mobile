import { StyleSheet } from 'react-native';

const loginFormStyles = StyleSheet.create({
  formTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 30,
    fontWeight: '500',
    color: '#F79C06'
  },
  formSubtitle: {
    fontFamily: 'Poppins-Regular',
    marginBottom: '7%'
  },
  box: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '80%',
    height: '50%',
    padding: 10,
    shadowOffset: { width: 8, height: 10 },
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    borderRadius: 25,
    marginBottom: '10%'
  },
  textInput: {
    borderBottomWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    width: '80%',
    paddingVertical: 5,
    marginTop: '7%'
  },
  loginButton: {
    marginTop: '20%',
    width: 125,
    minHeight: 50,
    fontFamily: 'Poppins-Regular',
    borderRadius: 25,
    backgroundColor: '#F79C06',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default loginFormStyles;
