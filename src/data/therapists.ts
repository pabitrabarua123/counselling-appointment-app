import { Therapist, SessionType } from '@/types'

export const therapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Licensed Clinical Psychologist',
    specialization: 'Anxiety & Depression',
    experience: '8 years',
    rating: 4.9,
    reviews: 127,
    location: 'New York, NY',
    languages: ['English', 'Spanish'],
    education: 'PhD in Clinical Psychology, Columbia University',
    certifications: ['CBT Certified', 'Trauma-Informed Care'],
    bio: 'Dr. Johnson specializes in treating anxiety and depression using evidence-based approaches. She has helped hundreds of clients overcome their mental health challenges and build resilience.',
    specialties: ['Anxiety Disorders', 'Depression', 'Stress Management', 'Cognitive Behavioral Therapy'],
    availability: 'Monday - Friday, 9 AM - 6 PM',
    image: '/api/placeholder/200/200'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'Licensed Marriage and Family Therapist',
    specialization: 'Trauma & PTSD',
    experience: '12 years',
    rating: 4.8,
    reviews: 89,
    location: 'Los Angeles, CA',
    languages: ['English', 'Mandarin'],
    education: 'PhD in Marriage and Family Therapy, UCLA',
    certifications: ['EMDR Certified', 'Trauma Specialist'],
    bio: 'Dr. Chen is a trauma specialist with extensive experience helping individuals and families heal from traumatic experiences. He uses a compassionate, evidence-based approach.',
    specialties: ['PTSD', 'Trauma Recovery', 'Family Therapy', 'EMDR'],
    availability: 'Tuesday - Saturday, 10 AM - 7 PM',
    image: '/api/placeholder/200/200'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    title: 'Licensed Clinical Social Worker',
    specialization: 'Couples Therapy',
    experience: '6 years',
    rating: 4.9,
    reviews: 156,
    location: 'Chicago, IL',
    languages: ['English', 'Spanish'],
    education: 'MSW, University of Chicago',
    certifications: ['Gottman Method Certified', 'Couples Therapy Specialist'],
    bio: 'Dr. Rodriguez specializes in couples therapy and relationship counseling. She helps couples build stronger, more fulfilling relationships through evidence-based interventions.',
    specialties: ['Couples Therapy', 'Relationship Counseling', 'Communication Skills', 'Gottman Method'],
    availability: 'Monday - Thursday, 8 AM - 5 PM',
    image: '/api/placeholder/200/200'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    title: 'Licensed Professional Counselor',
    specialization: 'Addiction & Recovery',
    experience: '10 years',
    rating: 4.7,
    reviews: 98,
    location: 'Houston, TX',
    languages: ['English'],
    education: 'MA in Counseling, University of Houston',
    certifications: ['Addiction Counselor', 'Substance Abuse Specialist'],
    bio: 'Dr. Wilson has dedicated his career to helping individuals overcome addiction and build sustainable recovery. He uses a holistic approach that addresses the whole person.',
    specialties: ['Substance Abuse', 'Addiction Recovery', 'Relapse Prevention', 'Family Support'],
    availability: 'Monday - Friday, 7 AM - 4 PM',
    image: '/api/placeholder/200/200'
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    title: 'Licensed Clinical Psychologist',
    specialization: 'Child & Adolescent Therapy',
    experience: '9 years',
    rating: 4.9,
    reviews: 203,
    location: 'Seattle, WA',
    languages: ['English', 'French'],
    education: 'PhD in Child Psychology, University of Washington',
    certifications: ['Play Therapy Certified', 'Child Trauma Specialist'],
    bio: 'Dr. Thompson specializes in working with children and adolescents, helping them navigate developmental challenges and mental health issues in a safe, supportive environment.',
    specialties: ['Child Therapy', 'Adolescent Counseling', 'Play Therapy', 'Family Systems'],
    availability: 'Monday - Friday, 9 AM - 6 PM',
    image: '/api/placeholder/200/200'
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    title: 'Licensed Clinical Psychologist',
    specialization: 'LGBTQ+ Mental Health',
    experience: '7 years',
    rating: 4.8,
    reviews: 145,
    location: 'San Francisco, CA',
    languages: ['English', 'Korean'],
    education: 'PhD in Clinical Psychology, Stanford University',
    certifications: ['LGBTQ+ Affirmative Therapy', 'Cultural Competency'],
    bio: 'Dr. Kim is passionate about providing culturally competent mental health care to the LGBTQ+ community. He creates a safe, affirming space for all clients.',
    specialties: ['LGBTQ+ Issues', 'Identity Development', 'Coming Out Support', 'Cultural Competency'],
    availability: 'Tuesday - Saturday, 10 AM - 7 PM',
    image: '/api/placeholder/200/200'
  }
]

export const sessionTypes: SessionType[] = [
  { id: 'individual', name: 'Individual Therapy', duration: '50 minutes', price: '$120' },
  { id: 'couples', name: 'Couples Therapy', duration: '60 minutes', price: '$150' },
  { id: 'group', name: 'Group Therapy', duration: '90 minutes', price: '$80' }
]

export const therapyTypes = [
  'Cognitive Behavioral Therapy (CBT)',
  'Dialectical Behavior Therapy (DBT)',
  'Psychodynamic Therapy',
  'Humanistic Therapy',
  'Mindfulness-Based Therapy'
]
