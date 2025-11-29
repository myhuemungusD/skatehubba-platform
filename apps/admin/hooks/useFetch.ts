import { useState, useEffect, useCallback, useRef } from 'react'

interface UseFetchOptions<TResponse, TData> {
  url: string
  transform: (response: TResponse) => TData
  initialData?: TData | null
  enabled?: boolean
}

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  retry: () => void
  refetch: () => void
}

export function useFetch<TResponse = any, TData = TResponse>({
  url,
  transform,
  initialData = null,
  enabled = true,
}: UseFetchOptions<TResponse, TData>): UseFetchResult<TData> {
  const [data, setData] = useState<TData | null>(initialData ?? null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const abortControllerRef = useRef<AbortController | null>(null)
  
  // Store transform in ref to avoid triggering effect on every render
  const transformRef = useRef(transform)
  transformRef.current = transform

  const fetchData = useCallback(async () => {
    if (!enabled) return

    // Cancel previous request if still in flight
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(url, { signal: abortController.signal })

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }

      const result = await response.json()
      const transformedData = transformRef.current(result)
      
      // Only update state if not aborted
      if (!abortController.signal.aborted) {
        setData(transformedData)
      }
    } catch (err) {
      // Ignore abort errors
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }

      console.error('Fetch error:', err)
      if (!abortController.signal.aborted) {
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while fetching data. Please try again.'
        )
      }
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false)
      }
    }
  }, [url, enabled])

  useEffect(() => {
    fetchData()

    // Cleanup: abort on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData, retryCount])

  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1)
  }, [])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, retry, refetch }
}
