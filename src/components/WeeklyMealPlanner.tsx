import type { DayOfWeek, MealPlan } from '../types/recipe'

interface WeeklyMealPlannerProps {
  mealPlan: MealPlan
  onRemove: (day: DayOfWeek) => void
  onOpenDetails: (day: DayOfWeek) => void
}

const DAYS: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function WeeklyMealPlanner({ mealPlan, onRemove, onOpenDetails }: WeeklyMealPlannerProps) {
  return (
    <section className="space-y-3 rounded-xl border border-[#CAE8BD] bg-white/80 p-3 shadow-sm shadow-[#ECFAE5]">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-[#16341f]">Weekly meal plan</h2>
          <p className="text-xs text-[#4f7053]">Plan meals for each day of the week.</p>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {DAYS.map((day) => {
          const recipe = mealPlan[day]
          return (
            <article
              key={day}
              className="flex items-start justify-between gap-3 rounded-lg border border-[#CAE8BD] bg-[#ECFAE5] px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#4f7053]">
                  {day}
                </p>
                {recipe ? (
                  <>
                    <button
                      type="button"
                      onClick={() => onOpenDetails(day)}
                      className="mt-0.5 line-clamp-2 text-xs font-medium text-[#16341f] hover:underline"
                    >
                      {recipe.name}
                    </button>
                    <p className="text-[11px] text-[#4f7053]">
                      {recipe.category} {recipe.area ? `• ${recipe.area}` : ''}
                    </p>
                  </>
                ) : (
                  <p className="mt-0.5 text-xs text-[#4f7053]">No recipe planned.</p>
                )}
              </div>
              {recipe && (
                <button
                  type="button"
                  onClick={() => onRemove(day)}
                  className="rounded-md border border-[#B0DB9C] bg-white px-2 py-1 text-[11px] text-[#315036] hover:border-red-400 hover:text-red-500"
                >
                  Remove
                </button>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
