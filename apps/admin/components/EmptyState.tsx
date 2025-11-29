import React from 'react'

interface EmptyStateProps {
  icon: string
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-12 text-center">
      <span className="text-6xl mb-4 block">{icon}</span>
      <p className="text-xl font-semibold mb-2">{title}</p>
      {description && <p className="text-gray-400 mb-4">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
