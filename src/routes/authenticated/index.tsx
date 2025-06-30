import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

import { CheckCircleIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { authStorage } from '@/api/login'

export const Route = createFileRoute('/authenticated/')({
  component: AuthenticatedComponent,
  beforeLoad: ({ location }) => {
    const storedToken = authStorage.getAccessToken()
    if (!storedToken) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})

function AuthenticatedComponent() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Remove token from localStorage
    authStorage.removeAccessToken()
    // Redirect to login
    navigate({ to: '/login' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center">
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">
              Welcome! You're Authenticated
            </CardTitle>
            <CardDescription>
              You have successfully logged in to the application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <UserIcon className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800">
                  User Information
                </h3>
              </div>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Name:</strong> Admin User
                </p>
                <p>
                  <strong>Email:</strong> admin@example.com
                </p>
                <p>
                  <strong>User ID:</strong> 1
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Next Steps</h3>
              <p className="text-sm text-yellow-700">
                Your authentication token is now stored in localStorage and will
                persist across browser sessions until you log out.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <LogOutIcon className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
