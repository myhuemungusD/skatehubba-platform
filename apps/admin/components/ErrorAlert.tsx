import React from 'react'

interface ErrorAlertProps {
  error: string
  onRetry?: () => void
  title?: string
}

export function ErrorAlert({ 
  error, 
  onRetry, 
  title = 'Error' 
}: ErrorAlertProps) {
  return (
    <div className="bg-red-900/20 border border-red-600 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <p className="font-semibold text-red-400">{title}</p>
          <p className="text-sm text-red-300 mt-1">{error}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}
