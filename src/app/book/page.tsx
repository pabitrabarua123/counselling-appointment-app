'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { BookingData } from '@/types'
import { therapists, sessionTypes, therapyTypes } from '@/data/therapists'

export default function BookPage() {
  const [bookingData, setBookingData] = useState<BookingData>({
    step: 1,
    therapistId: '',
    sessionType: '',
    date: '',
    time: '',
    duration: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    },
    preferences: {
      therapyType: '',
      experience: '',
      goals: '',
      emergencyContact: ''
    }
  })

  const steps = [
    { number: 1, title: 'Choose Therapist', description: 'Select your preferred therapist' },
    { number: 2, title: 'Session Details', description: 'Choose session type and time' },
    { number: 3, title: 'Personal Information', description: 'Provide your contact details' },
    { number: 4, title: 'Preferences', description: 'Share your therapy goals' },
    { number: 5, title: 'Confirmation', description: 'Review and confirm booking' }
  ]

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (bookingData.step < 5) {
      updateBookingData({ step: bookingData.step + 1 })
    }
  }

  const prevStep = () => {
    if (bookingData.step > 1) {
      updateBookingData({ step: bookingData.step - 1 })
    }
  }

  const renderStepContent = () => {
    switch (bookingData.step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Therapist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapists.map((therapist) => (
                <div
                  key={therapist.id}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    bookingData.therapistId === therapist.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData({ therapistId: therapist.id })}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <h4 className="text-lg font-semibold text-gray-900">{therapist.name}</h4>
                    <p className="text-blue-600 font-medium">{therapist.specialization}</p>
                    <p className="text-gray-600 text-sm">{therapist.experience} experience</p>
                    <div className="flex items-center justify-center mt-2">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-600">{therapist.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Session Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Session Type</label>
              <div className="space-y-3">
                {sessionTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      bookingData.sessionType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => updateBookingData({ sessionType: type.id, duration: type.duration })}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{type.name}</h4>
                        <p className="text-sm text-gray-600">{type.duration}</p>
                      </div>
                      <span className="text-lg font-semibold text-blue-600">{type.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => updateBookingData({ date: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                <select
                  value={bookingData.time}
                  onChange={(e) => updateBookingData({ time: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={bookingData.personalInfo.firstName}
                  onChange={(e) => updateBookingData({
                    personalInfo: { ...bookingData.personalInfo, firstName: e.target.value }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={bookingData.personalInfo.lastName}
                  onChange={(e) => updateBookingData({
                    personalInfo: { ...bookingData.personalInfo, lastName: e.target.value }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={bookingData.personalInfo.email}
                onChange={(e) => updateBookingData({
                  personalInfo: { ...bookingData.personalInfo, email: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={bookingData.personalInfo.phone}
                  onChange={(e) => updateBookingData({
                    personalInfo: { ...bookingData.personalInfo, phone: e.target.value }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={bookingData.personalInfo.dateOfBirth}
                  onChange={(e) => updateBookingData({
                    personalInfo: { ...bookingData.personalInfo, dateOfBirth: e.target.value }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Therapy Preferences</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Therapy Type</label>
              <select
                value={bookingData.preferences.therapyType}
                onChange={(e) => updateBookingData({
                  preferences: { ...bookingData.preferences, therapyType: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select therapy type</option>
                {therapyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Previous Therapy Experience</label>
              <textarea
                value={bookingData.preferences.experience}
                onChange={(e) => updateBookingData({
                  preferences: { ...bookingData.preferences, experience: e.target.value }
                })}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about your previous therapy experience..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Therapy Goals</label>
              <textarea
                value={bookingData.preferences.goals}
                onChange={(e) => updateBookingData({
                  preferences: { ...bookingData.preferences, goals: e.target.value }
                })}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="What would you like to work on in therapy?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
              <input
                type="text"
                value={bookingData.preferences.emergencyContact}
                onChange={(e) => updateBookingData({
                  preferences: { ...bookingData.preferences, emergencyContact: e.target.value }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name and phone number"
              />
            </div>
          </div>
        )

      case 5:
        const selectedTherapist = therapists.find(t => t.id === bookingData.therapistId)
        const selectedSessionType = sessionTypes.find(s => s.id === bookingData.sessionType)
        
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Confirm Your Booking</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Therapist:</span>
                  <span className="font-medium">{selectedTherapist?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Type:</span>
                  <span className="font-medium">{selectedSessionType?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{selectedSessionType?.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{bookingData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-semibold text-lg">{selectedSessionType?.price}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> You will receive a confirmation email with session details and a secure video link. 
                Please ensure you have a stable internet connection and a private space for your session.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (bookingData.step) {
      case 1:
        return bookingData.therapistId !== ''
      case 2:
        return bookingData.sessionType !== '' && bookingData.date !== '' && bookingData.time !== ''
      case 3:
        return bookingData.personalInfo.firstName !== '' && 
               bookingData.personalInfo.lastName !== '' && 
               bookingData.personalInfo.email !== '' && 
               bookingData.personalInfo.phone !== ''
      case 4:
        return true // Optional step
      case 5:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  bookingData.step >= step.number
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {bookingData.step > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    bookingData.step >= step.number ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 mx-4 ${
                    bookingData.step > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={bookingData.step === 1}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </button>
          
          {bookingData.step < 5 ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={() => {
                // Handle booking confirmation
                alert('Booking confirmed! You will receive a confirmation email shortly.')
              }}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
