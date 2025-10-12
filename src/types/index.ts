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

export interface BookingData {
  step: number
  therapistId: string
  sessionType: string
  date: string
  time: string
  duration: string
  personalInfo: PersonalInfo
  preferences: Preferences
}

export interface NotificationType {
  type: 'success' | 'error' | 'info'
  message: string
  isVisible: boolean
}
