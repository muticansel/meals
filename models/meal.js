class Meal {
    constructor(id, categoryIds, title, affordability,
        complexity, imageUrl, duration, ingredients, steps,
        isGlutenFree, isVegan, isVegetarien, isLactoseFree) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.affordability = affordability;
        this.complexity = complexity;
        this.imageUrl = imageUrl;
        this.duration = duration;
        this.ingredients = ingredients;
        this.step = steps;
        this.isGlutenFree = isGlutenFree;
        this.isVegan = isVegan;
        this.isVegetarien = isVegetarien;
        this.isLactoseFree = isLactoseFree;
    }
}

export default Meal;