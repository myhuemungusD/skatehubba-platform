# Error Handling Pattern - SkateHubba Admin

## Overview
This document describes the improved error handling UX pattern implemented across the SkateHubba admin panel. Instead of just flashing error messages, we now provide:

- ✅ Clear error messages with context
- ✅ Retry functionality
- ✅ Loading states
- ✅ Empty states
- ✅ Reusable components and hooks

## Components

### 1. ErrorAlert
Displays errors with optional retry button.

```tsx
import { ErrorAlert } from '@/components/ErrorAlert'

<ErrorAlert 
  error="Failed to load spots"
  title="Error loading spots"
  onRetry={handleRetry}
/>
```

### 2. LoadingSpinner
Shows loading state with optional message.

```tsx
import { LoadingSpinner } from '@/components/LoadingSpinner'

<LoadingSpinner message="Loading spots..." />
```

### 3. EmptyState
Displays empty state with icon and optional action.

```tsx
import { EmptyState } from '@/components/EmptyState'

<EmptyState 
  icon="📍"
  title="No spots found"
  description="Add your first skate spot to get started"
  action={{
    label: "Add Spot",
    onClick: handleAddSpot
  }}
/>
```

## Hooks

### useFetch Hook
Reusable data fetching with built-in error handling, retry, refetch, and AbortController cleanup.

**Key features:**
- ✅ Type-safe data transformation
- ✅ Automatic request cancellation on unmount
- ✅ No state updates on aborted requests
- ✅ Retry functionality with state cleanup

```tsx
import { useFetch } from '@/hooks/useFetch'
import { ErrorAlert } from '@/components/ErrorAlert'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { EmptyState } from '@/components/EmptyState'

function MyComponent() {
  // Transform backend response { spots: Spot[] } to Spot[]
  const { data: spots, loading, error, retry } = useFetch<{ spots: Spot[] }, Spot[]>({
    url: '/api/spots',
    transform: (response: { spots: Spot[] }) => response.spots || [],
    initialData: [],
    enabled: true
  })

  if (loading) return <LoadingSpinner message="Loading spots..." />
  if (error) return <ErrorAlert error={error} onRetry={retry} />
  if (!spots || spots.length === 0) {
    return <EmptyState icon="📍" title="No spots found" />
  }

  return <div>{/* Render spots data */}</div>
}
```

## Complete Example

See `apps/admin/app/page.tsx` - `SpotsContent()` for a full implementation:

```tsx
function SpotsContent() {
  const [spots, setSpots] = useState<Spot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const fetchSpots = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/spots')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch spots: ${response.statusText}`)
      }
      
      const data = await response.json()
      setSpots(data.spots || [])
    } catch (error) {
      console.error('Fetch error:', error) // Always log for debugging
      setError(error instanceof Error ? error.message : 'Failed to load spots. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSpots()
  }, [retryCount])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  // Render states
  if (error) return <ErrorAlert error={error} onRetry={handleRetry} />
  if (loading) return <LoadingSpinner />
  if (spots.length === 0) return <EmptyState icon="📍" title="No spots" />
  
  return <div>{/* Render data */}</div>
}
```

## Key Improvements

### Before ❌
```tsx
} catch (error) {
  console.error('Fetch error:', error); // Only logs
  // Error flashes but user can't do anything
}
```

### After ✅
```tsx
} catch (error) {
  console.error('Fetch error:', error); // Still logs for debugging
  setError(error instanceof Error ? error.message : 'Failed to load. Try again?')
  // Error persists with retry button
}
```

## Best Practices

1. **Always provide context**: Don't just say "Error" - explain what failed
2. **Enable retry**: Users should always be able to retry failed operations
3. **Log errors**: Keep `console.error()` for debugging while showing user-friendly messages
4. **Use loading states**: Never leave users wondering if something is loading
5. **Handle empty states**: Empty data should look intentional, not broken
6. **Type your errors**: Use TypeScript to ensure proper error handling

## Usage Across Apps

This pattern can be applied to:
- ✅ Admin Panel (`apps/admin`)
- 📱 Mobile App (`apps/mobile`) - Adapt for React Native
- 🌐 Web App (`apps/web`)
- 🏠 Landing Page (`apps/landing`)

For React Native, create similar components adapted to `react-native` primitives.
