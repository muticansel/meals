import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/colors';

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen,
    navigationOption: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
  },
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
  }
});

const tabScreenConfig  = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
        )
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
        )
      },
      tabBarColor: Colors.accentColor
    }
  }
};

const MealsFavsTabNavigator = Platform.OS === 'android' 
? createMaterialBottomTabNavigator(tabScreenConfig, {
  activeColor: 'white',
  shifting: true
}) 
: createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    activeTintColor: Colors.accentColor
  }
});

export default createAppContainer(MealsFavsTabNavigator);
