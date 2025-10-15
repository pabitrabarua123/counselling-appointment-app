'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { BookingData } from '@/types'
import { therapists } from '@/data/therapists'

export default function BookWizard() {
  const [bookingData, setBookingData] = useState<BookingData>({
    step: 1,
    serviceType: '',
    reason: '',
    sleepQuality: '',
    genderIdentity: '',
    providerGenderPreference: '',
    dateOfBirth: '',
    therapistId: '',
    date: '',
    time: ''
  })

  const totalSteps = 8
  const progressPercent = useMemo(() => {
    const completed = Math.max(0, Math.min(totalSteps, bookingData.step - 1))
    return (completed / (totalSteps)) * 100
  }, [bookingData.step])

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (bookingData.step < totalSteps) {
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
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">What type of service are you looking for?</h3>
            <p className="text-gray-600">TalkCure offers comprehensive options to meet all your mental health needs</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'individual', title: 'Individual Therapy', desc: 'Individualized support from a licensed therapist for ages 18+' },
                { id: 'couples', title: 'Couples Therapy', desc: 'Relationship support to improve your connection with your partner' },
                { id: 'teen', title: 'Teen Therapy', desc: 'Specialized support designed for youth ages 13-17' }
              ].map(option => (
                <div
                  key={option.id}
                  className={`p-5 border-2 rounded-lg cursor-pointer transition-all ${
                    bookingData.serviceType === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData({ serviceType: option.id as BookingData['serviceType'] })}
                >
                  <h4 className="font-semibold text-gray-900">{option.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">To get started, please tell us what prompted you to seek help.</h3>
            <div className="space-y-3">
              {[
                "I'm feeling anxious or panicky",
                "I'm having difficulty in my relationship",
                'A traumatic experience [past or present]',
                "I've been having trouble sleeping",
                "I'm navigating addiction or difficulty with substance abuse",
                "I'm feeling down or depressed",
                "I'm dealing with stress at work or school",
                'Something else'
              ].map(reason => (
                <div
                  key={reason}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    bookingData.reason === reason ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData({ reason })}
                >
                  <p className="text-gray-900">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">How would you describe your sleep routine?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Excellent', 'Good', 'Fair', 'Poor'].map(level => (
                <div
                  key={level}
                  className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
                    bookingData.sleepQuality === level ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData({ sleepQuality: level as BookingData['sleepQuality'] })}
                >
                  <p className="font-medium text-gray-900">{level}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">What gender do you identify with?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {['Female', 'Male', 'Transgender'].map(g => (
                <div
                  key={g}
                  className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
                    bookingData.genderIdentity === g ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData({ genderIdentity: g as BookingData['genderIdentity'] })}
                >
                  <p className="font-medium text-gray-900">{g}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Do you have a preferred gender for your provider?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {['No preference', 'Female', 'Male'].map(pref => (
                <div
                  key={pref}
                  className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
                    bookingData.providerGenderPreference === pref ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData({ providerGenderPreference: pref as BookingData['providerGenderPreference'] })}
                >
                  <p className="font-medium text-gray-900">{pref}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">What&apos;s your date of birth?</h3>
            <div className="max-w-sm">
              <input
                type="date"
                value={bookingData.dateOfBirth}
                onChange={(e) => updateBookingData({ dateOfBirth: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )

      case 7:
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

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select date and time</h3>
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

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (bookingData.step) {
      case 1:
        return bookingData.serviceType !== ''
      case 2:
        return bookingData.reason !== ''
      case 3:
        return bookingData.sleepQuality !== ''
      case 4:
        return bookingData.genderIdentity !== ''
      case 5:
        return bookingData.providerGenderPreference !== ''
      case 6:
        return bookingData.dateOfBirth !== ''
      case 7:
        return bookingData.therapistId !== ''
      case 8:
        return bookingData.date !== '' && bookingData.time !== ''
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Thin Progress Bar */}
        <div className="mb-6">
          <div className="w-full h-1 bg-gray-200 rounded">
            <div
              className="h-1 bg-blue-600 rounded"
              style={{ width: `${progressPercent}%`, transition: 'width 200ms ease' }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600">Step {bookingData.step} of {totalSteps}</div>
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
          
          {bookingData.step < totalSteps ? (
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


