import type { DayOfWeek, MealPlan, Recipe } from '../types/recipe'

export interface MealPlanState {
  mealPlan: MealPlan
  shoppingListCompleted: Record<string, boolean>
}

export type MealPlanAction =
  | { type: 'ADD_RECIPE'; day: DayOfWeek; recipe: Recipe }
  | { type: 'REMOVE_RECIPE'; day: DayOfWeek }
  | { type: 'TOGGLE_ITEM'; ingredientKey: string }
  | { type: 'CLEAR_COMPLETED' }

export const defaultMealPlan: MealPlan = {
  Mon: null,
  Tue: null,
  Wed: null,
  Thu: null,
  Fri: null,
  Sat: null,
  Sun: null,
}

export const initialMealPlanState: MealPlanState = {
  mealPlan: defaultMealPlan,
  shoppingListCompleted: {},
}

export function mealPlanReducer(state: MealPlanState, action: MealPlanAction): MealPlanState {
  switch (action.type) {
    case 'ADD_RECIPE': {
      return {
        ...state,
        mealPlan: {
          ...state.mealPlan,
          [action.day]: action.recipe,
        },
      }
    }
    case 'REMOVE_RECIPE': {
      return {
        ...state,
        mealPlan: {
          ...state.mealPlan,
          [action.day]: null,
        },
      }
    }
    case 'TOGGLE_ITEM': {
      const current = state.shoppingListCompleted[action.ingredientKey] ?? false
      return {
        ...state,
        shoppingListCompleted: {
          ...state.shoppingListCompleted,
          [action.ingredientKey]: !current,
        },
      }
    }
    case 'CLEAR_COMPLETED': {
      const next: Record<string, boolean> = {}
      Object.entries(state.shoppingListCompleted).forEach(([key, completed]) => {
        if (!completed) next[key] = completed
      })
      return {
        ...state,
        shoppingListCompleted: next,
      }
    }
    default:
      return state
  }
}
