import { useEffect, useState } from 'react';
import type { Recipe } from '../types/recipe';
import { fetchRecipeById } from '../utils/api';

interface UseRecipeDetailsResult {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
}

export function useRecipeDetails(id: string | null): UseRecipeDetailsResult {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setRecipe(null);
      return;
    }

    let cancelled = false;

    async function load(recipeId: string) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchRecipeById(recipeId);
        if (!cancelled) {
          setRecipe(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load recipe');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load(id);

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { recipe, isLoading, error };
}
