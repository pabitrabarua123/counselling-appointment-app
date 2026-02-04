export interface Therapist {
  id: string
  name: string
  title: string
  specialization: string
  experience: string
  rating: number
  reviews: number
  location: string
  languages: string[]
  education: string
  certifications: string[]
  bio: string
  specialties: string[]
  availability: string
  image: string
}

export interface SessionType {
  id: string
  name: string
  duration: string
  price: string
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
}

export interface Preferences {
  therapyType: string
  experience: string
  goals: string
  emergencyContact: string
}

export type TabItem = {
  id: number;
  name: string;
  image: string;
  degree: string;
  areas: string[];
  description: string;
};

export interface BookingData {
  step: number
  // Step 1: Service type
  serviceType: 'individual' | 'couples' | 'teen' | ''
  // Step 2: Reason for seeking help
  reason: string[]
  // Step 3: Sleep routine
  sleepQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor' | ''
  // Step 4: Gender identity
  genderIdentity: 'Female' | 'Male' | 'Transgender' | ''
  // Step 5: Provider gender preference
  providerGenderPreference: 'No preference' | 'Female' | 'Male' | ''
  // Step 6: Date of birth
  dateOfBirth: string
  // Step 7: Therapist selection
  therapistId: string
  // Step 8: Date and time selection
  sessionDate: string
  sessionTime: string
}

export interface NotificationType {
  type: 'success' | 'error' | 'info'
  message: string
  isVisible: boolean
}
