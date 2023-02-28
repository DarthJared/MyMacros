type Food = {
    name: string
    servingSize: string
    calories: number
    carbs: number
    protein: number
}

type Meal = {
    name: string
    food: Food[]
}

type DaysMeals = {
    date: string
    meals: Meal[]
}