import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'
import { MealPlanProvider } from './context/MealPlanContext'
import { ErrorBoundary } from './components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <MealPlanProvider>
        <>
          <Toaster richColors position="top-right" />
          <App />
        </>
      </MealPlanProvider>
    </ErrorBoundary>
  </StrictMode>,
)
