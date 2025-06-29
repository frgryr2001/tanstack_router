import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/meals')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-full bg-amber-300">
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-4">Meals</h1>
        <Outlet />
      </div>
    </div>
  )
}
