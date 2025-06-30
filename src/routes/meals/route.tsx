import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/meals')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-full ">
      <Outlet />
    </div>
  )
}
