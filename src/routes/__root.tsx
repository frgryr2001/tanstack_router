import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toast'
import { useOnline } from '@/features/todos/hooks/use-online'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  errorComponent: () => <div>Something went wrong</div>,
})
function RootComponent() {
  return (
    <div className="relative flex h-screen w-screen flex-col">
      <Header />
      <hr />
      <div className="p-2">
        <Outlet />
      </div>
      <Toaster />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
