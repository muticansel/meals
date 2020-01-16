import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAV, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
}

const mealsReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_FAV:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if(existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeals: updatedFavMeals }
            } 
            else {
                const newFav = state.meals.find(meal => meal.id === action.mealId)
                return { ...state, favoriteMeals: state.favoriteMeals.concat(newFav) }
            }
        case SET_FILTERS:
            const filters = action.filterSettings;
            filteredMeals = state.meals.filter(meal => {
                if(filters.glutenFree && !meal.isGlutenFree){
                    return false
                }
                if(filters.lactoseFree && !meal.isLactoseFree){
                    return false
                }
                if(filters.vegan && meal.isVegan){
                    return false
                }
                if(filters.vegetarian && meal.isVegetarien){
                    return false
                }

                return true;
            })
            return { ...state, filteredMeals: filteredMeals}
        default:
            return state;
    }
}

export default mealsReducer;