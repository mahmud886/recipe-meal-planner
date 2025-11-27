/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { initialMealPlanState, mealPlanReducer, type MealPlanState } from './mealPlanReducer';

interface MealPlanContextValue extends MealPlanState {
  dispatch: React.Dispatch<Parameters<typeof mealPlanReducer>[1]>;
}

const STORAGE_KEY = 'mealPlanState';

function getInitialState(): MealPlanState {
  if (typeof window === 'undefined') return initialMealPlanState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialMealPlanState;
    const parsed = JSON.parse(raw) as Partial<MealPlanState>;
    if (!parsed || typeof parsed !== 'object') return initialMealPlanState;
    return {
      mealPlan: parsed.mealPlan ?? initialMealPlanState.mealPlan,
      shoppingListCompleted: parsed.shoppingListCompleted ?? initialMealPlanState.shoppingListCompleted,
    };
  } catch {
    return initialMealPlanState;
  }
}

const MealPlanContext = createContext<MealPlanContextValue | undefined>(undefined);

export function MealPlanProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(mealPlanReducer, initialMealPlanState, getInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write errors
    }
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state]
  );

  return <MealPlanContext.Provider value={value}>{children}</MealPlanContext.Provider>;
}

export function useMealPlanContext(): MealPlanContextValue {
  const ctx = useContext(MealPlanContext);
  if (!ctx) {
    throw new Error('useMealPlanContext must be used within MealPlanProvider');
  }
  return ctx;
}
