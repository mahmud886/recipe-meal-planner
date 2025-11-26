export interface Ingredient {
  name: string
  measure: string
}

export interface Recipe {
  id: string
  name: string
  category: string
  area: string
  instructions: string
  thumbnail: string
  ingredients: Ingredient[]
}

export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

export type MealPlan = Record<DayOfWeek, Recipe | null>
