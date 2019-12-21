import React, { Component } from 'react';
import { FlatList } from 'react-native';
import FavoritePayee from './FavoritePayee';

class FavoritePayeeList extends Component {
  render() {
    const { favoritePayees, onFavorite } = this.props;
    return (
      <FlatList
        testID="transactionItem"
        data={favoritePayees}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return <FavoritePayee payee={item.user} onFavorite={onFavorite} />;
        }}
      />
    );
  }
}

export default FavoritePayeeList;
