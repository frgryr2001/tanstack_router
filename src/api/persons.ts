import { faker } from '@faker-js/faker'
import { cache } from 'react'

export interface Person {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  jobTitle: string
  department: string
  birthDate: Date
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  salary: number
  hireDate: Date
}

// Generate a single fake person
export const generatePerson = (): Person => {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    jobTitle: faker.person.jobTitle(),
    department: faker.commerce.department(),
    birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
    salary: faker.number.int({ min: 30000, max: 150000 }),
    hireDate: faker.date.past({ years: 10 }),
  }
}

// Generate multiple fake persons
export const generatePersons = (count: number = 10): Array<Person> => {
  return Array.from({ length: count }, () => generatePerson())
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Create a fixed dataset that won't change between calls
const FIXED_EMPLOYEES: Array<Person> = generatePersons(20)

// Add timestamp to track when data was fetched
console.log('🔧 Fixed dataset created at:', new Date().toLocaleTimeString())

// Mock API functions

export const personsApi = {
  // Get all persons - now returns the same data every time
  getAll: cache(async (): Promise<Array<Person>> => {
    console.log('📡 API: getAll() called at:', new Date().toLocaleTimeString())
    await delay(2000) // Simulate network delay
    console.log(
      '✅ API: getAll() returning data at:',
      new Date().toLocaleTimeString(),
    )
    return FIXED_EMPLOYEES
  }),

  // Get person by ID
  getById: async (id: string): Promise<Person | null> => {
    await delay(300)
    // For demo purposes, generate a person with the requested ID
    const person = generatePerson()
    person.id = id
    return person
  },

  // Create a new person
  create: async (personData: Omit<Person, 'id'>): Promise<Person> => {
    await delay(400)
    return {
      ...personData,
      id: faker.string.uuid(),
    }
  },

  // Update a person
  update: async (id: string, personData: Partial<Person>): Promise<Person> => {
    await delay(400)
    const existingPerson = generatePerson()
    existingPerson.id = id
    return {
      ...existingPerson,
      ...personData,
      id, // Ensure ID doesn't change
    }
  },

  // Delete a person
  delete: async (_id: string): Promise<boolean> => {
    await delay(300)
    return true // Always succeed for demo
  },

  // Search persons
  search: async (query: string): Promise<Array<Person>> => {
    await delay(600)
    const allPersons = generatePersons(50)
    return allPersons.filter(
      (person) =>
        person.firstName.toLowerCase().includes(query.toLowerCase()) ||
        person.lastName.toLowerCase().includes(query.toLowerCase()) ||
        person.email.toLowerCase().includes(query.toLowerCase()) ||
        person.jobTitle.toLowerCase().includes(query.toLowerCase()),
    )
  },
}

// Export a default dataset for quick use
export const defaultPersons = generatePersons(15)
