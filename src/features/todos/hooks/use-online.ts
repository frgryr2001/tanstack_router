import { useSyncExternalStore } from 'react'

function getSnapshot() {
  return navigator.onLine
}

function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

export function useOnline() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return isOnline
}
