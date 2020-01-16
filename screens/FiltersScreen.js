import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import FilterSwitch from '../components/FilterSwitchCmp';
import { setFilters } from '../store/actions/meals';

const FiltersScreen = props => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegeterian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    }

    dispatch(setFilters(appliedFilters))
  }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan])

  useEffect(() => {
    navigation.setParams({
      save: saveFilters
    })
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch
        label="Gluten-free"
        value={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)} />
      <FilterSwitch
        label="Lactose-free"
        value={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)} />
      <FilterSwitch
        label="Vegan"
        value={isVegan}
        onChange={newValue => setIsVegan(newValue)} />
      <FilterSwitch
        label="Vegetarian"
        value={isVegetarian}
        onChange={newValue => setIsVegeterian(newValue)} />
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer()
          }} />
      </HeaderButtons >
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam('save')} />
      </HeaderButtons >
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  }
});

export default FiltersScreen;
