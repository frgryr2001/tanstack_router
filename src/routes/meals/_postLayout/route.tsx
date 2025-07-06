import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/meals/_postLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-full bg-yellow-300 p-8">
      <h1>Pathless layoutasdasdasdasdasdasdasdasd</h1>
      <Outlet />
    </div>
  )
}
