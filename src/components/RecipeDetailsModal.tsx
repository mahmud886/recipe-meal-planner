import { useEffect } from 'react';
import type { Recipe } from '../types/recipe';

interface RecipeDetailsModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
}

export function RecipeDetailsModal({ recipe, isOpen, isLoading, onClose }: RecipeDetailsModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4 py-6'
      onClick={onClose}
      role='dialog'
      aria-modal='true'>
      <div
        className='relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#CAE8BD] bg-white shadow-xl'
        onClick={(e) => e.stopPropagation()}>
        <button
          type='button'
          onClick={onClose}
          aria-label='Close recipe details'
          className='absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#315036] shadow-sm shadow-black/20 ring-1 ring-[#CAE8BD] transition hover:bg-[#ECFAE5] hover:text-[#16341f]'>
          <span className='sr-only'>Close</span>
          <span className='text-lg leading-none'>&times;</span>
        </button>
        {isLoading ? (
          <div className='flex flex-1 flex-col gap-4 px-4 py-4'>
            <div className='h-40 w-full animate-pulse rounded-xl bg-[#DDF6D2]' />
            <div className='grid flex-1 gap-4 md:grid-cols-[1.2fr,1.8fr]'>
              <div className='space-y-2'>
                <div className='h-3 w-28 animate-pulse rounded bg-[#B0DB9C]' />
                <div className='space-y-1'>
                  <div className='h-3 w-full animate-pulse rounded bg-[#B0DB9C]' />
                  <div className='h-3 w-5/6 animate-pulse rounded bg-[#B0DB9C]' />
                  <div className='h-3 w-4/6 animate-pulse rounded bg-[#B0DB9C]' />
                </div>
              </div>
              <div className='space-y-2'>
                <div className='h-3 w-32 animate-pulse rounded bg-[#B0DB9C]' />
                <div className='space-y-1'>
                  <div className='h-3 w-full animate-pulse rounded bg-[#B0DB9C]' />
                  <div className='h-3 w-full animate-pulse rounded bg-[#B0DB9C]' />
                  <div className='h-3 w-3/4 animate-pulse rounded bg-[#B0DB9C]' />
                </div>
              </div>
            </div>
          </div>
        ) : recipe ? (
          <>
            <div className='relative h-52 w-full overflow-hidden'>
              <img src={recipe.thumbnail} alt={recipe.name} className='h-full w-full object-cover' />
              <div className='absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent' />
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
          </>
        ) : (
          <div className='flex flex-1 items-center justify-center px-6 py-16'>
            <p className='text-sm text-slate-400'>Recipe not found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
