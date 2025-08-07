// API Base Configuration
const API_BASE_URL = 'http://192.168.0.194:8000/api/v1';

// Mock mode - set to true if backend is not accessible
const MOCK_MODE = true;

// Mock data for demonstration
const mockAvailabilitySlots: AvailabilitySlot[] = [];

// API Response Types
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success: boolean;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// Provider Types
export interface ProviderCreate {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  specialization: string;
  license_number: string;
  years_of_experience: number;
  clinic_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  license_document_url?: string;
  password: string;
  confirm_password: string;
}

export interface ProviderLoginRequest {
  email: string;
  password: string;
}

export interface ProviderProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  specialization: string;
  license_number: string;
  years_of_experience: number;
  clinic_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  license_document_url?: string;
  created_at: string;
  updated_at: string;
}

// Patient Types
export interface PatientCreate {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
  };
  emergency_contact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
  medical_history?: string[];
  insurance_info?: {
    provider?: string;
    policy_number?: string;
    group_number?: string;
    member_id?: string;
  };
  password: string;
  confirm_password: string;
}

export interface PatientLoginRequest {
  email: string;
  password: string;
}

export interface PatientProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  emergency_contact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
  medical_history?: string[];
  insurance_info?: {
    provider?: string;
    policy_number?: string;
    group_number?: string;
    member_id?: string;
  };
  created_at: string;
  updated_at: string;
}

// Availability Types
export interface AvailabilitySlot {
  id: string;
  provider_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'available' | 'booked' | 'cancelled' | 'blocked';
  appointment_type?: string;
  notes?: string;
  is_recurring: boolean;
  recurring_pattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    days_of_week?: number[];
    end_date?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateAvailabilityRequest {
  date: string;
  start_time: string;
  end_time: string;
  appointment_type?: string;
  notes?: string;
  is_recurring?: boolean;
  recurring_pattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    days_of_week?: number[];
    end_date?: string;
  };
}

export interface UpdateAvailabilityRequest {
  date?: string;
  start_time?: string;
  end_time?: string;
  status?: 'available' | 'booked' | 'cancelled' | 'blocked';
  appointment_type?: string;
  notes?: string;
}

export interface SearchAvailabilityParams {
  date?: string;
  start_date?: string;
  end_date?: string;
  specialization?: string;
  location?: string;
  appointment_type?: string;
  insurance_accepted?: boolean;
  max_price?: number;
  timezone?: string;
  available_only?: boolean;
}

// Utility function to handle API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // If in mock mode, handle requests locally
  if (MOCK_MODE) {
    return handleMockRequest<T>(endpoint, options);
  }

  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add authorization header if token exists
  const token = localStorage.getItem('providerToken') || localStorage.getItem('patientToken');
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.detail || errorData.message || `HTTP error! status: ${response.status}`;
      console.error('API Error:', errorData);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Mock request handler for demonstration
async function handleMockRequest<T>(endpoint: string, options: RequestInit): Promise<T> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (endpoint.includes('/provider/login')) {
    const body = JSON.parse(options.body as string);
    if (body.email && body.password) {
      return {
        access_token: 'mock-provider-token-' + Date.now(),
        refresh_token: 'mock-refresh-token-' + Date.now(),
        token_type: 'bearer',
        expires_in: 3600
      } as T;
    }
    throw new Error('Invalid credentials');
  }

  if (endpoint.includes('/patient/login')) {
    const body = JSON.parse(options.body as string);
    if (body.email && body.password) {
      return {
        access_token: 'mock-patient-token-' + Date.now(),
        refresh_token: 'mock-refresh-token-' + Date.now(),
        token_type: 'bearer',
        expires_in: 3600
      } as T;
    }
    throw new Error('Invalid credentials');
  }

  if (endpoint.includes('/provider/register')) {
    return {
      success: true,
      message: 'Provider registered successfully',
      data: {
        provider_id: 'mock-provider-id-' + Date.now(),
        email: 'mock@provider.com',
        verification_status: 'verified'
      }
    } as T;
  }

  if (endpoint.includes('/provider/availability') && options.method === 'POST') {
    const body = JSON.parse(options.body as string);
    const newSlot: AvailabilitySlot = {
      id: 'mock-slot-' + Date.now(),
      provider_id: 'mock-provider-id',
      date: body.date,
      start_time: body.start_time,
      end_time: body.end_time,
      status: 'available',
      appointment_type: body.appointment_type,
      notes: body.notes,
      is_recurring: body.is_recurring || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockAvailabilitySlots.push(newSlot);
    return [newSlot] as T;
  }

  if (endpoint.includes('/provider/availability') && options.method === 'GET') {
    return mockAvailabilitySlots as T;
  }

  if (endpoint.includes('/provider/availability/') && options.method === 'PUT') {
    const slotId = endpoint.split('/').pop();
    const body = JSON.parse(options.body as string);
    const slotIndex = mockAvailabilitySlots.findIndex(s => s.id === slotId);
    if (slotIndex !== -1) {
      mockAvailabilitySlots[slotIndex] = { ...mockAvailabilitySlots[slotIndex], ...body };
      return mockAvailabilitySlots[slotIndex] as T;
    }
    throw new Error('Slot not found');
  }

  if (endpoint.includes('/provider/availability/') && options.method === 'DELETE') {
    const slotId = endpoint.split('/').pop();
    const slotIndex = mockAvailabilitySlots.findIndex(s => s.id === slotId);
    if (slotIndex !== -1) {
      mockAvailabilitySlots.splice(slotIndex, 1);
      return { success: true, message: 'Slot deleted successfully' } as T;
    }
    throw new Error('Slot not found');
  }

  // Default mock response
  return { success: true, message: 'Mock operation successful' } as T;
}

// Provider API Services
export const providerApi = {
  // Register a new provider
  register: async (data: ProviderCreate): Promise<ApiResponse> => {
    return apiRequest('/provider/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Provider login
  login: async (data: ProviderLoginRequest): Promise<AuthResponse> => {
    return apiRequest('/provider/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    return apiRequest('/provider/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  },

  // Provider logout
  logout: async (refreshToken: string): Promise<ApiResponse> => {
    return apiRequest('/provider/logout', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  },

  // Get provider profile
  getProfile: async (providerId: string): Promise<ProviderProfile> => {
    return apiRequest(`/provider/${providerId}/profile`);
  },

  // Update provider profile
  updateProfile: async (providerId: string, data: Partial<ProviderCreate>): Promise<ProviderProfile> => {
    return apiRequest(`/provider/${providerId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Patient API Services
export const patientApi = {
  // Register a new patient
  register: async (data: PatientCreate): Promise<ApiResponse> => {
    return apiRequest('/patient/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Patient login
  login: async (data: PatientLoginRequest): Promise<AuthResponse> => {
    return apiRequest('/patient/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Verify patient email
  verifyEmail: async (token: string): Promise<ApiResponse> => {
    return apiRequest('/patient/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  // Get patient profile
  getProfile: async (patientId: string): Promise<PatientProfile> => {
    return apiRequest(`/patient/profile/${patientId}`);
  },

  // Update patient profile
  updateProfile: async (patientId: string, data: Partial<PatientCreate>): Promise<PatientProfile> => {
    return apiRequest(`/patient/profile/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Patient logout
  logout: async (): Promise<ApiResponse> => {
    return apiRequest('/patient/logout', {
      method: 'POST',
    });
  },
};

// Availability API Services
export const availabilityApi = {
  // Create availability slots
  createSlots: async (data: CreateAvailabilityRequest): Promise<AvailabilitySlot[]> => {
    return apiRequest('/provider/availability?args=&kwargs=', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get provider availability
  getProviderAvailability: async (
    providerId: string,
    params: {
      start_date?: string;
      end_date?: string;
      status?: string;
      appointment_type?: string;
      timezone?: string;
    } = {}
  ): Promise<AvailabilitySlot[]> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    return apiRequest(`/provider/${providerId}/availability?${queryParams}`);
  },

  // Update availability slot
  updateSlot: async (slotId: string, data: UpdateAvailabilityRequest): Promise<AvailabilitySlot> => {
    return apiRequest(`/provider/availability/${slotId}?args=&kwargs=`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete availability slot
  deleteSlot: async (slotId: string, deleteRecurring?: boolean): Promise<ApiResponse> => {
    const params = deleteRecurring ? '&delete_recurring=true' : '';
    return apiRequest(`/provider/availability/${slotId}?args=&kwargs=${params}`, {
      method: 'DELETE',
    });
  },

  // Search available slots
  searchAvailability: async (params: SearchAvailabilityParams): Promise<AvailabilitySlot[]> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    return apiRequest(`/provider/availability/search?${queryParams}`);
  },
};

// Authentication utilities
export const authUtils = {
  // Store authentication tokens
  storeTokens: (accessToken: string, refreshToken: string, userType: 'provider' | 'patient') => {
    localStorage.setItem(`${userType}Token`, accessToken);
    localStorage.setItem(`${userType}RefreshToken`, refreshToken);
  },

  // Get stored token
  getToken: (userType: 'provider' | 'patient'): string | null => {
    return localStorage.getItem(`${userType}Token`);
  },

  // Get refresh token
  getRefreshToken: (userType: 'provider' | 'patient'): string | null => {
    return localStorage.getItem(`${userType}RefreshToken`);
  },

  // Clear authentication data
  clearAuth: (userType: 'provider' | 'patient') => {
    localStorage.removeItem(`${userType}Token`);
    localStorage.removeItem(`${userType}RefreshToken`);
    localStorage.removeItem(`${userType}User`);
  },

  // Check if user is authenticated
  isAuthenticated: (userType: 'provider' | 'patient'): boolean => {
    return !!localStorage.getItem(`${userType}Token`);
  },

  // Refresh token if needed
  refreshTokenIfNeeded: async (userType: 'provider' | 'patient'): Promise<boolean> => {
    const refreshToken = authUtils.getRefreshToken(userType);
    if (!refreshToken) return false;

    try {
      const response = userType === 'provider' 
        ? await providerApi.refreshToken(refreshToken)
        : await providerApi.refreshToken(refreshToken); // Using provider API for both since patient API doesn't have refreshToken
      
      authUtils.storeTokens(response.access_token, response.refresh_token, userType);
      return true;
    } catch (error) {
      authUtils.clearAuth(userType);
      return false;
    }
  },
};

export default {
  providerApi,
  patientApi,
  availabilityApi,
  authUtils,
}; 