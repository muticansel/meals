import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';
import CustomText from '../components/CustomText';
import MealList from '../components/MealList';

const FavoritesScreen = props => {
  const availableMeals = useSelector(state => state.meals.favoriteMeals);

  if (!availableMeals || availableMeals.length === 0) {
    return (
      <View style={styles.noFav}>
        <CustomText>No favorite meals. Start adding some!</CustomText>
      </View>
    )
  }

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

const styles = StyleSheet.create({
  noFav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FavoritesScreen;
