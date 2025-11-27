import { useState } from 'react';
import { toast } from 'sonner';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailsModal } from './components/RecipeDetailsModal';
import { SearchBar } from './components/SearchBar';
import { ShoppingListPanel } from './components/ShoppingListPanel';
import { WeeklyMealPlanner } from './components/WeeklyMealPlanner';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { useMealPlan } from './hooks/useMealPlan';
import { useRecipeDetails } from './hooks/useRecipeDetails';
import { useRecipes } from './hooks/useRecipes';
import type { DayOfWeek } from './types/recipe';

interface ShoppingItem {
  key: string;
  name: string;
  measure: string;
}

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [isShoppingGenerating, setIsShoppingGenerating] = useState(false);
  const [shoppingError, setShoppingError] = useState<string | null>(null);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);

  const searchQuery = useDebouncedValue(searchInput, 400);

  const { recipes, categories, isLoading, error } = useRecipes(searchQuery, category);
  const { recipe: selectedRecipe, isLoading: isDetailsLoading } = useRecipeDetails(selectedRecipeId);
  const {
    mealPlan,
    shoppingListCompleted,
    addRecipeToDay,
    removeRecipeFromDay,
    toggleShoppingItem,
    clearCompletedItems,
    generateShoppingList,
  } = useMealPlan();

  const handleAddToDay = (day: DayOfWeek, recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return;
    addRecipeToDay(day, recipe);
    toast.success(`Planned "${recipe.name}" on ${day}`);
  };

  const handleRemoveFromDay = (day: DayOfWeek) => {
    const recipe = mealPlan[day];
    removeRecipeFromDay(day);
    if (recipe) {
      toast(`Removed "${recipe.name}" from ${day}`, {
        description: 'You can always add it back from the recipes list.',
      });
    }
  };

  const handleToggleShoppingItem = (key: string) => {
    const wasCompleted = shoppingListCompleted[key] ?? false;
    toggleShoppingItem(key);
    if (!wasCompleted) {
      const item = shoppingItems.find((i) => i.key === key);
      toast.success(item ? `Marked "${item.name}" as purchased` : 'Marked item as purchased');
    }
  };

  const handleGenerateShoppingList = async () => {
    setIsShoppingGenerating(true);
    setShoppingError(null);
    try {
      const items = await generateShoppingList();
      setShoppingItems(items);
      if (items.length > 0) {
        toast.success('Shopping list updated from your planned meals');
      } else {
        toast('No ingredients found', {
          description: 'Add recipes to your weekly plan before generating a shopping list.',
        });
      }
    } catch (err) {
      setShoppingError(err instanceof Error ? err.message : 'Failed to generate shopping list');
      toast.error('Failed to generate shopping list');
    } finally {
      setIsShoppingGenerating(false);
    }
  };

  return (
    <div className='min-h-screen bg-transparent text-[#16341f]'>
      <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:py-10'>
        <header className='flex flex-col gap-3 rounded-2xl border border-[#CAE8BD] bg-white/70 px-4 py-4 shadow-sm shadow-[#ECFAE5] md:flex-row md:items-end md:justify-between md:px-6'>
          <div>
            <h1 className='text-xl font-semibold text-[#16341f] md:text-2xl'>Recipe Meal Planner</h1>
            <p className='mt-1 max-w-xl text-xs text-[#4f7053] md:text-sm'>
              Search recipes, plan your meals for the week, and generate a smart shopping list powered by TheMealDB.
            </p>
          </div>
          <div className='rounded-xl bg-[#ECFAE5] px-3 py-2 text-[11px] text-[#4f7053]'>
            <p className='font-medium text-[#315036]'>This week overview</p>
            <p>Plan 7 days • Auto-generated shopping list</p>
          </div>
        </header>

        <main className='grid gap-5 lg:grid-cols-[minmax(0,2fr),minmax(0,1.25fr)]'>
          <section className='space-y-4'>
            <SearchBar
              searchQuery={searchInput}
              onSearchChange={setSearchInput}
              category={category}
              onCategoryChange={setCategory}
              categories={categories}
            />

            {error && <p className='text-xs text-red-600'>{error}</p>}

            <div className='flex items-center justify-between'>
              <h2 className='text-sm font-semibold text-[#16341f]'>Recipes</h2>
              {!isLoading && recipes.length > 0 && (
                <p className='text-[11px] text-[#4f7053]'>
                  Showing {recipes.length} recipe{recipes.length === 1 ? '' : 's'}
                </p>
              )}
            </div>

            {isLoading ? (
              <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className='flex flex-col overflow-hidden rounded-xl border border-[#CAE8BD] bg-white/70 p-3 shadow-sm shadow-[#ECFAE5]'>
                    <div className='h-32 w-full animate-pulse rounded-lg bg-[#DDF6D2]' />
                    <div className='mt-3 space-y-2'>
                      <div className='h-3 w-3/4 animate-pulse rounded bg-[#CAE8BD]' />
                      <div className='h-3 w-1/2 animate-pulse rounded bg-[#CAE8BD]' />
                      <div className='h-8 w-full animate-pulse rounded bg-[#B0DB9C]' />
                    </div>
                  </div>
                ))}
              </div>
            ) : recipes.length === 0 ? (
              <div className='rounded-xl border border-dashed border-[#CAE8BD] bg-white/70 px-4 py-6 text-xs text-[#4f7053]'>
                <p className='font-medium text-[#315036]'>No recipes to show yet.</p>
                <p className='mt-1'>
                  Try searching for something like <span className='font-semibold'>“chicken”</span> or pick a category
                  such as <span className='font-semibold'>“Seafood”</span>.
                </p>
              </div>
            ) : (
              <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onOpenDetails={() => setSelectedRecipeId(recipe.id)}
                    onAddToDay={(day) => handleAddToDay(day, recipe.id)}
                  />
                ))}
              </div>
            )}
          </section>

          <section className='space-y-4'>
            <WeeklyMealPlanner
              mealPlan={mealPlan}
              onRemove={handleRemoveFromDay}
              onOpenDetails={(day) => {
                const recipe = mealPlan[day];
                if (recipe) setSelectedRecipeId(recipe.id);
              }}
            />
            <ShoppingListPanel
              items={shoppingItems}
              isGenerating={isShoppingGenerating}
              error={shoppingError}
              onGenerate={handleGenerateShoppingList}
              completedMap={shoppingListCompleted}
              onToggle={handleToggleShoppingItem}
              onClearCompleted={clearCompletedItems}
            />
          </section>
        </main>

        <RecipeDetailsModal
          recipe={selectedRecipe}
          isOpen={selectedRecipeId != null}
          isLoading={isDetailsLoading}
          onClose={() => setSelectedRecipeId(null)}
        />
      </div>
    </div>
  );
}

export default App;
