import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton';
import CustomText from '../components/CustomText';
import { toggleFav } from '../store/actions/meals'

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <CustomText>{props.children}</CustomText>
    </View>
  )
}

const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  const isFav = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();
  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFav(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavHandler })
  }, [toggleFavHandler])

  useEffect(() => {
    props.navigation.setParams({ isFav: isFav })
  }, [isFav])

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.detail}>
        <CustomText>{selectedMeal.duration}m</CustomText>
        <CustomText>{selectedMeal.complexity.toUpperCase()}</CustomText>
        <CustomText>{selectedMeal.affordability.toUpperCase()}</CustomText>
      </View>
      <Text style={styles.title}>Igredients</Text>
      {
        selectedMeal.ingredients.map(ing => (
          <ListItem key={ing}>{ing}</ListItem>
        ))
      }
      <Text style={styles.title}>Steps</Text>
      {
        selectedMeal.steps.map(step => (
          <ListItem key={step}>{step}</ListItem>
        ))
      }
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFav = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title="Favorite"
        iconName={isFav ? 'ios-star' : 'ios-star-outline'}
        onPress={toggleFavorite} />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  detail: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 22,
    fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;
