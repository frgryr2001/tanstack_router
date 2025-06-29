import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '@/components/Header'

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: () => <div>Something went wrong</div>,
})
function RootComponent() {
  return (
    <>
      <Header />
      <hr />
      <div className="p-2">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  )
}
