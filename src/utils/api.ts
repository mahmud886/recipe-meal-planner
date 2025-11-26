import type { Ingredient, Recipe } from '../types/recipe'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

interface MealApi {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  [key: string]: string | null
}

interface SearchResponse {
  meals: MealApi[] | null
}

interface CategoriesResponse {
  categories: { idCategory: string; strCategory: string }[]
}

interface FilterResponse {
  meals: { idMeal: string; strMeal: string; strMealThumb: string }[] | null
}

export interface CategoryOption {
  id: string
  name: string
}

export async function fetchCategories(): Promise<CategoryOption[]> {
  const res = await fetch(`${BASE_URL}/categories.php`)
  if (!res.ok) throw new Error('Failed to load categories')
  const data: CategoriesResponse = await res.json()
  return data.categories.map((c) => ({ id: c.idCategory, name: c.strCategory }))
}

function mapMealToRecipe(meal: MealApi): Recipe {
  const ingredients: Ingredient[] = []
  for (let i = 1; i <= 20; i += 1) {
    const name = meal[`strIngredient${i}`] as string | null
    const measure = meal[`strMeasure${i}`] as string | null
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: (measure ?? '').trim() })
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    ingredients,
  }
}

export async function searchRecipes(query: string, category?: string): Promise<Recipe[]> {
  let recipes: Recipe[] = []

  if (query.trim()) {
    const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query.trim())}`)
    if (!res.ok) throw new Error('Failed to search recipes')
    const data: SearchResponse = await res.json()
    recipes = (data.meals ?? []).map(mapMealToRecipe)
  } else if (category) {
    const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)
    if (!res.ok) throw new Error('Failed to filter recipes')
    const data: FilterResponse = await res.json()
    const filteredMeals = data.meals ?? []

    if (filteredMeals.length === 0) return []

    const detailResponses = await Promise.all(
      filteredMeals.map((m) => fetch(`${BASE_URL}/lookup.php?i=${m.idMeal}`)),
    )
    const allOk = detailResponses.every((r) => r.ok)
    if (!allOk) throw new Error('Failed to load recipes for category')

    const detailsJson = await Promise.all(detailResponses.map((r) => r.json() as Promise<SearchResponse>))
    recipes = detailsJson.flatMap((d) => (d.meals ?? []).map(mapMealToRecipe))
  }

  if (category) {
    recipes = recipes.filter((r) => r.category === category)
  }

  return recipes
}

export async function fetchRecipeById(id: string): Promise<Recipe | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  if (!res.ok) throw new Error('Failed to load recipe details')
  const data: SearchResponse = await res.json()
  const meal = data.meals?.[0]
  return meal ? mapMealToRecipe(meal) : null
}
