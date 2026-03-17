'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { BookingData } from '@/types'
import FormSteps from './FormSteps'
import CheckoutPage from './Checkout'
import { ChevronDown } from "lucide-react";
import Button from '../ui/Button'

export default function FormWizard() {
  const [bookingData, setBookingData] = useState<BookingData>({
    step: 1,
    serviceType: '',
    reason: [],
    sleepQuality: '',
    genderIdentity: '',
    providerGenderPreference: '',
    dateOfBirth: '',
    therapistId: '',
    sessionDate: new Date().toISOString().split('T')[0],
    sessionTime: ''
  })

  useEffect(() => {
    console.log('Current Booking Data:', bookingData)
  }, [bookingData]);

  const totalSteps = 7;
  const progressPercent = useMemo(() => {
    const completed = Math.max(0, Math.min(totalSteps, bookingData.step - 1))
    return (completed / (totalSteps)) * 100
  }, [bookingData.step])

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    updateBookingData({ step: bookingData.step + 1 })
  }

  const prevStep = () => {
    if (bookingData.step > 1) {
      updateBookingData({ step: bookingData.step - 1 })
    }
  }

  const isStepValid = () => {
    switch (bookingData.step) {
      case 1:
        return bookingData.serviceType !== ''
      case 2:
        return bookingData.dateOfBirth !== ''
      case 3:
        return bookingData.genderIdentity !== ''
      case 4:
        return bookingData.providerGenderPreference !== ''
      case 5:
        return bookingData.reason.length > 0
      case 6:
        return bookingData.therapistId !== ''
      case 7:
        return bookingData.sessionDate !== '' && bookingData.sessionTime !== ''
      default:
        return false
    }
  }

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const scrollDown = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          top: 150, // how much to scroll
          behavior: "smooth",
        });
      }
    };

  return (
    <div className="min-h-screen bg-gray-50 mt-[65px] py-15">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg bg-white">
        {/* Thin Progress Bar */}
        <div className="mb-10">
          <div className="w-full h-1 bg-gray-200 rounded">
            <div
              className="h-1 bg-primary rounded"
              style={{ width: `${progressPercent}%`, transition: 'width 200ms ease' }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg px-8 py-0">
          <div className="space-y-6 h-[400px] overflow-y-scroll no-scrollbar" ref={scrollRef}>
          <FormSteps bookingData={bookingData} updateBookingData={updateBookingData} />
          { bookingData.step === totalSteps + 1 && (
            <CheckoutPage bookingData={bookingData}/>
          ) }
          </div>
          {/* Down Arrow Button */}
          { (bookingData.step === 5 || bookingData.step === 6) && (
          <div className="flex justify-center -mt-4">
            <button
              onClick={scrollDown}
              className="cursor-pointer p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <ChevronDown size={22} />
            </button>
           </div>
          )}
        </div>

        {/* Navigation Buttons */}
        { bookingData.step < totalSteps + 1 && (
        <div className="flex justify-between mt-0 p-8">
          <button
            onClick={prevStep}
            disabled={bookingData.step === 1}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <Button
            variant='primary'
            onClick={nextStep}
            disabled={!isStepValid()}
          >
            <span>Continue</span>
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        ) }
      </div>
    </div>
  )
}


