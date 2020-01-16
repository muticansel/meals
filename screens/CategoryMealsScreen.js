import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import CustomText from '../components/CustomText';

const CategoryMealScreen = props => {
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector(state => state.meals.filteredMeals)
  const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0)

  if(displayedMeals.length === 0) {
    return (
      <View style={styles.noFav}>
        <CustomText>No favorite meals. Start adding some!</CustomText>
      </View>
    )
  }

  return (
    <MealList listData={displayedMeals}
      navigation={props.navigation} />
  );
};

CategoryMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  }
}

const styles = StyleSheet.create({
  noFav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CategoryMealScreen;
