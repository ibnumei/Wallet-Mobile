import { StyleSheet } from 'react-native';

const favoritePayeeeStyles = StyleSheet.create({
  detailRectangle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
    shadowColor: '#d1d1d1',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    minWidth: 150,
    marginHorizontal: 3,
    marginVertical: 3
  },
  detailRectangleRow: {
    flexDirection: 'column'
  },
  detailRectangleRowHeader: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
    marginBottom: 2,
    color: '#393939'
  },
  detailRectangleRowDescription: {
    color: '#656565'
  },
  favoriteIcon: {
    width: 30,
    height: 30,
    marginVertical: 10
  },
  userImage: {
    width: 50,
    height: 50
  },
  cardFavorite: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default favoritePayeeeStyles;
