import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold flex items-center gap-2">
          <Link
            to="/"
            activeProps={{
              className: 'text-blue-500 font-bold',
            }}
            activeOptions={{
              exact: true,
            }}
          >
            Home
          </Link>

          <Link
            to="/employees"
            activeProps={{
              className: 'text-blue-500 font-bold',
            }}
            activeOptions={{
              exact: true,
            }}
          >
            Employees
          </Link>
          <Link
            to="/meals"
            activeProps={{
              className: 'text-blue-500 font-bold',
            }}
            activeOptions={{
              exact: true,
            }}
          >
            Meals
          </Link>
        </div>
      </nav>
    </header>
  )
}
