import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#ECFAE5] px-4 text-center text-[#16341f]">
          <div className="max-w-md">
            <h1 className="mb-2 text-2xl font-semibold">Something went wrong</h1>
            <p className="mb-4 text-sm text-[#4f7053]">
              Please refresh the page or try again in a moment.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
