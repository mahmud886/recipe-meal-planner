type Ingredient = { name: string; measure: string };
type Recipe = {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  ingredients: Ingredient[];
};

type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

type MealPlan = Record<DayOfWeek, Recipe | null>;

const MOCK_RECIPE: Recipe = {
  id: '1',
  name: 'Grilled Lemon Herb Chicken',
  category: 'Chicken',
  area: 'American',
  instructions:
    'Season chicken with salt, pepper, and herbs. Grill over medium heat for 6–8 minutes per side until cooked through. Rest for 5 minutes before slicing.',
  thumbnail: 'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
  ingredients: [
    { name: 'Chicken Breast', measure: '2 pcs' },
    { name: 'Olive Oil', measure: '2 tbsp' },
    { name: 'Lemon', measure: '1 pc' },
    { name: 'Mixed Herbs', measure: '1 tsp' },
  ],
};

const MOCK_RECIPES: Recipe[] = [
  MOCK_RECIPE,
  {
    ...MOCK_RECIPE,
    id: '2',
    name: 'Creamy Pesto Pasta',
    category: 'Pasta',
    area: 'Italian',
  },
  {
    ...MOCK_RECIPE,
    id: '3',
    name: 'Veggie Power Bowl',
    category: 'Vegetarian',
    area: 'Fusion',
  },
];

const MOCK_MEAL_PLAN: MealPlan = {
  Mon: MOCK_RECIPE,
  Tue: MOCK_RECIPES[1],
  Wed: null,
  Thu: MOCK_RECIPES[2],
  Fri: null,
  Sat: null,
  Sun: null,
};

const MOCK_SHOPPING_ITEMS = [
  { key: 'chicken-2pcs', name: 'Chicken Breast', measure: '2 pcs', completed: true },
  { key: 'lemon-1pc', name: 'Lemon', measure: '1 pc', completed: false },
  { key: 'pasta-250g', name: 'Pasta', measure: '250 g', completed: false },
];

const MOCK_CATEGORIES = [
  { id: '1', name: 'Chicken' },
  { id: '2', name: 'Pasta' },
  { id: '3', name: 'Vegetarian' },
];

const DAYS: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function StaticMealPlannerPage() {
  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,#ECFAE5_0,#DDF6D2_40%,#ffffff_100%)] text-[#16341f]'>
      <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10'>
        {/* Header */}
        <header className='flex flex-col gap-3 rounded-2xl border border-[#CAE8BD] bg-white/70 px-4 py-4 shadow-sm shadow-[#ECFAE5] md:flex-row md:items-end md:justify-between md:px-6'>
          <div>
            <h1 className='text-xl font-semibold text-[#16341f] md:text-2xl'>Recipe Meal Planner</h1>
            <p className='mt-1 max-w-xl text-xs text-[#4f7053] md:text-sm'>
              Search recipes, plan your meals for the week, and generate a shopping list.
            </p>
          </div>
          <div className='rounded-xl bg-[#ECFAE5] px-3 py-2 text-[11px] text-[#4f7053]'>
            <p className='font-medium text-[#315036]'>This week overview</p>
            <p>7 days • Auto-generated shopping list</p>
          </div>
        </header>

        <main className='grid gap-5 lg:grid-cols-[minmax(0,2fr),minmax(0,1.25fr)]'>
          {/* Left: Search + Recipes */}
          <section className='space-y-4'>
            {/* Static Search Bar */}
            <div className='grid gap-3 md:grid-cols-[2fr,1fr]'>
              <div>
                <label className='mb-1 block text-xs font-medium text-[#4f7053]' htmlFor='search'>
                  Search recipes
                </label>
                <input
                  id='search'
                  type='text'
                  value='chicken'
                  readOnly
                  className='w-full rounded-md border border-[#CAE8BD] bg-white px-3 py-2 text-sm text-[#16341f] placeholder:text-[#7a997c] focus:border-[#B0DB9C] focus:outline-none focus:ring-1 focus:ring-[#B0DB9C]'
                  placeholder='e.g. chicken, pasta, curry'
                />
              </div>
              <div>
                <label className='mb-1 block text-xs font-medium text-[#4f7053]' htmlFor='category'>
                  Filter by category
                </label>
                <select
                  id='category'
                  value='Chicken'
                  readOnly
                  className='w-full rounded-md border border-[#CAE8BD] bg-white px-3 py-2 text-sm text-[#16341f] focus:border-[#B0DB9C] focus:outline-none focus:ring-1 focus:ring-[#B0DB9C]'>
                  <option value=''>All categories</option>
                  {MOCK_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <h2 className='text-sm font-semibold text-[#16341f]'>Recipes</h2>
              <p className='text-[11px] text-[#4f7053]'>Showing {MOCK_RECIPES.length} recipes</p>
            </div>

            <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
              {MOCK_RECIPES.map((recipe) => (
                <StaticRecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>

          {/* Right: Weekly Planner + Shopping */}
          <section className='space-y-4'>
            <StaticWeeklyMealPlanner mealPlan={MOCK_MEAL_PLAN} />
            <StaticShoppingListPanel items={MOCK_SHOPPING_ITEMS} />
          </section>
        </main>

        {/* Modal preview (always open in static view) */}
        <StaticRecipeDetailsModal recipe={MOCK_RECIPE} />
      </div>
    </div>
  );
}

/* ---------- Static Subcomponents (design only) ---------- */

function StaticRecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className='flex flex-col overflow-hidden rounded-xl border border-[#CAE8BD] bg-white/80 shadow-sm shadow-[#ECFAE5] transition hover:-translate-y-1 hover:border-[#B0DB9C] hover:shadow-lg hover:shadow-[#DDF6D2]'>
      <div className='group relative h-40 w-full overflow-hidden'>
        <img
          src={recipe.thumbnail}
          alt={recipe.name}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
        <div className='pointer-events-none absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs text-[#ECFAE5]'>
          <span className='rounded-full bg-black/50 px-2 py-0.5'>{recipe.category}</span>
          {recipe.area && <span className='rounded-full bg-black/50 px-2 py-0.5'>{recipe.area}</span>}
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-3 p-3'>
        <h3 className='line-clamp-2 text-sm font-semibold text-[#16341f]'>{recipe.name}</h3>
        <div className='mt-auto space-y-2'>
          <button
            type='button'
            className='w-full cursor-default rounded-md bg-[#B0DB9C] px-3 py-1.5 text-xs font-medium text-[#16341f]'>
            View recipe
          </button>
          <div className='flex items-center gap-2'>
            <span className='text-[11px] font-medium text-[#4f7053]'>Plan for day</span>
            <div className='flex-1 rounded-md border border-[#CAE8BD] bg-white px-2 py-1 text-xs text-[#7a997c]'>
              Select…
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function StaticWeeklyMealPlanner({ mealPlan }: { mealPlan: MealPlan }) {
  return (
    <section className='space-y-3 rounded-xl border border-[#CAE8BD] bg-white/80 p-3 shadow-sm shadow-[#ECFAE5]'>
      <div className='flex items-center justify-between gap-2'>
        <div>
          <h2 className='text-sm font-semibold text-[#16341f]'>Weekly meal plan</h2>
          <p className='text-xs text-[#4f7053]'>Plan meals for each day of the week.</p>
        </div>
      </div>
      <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-1'>
        {DAYS.map((day) => {
          const recipe = mealPlan[day];
          return (
            <article
              key={day}
              className='flex items-start justify-between gap-3 rounded-lg border border-[#CAE8BD] bg-[#ECFAE5] px-3 py-2'>
              <div className='min-w-0 flex-1'>
                <p className='text-[11px] font-semibold uppercase tracking-wide text-[#4f7053]'>{day}</p>
                {recipe ? (
                  <>
                    <p className='mt-0.5 line-clamp-2 text-xs font-medium text-[#16341f]'>{recipe.name}</p>
                    <p className='text-[11px] text-[#4f7053]'>
                      {recipe.category} {recipe.area ? `• ${recipe.area}` : ''}
                    </p>
                  </>
                ) : (
                  <p className='mt-0.5 text-xs text-[#4f7053]'>No recipe planned.</p>
                )}
              </div>
              {recipe && (
                <button
                  type='button'
                  className='cursor-default rounded-md border border-[#B0DB9C] bg-white px-2 py-1 text-[11px] text-[#315036]'>
                  Remove
                </button>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function StaticShoppingListPanel({
  items,
}: {
  items: { key: string; name: string; measure: string; completed: boolean }[];
}) {
  const hasCompleted = items.some((i) => i.completed);

  return (
    <section className='space-y-3 rounded-xl border border-[#CAE8BD] bg-white/80 p-3 shadow-sm shadow-[#ECFAE5]'>
      <div className='flex items-center justify-between gap-2'>
        <div>
          <h2 className='text-sm font-semibold text-[#16341f]'>Shopping list</h2>
          <p className='text-xs text-[#4f7053]'>Generated from your planned meals.</p>
        </div>
        <button
          type='button'
          className='cursor-default rounded-md bg-[#B0DB9C] px-3 py-1.5 text-xs font-medium text-[#16341f]'>
          Generate
        </button>
      </div>

      {items.length === 0 ? (
        <p className='text-xs text-[#4f7053]'>No items yet. Plan some meals and generate the shopping list.</p>
      ) : (
        <>
          <ul className='max-h-52 space-y-1 overflow-y-auto text-xs'>
            {items.map((item) => (
              <li
                key={item.key}
                className='flex items-center justify-between gap-2 rounded border border-[#CAE8BD] bg-[#ECFAE5] px-2 py-1'>
                <label className='flex flex-1 cursor-default items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={item.completed}
                    readOnly
                    className='h-3 w-3 rounded border-[#B0DB9C] bg-white text-[#4f7053]'
                  />
                  <span className={`flex-1 ${item.completed ? 'text-[#7a997c] line-through' : 'text-[#16341f]'}`}>
                    {item.name}
                  </span>
                </label>
                <span className='text-[11px] text-[#4f7053]'>{item.measure}</span>
              </li>
            ))}
          </ul>
          <div className='flex justify-end'>
            <button
              type='button'
              className={`text-[11px] ${hasCompleted ? 'text-[#4f7053]' : 'text-[#B0DB9C]'} cursor-default`}>
              Clear completed
            </button>
          </div>
        </>
      )}
    </section>
  );
}

function StaticRecipeDetailsModal({ recipe }: { recipe: Recipe }) {
  return (
    <div className='fixed inset-x-0 bottom-4 z-30 flex justify-center px-4'>
      <div className='relative flex max-h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#CAE8BD] bg-white shadow-xl'>
        <div className='relative h-40 w-full overflow-hidden'>
          <img src={recipe.thumbnail} alt={recipe.name} className='h-full w-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent' />
          <div className='absolute bottom-3 left-4 right-4'>
            <h2 className='text-lg font-semibold text-[#ECFAE5]'>{recipe.name}</h2>
            <p className='mt-1 text-xs text-[#ECFAE5]'>
              {recipe.category} {recipe.area ? `• ${recipe.area}` : ''}
            </p>
          </div>
        </div>
        <div className='grid flex-1 gap-4 overflow-y-auto px-4 py-4 md:grid-cols-[1.2fr,1.8fr]'>
          <section className='space-y-2 border-b border-[#CAE8BD] pb-3 md:border-b-0 md:border-r md:pb-0 md:pr-4'>
            <h3 className='text-xs font-semibold uppercase tracking-wide text-[#4f7053]'>Ingredients</h3>
            <ul className='space-y-1 text-xs text-[#16341f]'>
              {recipe.ingredients.map((ing) => (
                <li key={`${ing.name}-${ing.measure}`} className='flex justify-between gap-2'>
                  <span>{ing.name}</span>
                  <span className='text-[#4f7053]'>{ing.measure}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className='space-y-2'>
            <h3 className='text-xs font-semibold uppercase tracking-wide text-[#4f7053]'>Instructions</h3>
            <p className='whitespace-pre-wrap text-xs leading-relaxed text-[#16341f]'>{recipe.instructions}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
