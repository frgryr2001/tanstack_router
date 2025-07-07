import { useCallback, useState } from 'react'

export type ToastType = 'default' | 'success' | 'error' | 'warning'

export interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
}

interface ToastStore {
  toasts: Array<Toast>
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

const toastStore: ToastStore = {
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  clearToasts: () => {},
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<Toast>>([])

  const addToast = useCallback((toastData: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9)
    const newToast: Toast = { ...toastData, id }

    toastStore.toasts.push(newToast)
    setToasts([...toastStore.toasts])

    // Auto remove after duration
    const duration = toastData.duration || 5000
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }, [])

  const removeToast = useCallback((id: string) => {
    toastStore.toasts = toastStore.toasts.filter((toast) => toast.id !== id)
    setToasts([...toastStore.toasts])
  }, [])

  const clearToasts = useCallback(() => {
    toastStore.toasts = []
    setToasts([])
  }, [])

  // Update store methods
  toastStore.addToast = addToast
  toastStore.removeToast = removeToast
  toastStore.clearToasts = clearToasts

  return {
    toasts,
    toast: addToast,
    dismiss: removeToast,
    clear: clearToasts,
  }
}

// Global toast function
export const showToast = (toastData: Omit<Toast, 'id'>) => {
  toastStore.addToast(toastData)
}

// Convenience methods
showToast.success = (title: string, description?: string) => {
  showToast({ title, description, type: 'success' })
}

showToast.error = (title: string, description?: string) => {
  showToast({ title, description, type: 'error' })
}

showToast.warning = (title: string, description?: string) => {
  showToast({ title, description, type: 'warning' })
}
