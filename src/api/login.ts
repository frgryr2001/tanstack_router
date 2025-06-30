import invariant from 'tiny-invariant'

// Hardcoded credentials
const VALID_EMAIL = 'admin@example.com'
const VALID_PASSWORD = 'password123'

// Fake access token
const FAKE_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.fake-signature'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: {
    id: string
    email: string
    name: string
  }
}

// Fake login API
export const loginApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    console.log('🔐 Login API called with:', credentials.email)

    // Validate input
    invariant(credentials.email, 'Email is required')
    invariant(credentials.password, 'Password is required')

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check hardcoded credentials
    if (
      credentials.email === VALID_EMAIL &&
      credentials.password === VALID_PASSWORD
    ) {
      console.log('✅ Login successful')

      return {
        accessToken: FAKE_ACCESS_TOKEN,
        user: {
          id: '1',
          email: VALID_EMAIL,
          name: 'Admin User',
        },
      }
    } else {
      console.log('❌ Login failed - invalid credentials')
      throw new Error('Invalid email or password')
    }
  },
}

// localStorage services
export const authStorage = {
  // Set access token in localStorage
  setAccessToken: (token: string): void => {
    invariant(token, 'Token is required')
    localStorage.setItem('accessToken', token)
    console.log('💾 Access token saved to localStorage')
  },

  // Get access token from localStorage
  getAccessToken: (): string | null => {
    const token = localStorage.getItem('accessToken')
    console.log(
      '📖 Access token retrieved from localStorage:',
      token ? 'Found' : 'Not found',
    )
    return token
  },

  // Remove access token from localStorage
  removeAccessToken: (): void => {
    localStorage.removeItem('accessToken')
    console.log('🗑️ Access token removed from localStorage')
  },
}

export default { loginApi, authStorage }
