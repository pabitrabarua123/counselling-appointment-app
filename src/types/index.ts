export interface Therapist {
  id: string;
  degree: string;
  gender: string | null;
  area: string[];
  yearOfExp: number;
  languages: string[];
  aboutTherapist: string;
  rating: number;
  googleCalendarId: string | null;
  phoneNumber: string | null;
  profilePic: string | null;
  userId: string;
  isVerified: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    orders: {
      id: string;
      customerName: string;
    }[],
    slot: {
      id: string;
      days: string[];
      timing: string[];
    }
  };
};

export interface Client {
  id: string
  name: string | null
  age: string | null
  gender: string | null
  issues: string[]
  languages: string[]
  sessionType: string
  phoneNumber: string | null
  email: string | null
  therapist: {
    id: string
    name: string
    email: string
  };
};

export interface Order {
  id: string;
  customerName: string | null;
  customerEmail: string | null;
  serviceType: string;
  sessionStart: string;
  sessionEnd: string;
  therapist: {
    id: string;
    name: string;
    email: string;
  };
};

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
  area: string[];
  languages: string[];
  description: string;
};

export interface BookingData {
  step: number
  // Step 1: Service type
  serviceType: 'individual' | 'couple' | 'teen' | ''
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
