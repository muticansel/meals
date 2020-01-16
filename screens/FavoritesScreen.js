import React from 'react';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';

const FavoritesScreen = props => {
  const availableMeals = useSelector(state => state.meals.favoriteMeals);
  
  return (
    <MealList listData={availableMeals} navigation={props.navigation} />
  );
};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Favorite Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer()
          }} />
      </HeaderButtons >
    )
  }
}

export default FavoritesScreen;
