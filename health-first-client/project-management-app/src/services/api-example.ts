// Example usage of the Healthcare API integration
// This file demonstrates how to use the API services in your React components

import { 
  providerApi, 
  patientApi, 
  availabilityApi, 
  authUtils,
  type ProviderCreate,
  type PatientCreate,
  type CreateAvailabilityRequest
} from './api'

// Example: Provider Registration
export const registerProviderExample = async () => {
  try {
    const providerData: ProviderCreate = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@healthcare.com",
      phone_number: "+1234567890",
      specialization: "Cardiology",
      license_number: "MD123456",
      years_of_experience: 10,
      clinic_address: {
        street: "123 Medical Center Dr",
        city: "New York",
        state: "NY",
        zip: "10001"
      },
      license_document_url: "https://example.com/license.pdf",
      password: "SecurePassword123!",
      confirm_password: "SecurePassword123!"
    }

    const response = await providerApi.register(providerData)
    console.log('Provider registered:', response)
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

// Example: Provider Login
export const loginProviderExample = async () => {
  try {
    const loginData = {
      email: "john.doe@healthcare.com",
      password: "SecurePassword123!"
    }

    const response = await providerApi.login(loginData)
    
    // Store authentication tokens
    authUtils.storeTokens(response.access_token, response.refresh_token, 'provider')
    
    // Store user data
    localStorage.setItem('providerUser', JSON.stringify({
      email: loginData.email,
      name: 'Dr. John Doe',
      role: 'provider'
    }))

    console.log('Provider logged in successfully')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Example: Patient Registration
export const registerPatientExample = async () => {
  try {
    const patientData: PatientCreate = {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@email.com",
      phone_number: "+1987654321",
      date_of_birth: "1990-05-15",
      gender: "female",
      address: {
        street: "456 Health Ave",
        city: "Los Angeles",
        state: "CA",
        zip: "90210",
        country: "USA"
      },
      emergency_contact: {
        name: "John Smith",
        phone: "+1555123456",
        relationship: "Spouse"
      },
      medical_history: ["Hypertension", "Diabetes"],
      insurance_info: {
        provider: "Blue Cross",
        policy_number: "BC123456789",
        group_number: "GRP001",
        member_id: "MEM123456"
      },
      password: "PatientPass123!",
      confirm_password: "PatientPass123!"
    }

    const response = await patientApi.register(patientData)
    console.log('Patient registered:', response)
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

// Example: Patient Login
export const loginPatientExample = async () => {
  try {
    const loginData = {
      email: "jane.smith@email.com",
      password: "PatientPass123!"
    }

    const response = await patientApi.login(loginData)
    
    // Store authentication tokens
    authUtils.storeTokens(response.access_token, response.refresh_token, 'patient')
    
    // Store user data
    localStorage.setItem('patientUser', JSON.stringify({
      email: loginData.email,
      name: 'Jane Smith',
      role: 'patient'
    }))

    console.log('Patient logged in successfully')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Example: Create Availability Slots
export const createAvailabilityExample = async () => {
  try {
    const availabilityData: CreateAvailabilityRequest = {
      date: "2024-01-15",
      start_time: "09:00",
      end_time: "17:00",
      appointment_type: "General Consultation",
      notes: "Regular office hours",
      is_recurring: true,
      recurring_pattern: {
        frequency: "weekly",
        interval: 1,
        days_of_week: [1, 2, 3, 4, 5], // Monday to Friday
        end_date: "2024-12-31"
      }
    }

    const response = await availabilityApi.createSlots(availabilityData)
    console.log('Availability slots created:', response)
  } catch (error) {
    console.error('Failed to create availability:', error)
  }
}

// Example: Get Provider Availability
export const getAvailabilityExample = async (providerId: string) => {
  try {
    const params = {
      start_date: "2024-01-01",
      end_date: "2024-01-31",
      status: "available",
      appointment_type: "General Consultation",
      timezone: "America/New_York"
    }

    const response = await availabilityApi.getProviderAvailability(providerId, params)
    console.log('Provider availability:', response)
  } catch (error) {
    console.error('Failed to get availability:', error)
  }
}

// Example: Search Available Slots
export const searchAvailabilityExample = async () => {
  try {
    const searchParams = {
      date: "2024-01-15",
      specialization: "Cardiology",
      location: "New York",
      appointment_type: "Consultation",
      insurance_accepted: true,
      max_price: 200,
      timezone: "America/New_York",
      available_only: true
    }

    const response = await availabilityApi.searchAvailability(searchParams)
    console.log('Available slots found:', response)
  } catch (error) {
    console.error('Search failed:', error)
  }
}

// Example: Update Availability Slot
export const updateAvailabilityExample = async (slotId: string) => {
  try {
    const updateData = {
      status: "booked" as const,
      appointment_type: "Follow-up",
      notes: "Patient appointment confirmed"
    }

    const response = await availabilityApi.updateSlot(slotId, updateData)
    console.log('Slot updated:', response)
  } catch (error) {
    console.error('Update failed:', error)
  }
}

// Example: Delete Availability Slot
export const deleteAvailabilityExample = async (slotId: string) => {
  try {
    const response = await availabilityApi.deleteSlot(slotId, true) // Delete recurring
    console.log('Slot deleted:', response)
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

// Example: Authentication Utilities
export const authExamples = () => {
  // Check if user is authenticated
  const isProviderAuth = authUtils.isAuthenticated('provider')
  const isPatientAuth = authUtils.isAuthenticated('patient')
  
  console.log('Provider authenticated:', isProviderAuth)
  console.log('Patient authenticated:', isPatientAuth)
  
  // Get stored tokens
  const providerToken = authUtils.getToken('provider')
  const patientToken = authUtils.getToken('patient')
  
  console.log('Provider token exists:', !!providerToken)
  console.log('Patient token exists:', !!patientToken)
  
  // Clear authentication
  // authUtils.clearAuth('provider')
  // authUtils.clearAuth('patient')
}

// Example: React Hook for API Integration
export const useApiIntegration = () => {
  const loginProvider = async (email: string, password: string) => {
    try {
      const response = await providerApi.login({ email, password })
      authUtils.storeTokens(response.access_token, response.refresh_token, 'provider')
      return { success: true, data: response }
    } catch (error) {
      return { success: false, error }
    }
  }

  const loginPatient = async (email: string, password: string) => {
    try {
      const response = await patientApi.login({ email, password })
      authUtils.storeTokens(response.access_token, response.refresh_token, 'patient')
      return { success: true, data: response }
    } catch (error) {
      return { success: false, error }
    }
  }

  const logout = (userType: 'provider' | 'patient') => {
    authUtils.clearAuth(userType)
  }

  const createAvailability = async (data: CreateAvailabilityRequest) => {
    try {
      const response = await availabilityApi.createSlots(data)
      return { success: true, data: response }
    } catch (error) {
      return { success: false, error }
    }
  }

  return {
    loginProvider,
    loginPatient,
    logout,
    createAvailability,
    isAuthenticated: authUtils.isAuthenticated
  }
}

export default {
  registerProviderExample,
  loginProviderExample,
  registerPatientExample,
  loginPatientExample,
  createAvailabilityExample,
  getAvailabilityExample,
  searchAvailabilityExample,
  updateAvailabilityExample,
  deleteAvailabilityExample,
  authExamples,
  useApiIntegration
} 