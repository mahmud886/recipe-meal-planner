import type { DayOfWeek, Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onOpenDetails: () => void;
  onAddToDay: (day: DayOfWeek) => void;
}

const DAYS: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function RecipeCard({ recipe, onOpenDetails, onAddToDay }: RecipeCardProps) {
  return (
    <article className='flex flex-col overflow-hidden rounded-xl border border-[#CAE8BD] bg-white/80 shadow-sm shadow-[#ECFAE5] transition hover:-translate-y-1 hover:border-[#B0DB9C] hover:shadow-lg hover:shadow-[#DDF6D2]'>
      <button type='button' onClick={onOpenDetails} className='group relative h-40 w-full overflow-hidden'>
        <img
          src={recipe.thumbnail}
          alt={recipe.name}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
        <div className='pointer-events-none absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs text-[#ECFAE5]'>
          <span className='rounded-full bg-black/45 px-2 py-0.5'>{recipe.category}</span>
          {recipe.area && <span className='rounded-full bg-black/45 px-2 py-0.5'>{recipe.area}</span>}
        </div>
      </button>
      <div className='flex flex-1 flex-col gap-3 p-3'>
        <h3 className='line-clamp-2 text-sm font-semibold text-[#16341f]'>{recipe.name}</h3>
        <div className='mt-auto space-y-2'>
          <button
            type='button'
            onClick={onOpenDetails}
            className='w-full rounded-md bg-[#B0DB9C] px-3 py-1.5 text-xs font-medium text-[#16341f] transition hover:bg-[#CAE8BD]'>
            View recipe
          </button>
          <div className='flex items-center gap-2'>
            <label className='text-[11px] font-medium text-[#4f7053]' htmlFor={`${recipe.id}-day`}>
              Plan for day
            </label>
            <select
              id={`${recipe.id}-day`}
              className='flex-1 rounded-md border border-[#CAE8BD] bg-white px-2 py-1 text-xs text-[#16341f] focus:border-[#B0DB9C] focus:outline-none focus:ring-1 focus:ring-[#B0DB9C]'
              defaultValue=''
              onChange={(e) => {
                const value = e.target.value as DayOfWeek | '';
                if (!value) return;
                onAddToDay(value);
                e.target.value = '';
              }}>
              <option value=''>Select</option>
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </article>
  );
}
