"use client";
import { BookingData } from '@/types';
import { useState, useEffect } from 'react';
import { Zap, Users, AlertTriangle, Moon, Shield, Frown, Briefcase, HelpCircle } from 'lucide-react'
import { Therapist, User } from '@prisma/client';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Image from 'next/image';
import { TherapistPopup } from './TherapistPopup';

type TherapistWithUser = Therapist & {
  user: Pick<User, 'name' | 'email' | 'avatar'>;
};

interface Slot {
  time: string,
  available: boolean
}

interface GoogleEvent {
  start?: {
    dateTime?: string; // full date-time string
    date?: string;     // all-day event date string
  }
}

// Convert 24-hour time string ("HH:MM") to 12-hour format with AM/PM
function formatTime24To12(time: string) {
  if (!time || typeof time !== 'string') return time
  const parts = time.split(':')
  if (parts.length < 1) return time
  const hh = parseInt(parts[0], 10)
  const mm = parts[1] ? parseInt(parts[1], 10) : 0
  if (Number.isNaN(hh) || Number.isNaN(mm)) return time
  const period = hh >= 12 ? 'PM' : 'AM'
  const hour = hh % 12 === 0 ? 12 : hh % 12
  const minute = String(mm).padStart(2, '0')
  return `${hour}:${minute} ${period}`
}

  
  const FormSteps = ({bookingData, updateBookingData}: {bookingData: BookingData, updateBookingData: (updates: Partial<BookingData>) => void}) => {
    
    const [therapists, setTherapists] = useState<TherapistWithUser[]>([]);
    useEffect(() => {
      const fetchTherapists = async () => {
        try {
          const response = await fetch('/api/therapist');
          const data = await response.json();
          setTherapists(data);
        } catch (error) {
          console.error('Error fetching therapists:', error);
        }
      };
      fetchTherapists();
    }, []);

    const [showTherapistPopup, setShowTherapistPopup] = useState({status: false, details: null as TherapistWithUser | null});

    const [slots, setSlots] = useState<Slot[]>([]); 
    useEffect(() => {
      //console.log(bookingData.sessionDate)
      const fetchTherapistSlots = async (therapistId: string) => {
        try {
          const response = await fetch(`/api/slots?therapistId=${therapistId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch slots');
          }
          const slots = await response.json();
          const therapistSlots = slots[0].timing.map((slot: string) => {
            return {
              time: slot,
              available: true
            }
          });

          const eventRes = await fetch(`/api/events?therapistId=${therapistId}&date=${bookingData.sessionDate}`);
          const events = await eventRes.json();
          console.log('Fetched events for therapist', events);

          const bookedHours = (events as GoogleEvent[])
          .map((e) => {
            const dateTime = e.start?.dateTime || e.start?.date;
            if (!dateTime) return null;
            return new Date(dateTime).getHours(); // 0–23
          })
          .filter((h: number | null): h is number => h !== null);

          const mergedSlots = therapistSlots.map((slot: Slot) => ({
          ...slot,
          available: !bookedHours.includes(Number(slot.time)),
        }));

          setSlots(mergedSlots);
          console.log('Fetched slots for therapist', therapistId, mergedSlots);
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      };
      if (bookingData.therapistId) {
        setSlots([]);
        fetchTherapistSlots(bookingData.therapistId);
      }
    }, [bookingData.therapistId, bookingData.sessionDate]);

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
            <div className="space-y-3 grid grid-cols-3 gap-2">
              {[
                { text: "I'm feeling anxious or panicky", icon: Zap },
                { text: "I'm having difficulty in my relationship", icon: Users },
                { text: 'A traumatic past experience', icon: AlertTriangle },
                { text: "I've been having trouble sleeping", icon: Moon },
                { text: "I'm navigating addiction or difficulty with substance abuse", icon: Shield },
                { text: "I'm feeling down or depressed", icon: Frown },
                { text: "I'm dealing with stress at work or school", icon: Briefcase },
                { text: 'Something else', icon: HelpCircle }
              ].map(({ text: reason, icon: Icon }) => (
                <div
                  key={reason}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    bookingData.reason.includes(reason) && bookingData.reason.length > 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData(!bookingData.reason.includes(reason) ? { reason: [...bookingData.reason, reason] } : { reason: bookingData.reason.filter(r => r !== reason) })}
                >
                  <div className="space-x-3">
                    <p className='flex items-center justify-center'><Icon className="h-6 w-6 text-blue-600" /></p><br/>
                    <p className="text-gray-900 text-center">{reason}</p>
                  </div>
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
          <>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Therapist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapists.map((therapist) => (
                <div
                  key={therapist.id}
                  className={`p-6 border-2 rounded-lg transition-all ${
                    bookingData.therapistId === therapist.userId
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4">
                      { therapist.user.avatar ? (
                        <Image
                          width={200}
                          height={200}
                          src={therapist.user.avatar}
                          alt={therapist.user.name || 'Therapist Avatar'}
                          className="w-20 h-20 rounded-full object-cover cursor-pointer"
                          onClick={() => setShowTherapistPopup({status: true, details: therapist})}
                        />
                       ) : null }
                    </div>
                    <h4 
                      className="text-lg font-semibold text-gray-900 cursor-pointer" 
                      onClick={() => setShowTherapistPopup({status: true, details: therapist})}
                    >
                      {therapist.user.name}
                    </h4>
                    <p className="text-blue-600 font-medium">{therapist.area}</p>
                    <p className="text-gray-600 text-sm">{therapist.yearOfExp} experience</p>
                    <div className="flex items-center justify-center mt-2">
                      { [1,2,3,4,5].map((star) => (
                        <span key={star} className={`text-xl ${(therapist.rating ?? 0) >= star ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                      )) }
                    </div>
                    <button
                      className={`mt-4 px-4 py-2 rounded-md font-medium transition-all ${
                        bookingData.therapistId === therapist.userId
                          ? 'bg-blue-600 text-white cursor-pointer'
                          : 'bg-[#85e8ff] text-black cursor-pointer'
                      }`}
                      onClick={() => updateBookingData({ therapistId: therapist.userId })}
                    >
                      {bookingData.therapistId === therapist.userId ? '✓ Selected' : 'Select'}
                    </button>
                  </div>
                </div>
                
              ))}
            </div>
          </div>
          { showTherapistPopup.status && (
            <TherapistPopup
              name={showTherapistPopup.details?.user.name || ''}
              degree={showTherapistPopup.details?.degree || ''}
              about={showTherapistPopup.details?.aboutTherapist || ''}
              experience={showTherapistPopup.details?.yearOfExp || 0}
              area={showTherapistPopup.details?.area || []}
              onClose={() => setShowTherapistPopup({status: false, details: null})}
            />
          ) }
          </>
        )

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select date and time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                <Calendar
                  onChange={(date) => {
                    if (date instanceof Date) {
                      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                      updateBookingData({ sessionDate: localDate.toISOString().split('T')[0] });
                    }
                  }}
                  value={bookingData.sessionDate ? new Date(bookingData.sessionDate) : new Date()}
                  minDate={new Date()}
                  className="border border-gray-300 rounded-lg p-3"
                  tileClassName="text-gray-900"
                  prev2Label={null}
                  next2Label={null}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                { slots.length === 0 && (
                <div className='h-[200px] flex flex-col items-center justify-center border border-[#3f51b512] shadow-[1px_1px_11px_1px_#eeeeee66] p-5 rounded-xl'>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600 text-center">Checking availability...</p>
                </div>
                ) }
                
                { slots.length > 0 && (
                <div className="grid grid-cols-3 gap-3 border border-[#3f51b512] shadow-[1px_1px_11px_1px_#eeeeee66] p-5 rounded-xl">
                  {slots.map((slot) => (
                    <div key={slot.time}>
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        className={`w-full p-3 font-medium border-1 rounded-lg text-center transition-all ${
                          bookingData.sessionTime === slot.time
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-300'
                        } ${!slot.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => updateBookingData({ sessionTime: slot.time })}
                      >
                        {formatTime24To12(slot.time)}
                      </button>
                    </div>
                  ))}
                </div>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  export default FormSteps;