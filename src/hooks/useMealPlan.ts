import { useMemo } from 'react';
import { useMealPlanContext } from '../context/MealPlanContext';
import type { DayOfWeek, Recipe } from '../types/recipe';
import { fetchRecipeById } from '../utils/api';

export function useMealPlan() {
  const { mealPlan, shoppingListCompleted, dispatch } = useMealPlanContext();

  const addRecipeToDay = (day: DayOfWeek, recipe: Recipe) => dispatch({ type: 'ADD_RECIPE', day, recipe });

  const removeRecipeFromDay = (day: DayOfWeek) => dispatch({ type: 'REMOVE_RECIPE', day });

  const toggleShoppingItem = (ingredientKey: string) => dispatch({ type: 'TOGGLE_ITEM', ingredientKey });

  const clearCompletedItems = () => dispatch({ type: 'CLEAR_COMPLETED' });

  const plannedRecipeIds = useMemo(
    () =>
      Object.values(mealPlan)
        .filter((r): r is Recipe => r != null)
        .map((r) => r.id),
    [mealPlan]
  );

  const generateShoppingList = async () => {
    if (plannedRecipeIds.length === 0) return [];

    const detailResponses = await Promise.all(plannedRecipeIds.map((id) => fetchRecipeById(id)));
    const allIngredients = detailResponses
      .filter((r): r is Recipe => r != null)
      .flatMap((recipe) =>
        recipe.ingredients.map((ing) => ({
          key: `${ing.name.toLowerCase()}-${ing.measure.toLowerCase()}`,
          name: ing.name,
          measure: ing.measure,
        }))
      );

    const seen = new Map<string, { key: string; name: string; measure: string }>();
    allIngredients.forEach((item) => {
      if (!seen.has(item.key)) {
        seen.set(item.key, item);
      }
    });

    return Array.from(seen.values());
  };

  return {
    mealPlan,
    shoppingListCompleted,
    addRecipeToDay,
    removeRecipeFromDay,
    toggleShoppingItem,
    clearCompletedItems,
    generateShoppingList,
  };
}
