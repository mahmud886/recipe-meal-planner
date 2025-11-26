import { useEffect, useState } from 'react'
import type { Recipe } from '../types/recipe'
import { fetchCategories, searchRecipes, type CategoryOption } from '../utils/api'

interface UseRecipesResult {
  recipes: Recipe[]
  categories: CategoryOption[]
  isLoading: boolean
  error: string | null
}

export function useRecipes(searchQuery: string, category: string): UseRecipesResult {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      try {
        const data = await fetchCategories()
        if (!cancelled) {
          setCategories(data)
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err)
        }
      }
    }

    loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await searchRecipes(searchQuery, category || undefined)
        if (!cancelled) {
          setRecipes(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load recipes')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [searchQuery, category])

  return { recipes, categories, isLoading, error }
}
