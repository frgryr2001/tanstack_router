# TanStack Router Cache Control Guide

## Overview

TanStack Router provides powerful cache control mechanisms to optimize data loading and improve user experience. Here are all the available options:

## Primary Cache Control Options

### 1. `staleTime`

Controls how long data is considered "fresh" before it becomes stale.

```tsx
// Examples:
staleTime: 0,                    // Always stale (always refetch)
staleTime: 1000 * 30,           // 30 seconds
staleTime: 1000 * 60 * 5,       // 5 minutes (recommended for user data)
staleTime: 1000 * 60 * 60,      // 1 hour (for semi-static data)
staleTime: Infinity,            // Never stale (until manually invalidated)
```

### 2. `gcTime` (Garbage Collection Time)

Controls how long inactive data stays in memory.

```tsx
// Examples:
gcTime: 0,                      // Remove from memory immediately
gcTime: 1000 * 60 * 5,          // 5 minutes
gcTime: 1000 * 60 * 10,         // 10 minutes (recommended default)
gcTime: Infinity,               // Keep in memory forever
```

## Cache Strategy Examples

### No Cache (Always Fresh Data)

```tsx
export const Route = createFileRoute('/fresh-data')({
  loader: async () => api.getData(),
  staleTime: 0, // Always refetch
  gcTime: 0, // Don't keep in memory
})
```

### Short-term Cache (Frequently Changing Data)

```tsx
export const Route = createFileRoute('/live-data')({
  loader: async () => api.getLiveData(),
  staleTime: 30000, // 30 seconds
  gcTime: 60000, // 1 minute
})
```

### Medium-term Cache (User Data)

```tsx
export const Route = createFileRoute('/users')({
  loader: async () => api.getUsers(),
  staleTime: 300000, // 5 minutes
  gcTime: 600000, // 10 minutes
})
```

### Long-term Cache (Configuration Data)

```tsx
export const Route = createFileRoute('/config')({
  loader: async () => api.getConfig(),
  staleTime: 3600000, // 1 hour
  gcTime: 7200000, // 2 hours
})
```

### Static Cache (Never Changes)

```tsx
export const Route = createFileRoute('/static')({
  loader: async () => api.getStaticData(),
  staleTime: Infinity, // Never becomes stale
  gcTime: Infinity, // Keep forever
})
```

## Manual Cache Control

### Using Router Methods

```tsx
import { useRouter } from '@tanstack/react-router'

function MyComponent() {
  const router = useRouter()

  // Invalidate all cached data
  const refreshAll = () => {
    router.invalidate()
  }

  // Invalidate specific route
  const refreshRoute = () => {
    router.invalidate({
      routeId: '/employees',
    })
  }

  // Preload route data
  const preloadData = () => {
    router.preloadRoute({ to: '/employees' })
  }

  return (
    <div>
      <button onClick={refreshAll}>Refresh All</button>
      <button onClick={refreshRoute}>Refresh Employees</button>
      <button onClick={preloadData}>Preload Employees</button>
    </div>
  )
}
```

## Best Practices

### 1. Choose Appropriate Cache Times

- **Real-time data**: `staleTime: 0` or very short (5-30 seconds)
- **User lists**: `staleTime: 5-10 minutes`
- **Configuration**: `staleTime: 1+ hours`
- **Static content**: `staleTime: Infinity`

### 2. Set gcTime Higher than staleTime

```tsx
// Good practice
staleTime: 1000 * 60 * 5,    // 5 minutes
gcTime: 1000 * 60 * 10,      // 10 minutes
```

### 3. Consider Memory Usage

- Use `gcTime: 0` for large datasets that aren't frequently accessed
- Use longer `gcTime` for data that users navigate between often

### 4. Development vs Production

```tsx
const isDev = process.env.NODE_ENV === 'development'

export const Route = createFileRoute('/data')({
  loader: async () => api.getData(),
  staleTime: isDev ? 0 : 1000 * 60 * 5, // No cache in dev, 5min in prod
})
```

## Cache Behavior Flow

1. **First Visit**: Loader runs, data is cached
2. **Within staleTime**: No loader call, cached data is used
3. **After staleTime**: Loader runs in background, stale data shown until fresh data arrives
4. **After gcTime**: Data is removed from memory when route is inactive

## Common Patterns

### Conditional Caching

```tsx
export const Route = createFileRoute('/conditional')({
  loader: async ({ params }) => {
    return api.getData(params.id)
  },
  staleTime: ({ params }) => {
    // Cache user profiles longer than temporary data
    return params.type === 'profile' ? 600000 : 30000
  },
})
```

### Background Refresh

```tsx
export const Route = createFileRoute('/background-refresh')({
  loader: async () => api.getData(),
  staleTime: 1000 * 60 * 5, // 5 minutes
  // Data becomes stale after 5 minutes but shows cached version
  // while fetching fresh data in background
})
```

This cache control system gives you fine-grained control over when and how your data is fetched and stored!
