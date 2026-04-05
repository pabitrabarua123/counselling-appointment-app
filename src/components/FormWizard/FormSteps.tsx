"use client";
import { BookingData } from '@/types';
import { useState, useEffect, useRef } from 'react';
import { Zap, Users, AlertTriangle, Moon, Shield, Frown, Briefcase, HelpCircle } from 'lucide-react'
import { Therapist, User } from '@prisma/client';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Image from 'next/image';
import { TherapistPopup } from './TherapistPopup';
import Button from '../ui/Button';
import Badge from '../ui/badge/Badge';

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
    const [loadingTherapists, setLoadingTherapists] = useState(false);
    useEffect(() => {
      const fetchTherapists = async () => {
        setLoadingTherapists(true);
        setTherapists([]);
        const params = new URLSearchParams({
           isVerified: 'true',
           gender: bookingData.providerGenderPreference === 'No preference' ? '' : bookingData.providerGenderPreference.toLowerCase(),
        });

        try {
          const response = await fetch('/api/therapist?' + params.toString());
          const data = await response.json();
          console.log('Fetched therapists:', data);
          setTherapists(data.therapists);
        } catch (error) {
          console.error('Error fetching therapists:', error);
        }
      };

      if(bookingData.step === 6 && bookingData.therapistId === '') {
         fetchTherapists();
      }
    }, [bookingData]);

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
          <>
           <h3 className="text-2xl font-semibold text-gray-900 mb-2 text-center">What type of service are you looking for?</h3>
            <p className="text-gray-600 text-center">TalkCure offers comprehensive options to meet all your mental health needs</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-y-6">
              {[
                { id: 'individual', title: 'Individual Therapy', desc: 'Individualized support from a licensed therapist for ages 18+', icon: '/images/individual.png' },
                { id: 'couple', title: 'Couple Therapy', desc: 'Relationship support to improve your connection with your partner', icon: '/images/couple.png' },
              ].map(option => (
                <div
                  key={option.id}
                  className={`p-5 border-2 rounded-lg cursor-pointer transition-all max-w-[400px] mx-auto ${
                    bookingData.serviceType === option.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData({ serviceType: option.id as BookingData['serviceType'] })}
                >
                  <div className='flex'>
                    <div className='mr-4'>
<Image src={option.icon} width={60} height={60} alt={option.title}/>
                    </div>
                    <div>
                  <h4 className="font-semibold text-gray-900">{option.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      
        case 2:
        return (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">What&apos;s your date of birth?</h3>
            <p className="text-gray-600 text-center mb-4">Select date of birth from the calendar</p>
            <div className="w-full text-center">
              <input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                value={bookingData.dateOfBirth}
                onChange={(e) => updateBookingData({ dateOfBirth: e.target.value })}
                className="w-[350px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className='flex justify-center w-[350px] mx-auto mt-10'>
              <div className='mr-4 w-[100px]'>
                <Image src="/images/group.png" width={60} height={60} alt="TalkCure"/>
              </div>
              <div>
                <h4 className='font-medium text-gray-900'>Finding the best match for you…</h4>
                <p className='text-sm text-gray-600'>Share a few details about yourself, and we’ll connect you with a dedicated provider who fits your needs.</p>
              </div>
            </div>
          </>
        )  

        case 3:
        return (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">What gender do you identify with?</h3>
            <p className="text-gray-600 text-center mb-4">Your answer helps us find the right counsellor for you</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
              {['Male', 'Female', 'Transgender'].map(g => (
                <div
                  key={g}
                  className={`w-[350px] mx-auto p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
                    bookingData.genderIdentity === g ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData({ genderIdentity: g as BookingData['genderIdentity'] })}
                >
                  <p className="font-medium text-gray-900">{g}</p>
                </div>
              ))}
            </div>
          </>
        )  

      case 4:
        return (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Do you have a preferred gender for your counsellor?</h3>
            <p className="text-gray-600 text-center mb-4">Your preference helps us match you with a provider you feel most comfortable with</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
              {['Male', 'Female', 'No preference'].map(pref => (
                <div
                  key={pref}
                  className={`w-[350px] mx-auto p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
                    bookingData.providerGenderPreference === pref ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData({ providerGenderPreference: pref as BookingData['providerGenderPreference'] })}
                >
                  <p className="font-medium text-gray-900">{pref}</p>
                </div>
              ))}
            </div>
          </>
        )

      case 5:
        return (
          <>
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
                    bookingData.reason.includes(reason) && bookingData.reason.length > 0 ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateBookingData(!bookingData.reason.includes(reason) ? { reason: [...bookingData.reason, reason] } : { reason: bookingData.reason.filter(r => r !== reason) })}
                >
                  <div className="space-x-3">
                    <p className='flex items-center justify-center'><Icon className="h-6 w-6 text-theme" /></p><br/>
                    <p className="text-gray-900 text-center">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )

      case 6:
        return (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Therapist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              { therapists.length === 0 && (
                <div className='flex flex-col items-center justify-center h-[300px] p-5 rounded-xl col-span-3'>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  { loadingTherapists ? (
                    <p className="text-gray-600 text-center">Loading therapists...</p>
                  ) : (
                    <p className="text-gray-600">No therapists found matching your criteria.</p>
                  )}
                </div>
              ) }

              {therapists.map((therapist) => (
                <div
                  key={therapist.id}
                  className={`p-6 border-2 rounded-lg transition-all ${
                    bookingData.therapistId === therapist.userId
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4">
                      { therapist.profilePic ? (
                        <Image
                          width={200}
                          height={200}
                          src={therapist.profilePic}
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
                    <p className="text-blue-600 font-medium">{therapist.area.slice(0, 1).map((item, index) => (
                      <span key={index}>
                        <Badge variant='light'>{item}</Badge>
                      </span>
                    ))}</p>
                    <p className="text-gray-600 text-sm">{therapist.yearOfExp}+ years</p>
                    <div className="flex items-center justify-center mt-2 mb-6">
                      { [1,2,3,4,5].map((star) => (
                        <span key={star} className={`text-xl ${(therapist.rating ?? 0) >= star ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                      )) }
                    </div>
                    <Button
                      variant='outline-full'
                      onClick={() => updateBookingData({ therapistId: therapist.userId })}
                    >
                      {bookingData.therapistId === therapist.userId ? '✓ Selected' : 'Select'}
                    </Button>
                  </div>
                </div>
                
              ))}
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

      case 7:
        return (
          <>
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
                <div className='flex flex-col items-center justify-center h-[300px] border border-[#3f51b512] shadow-[1px_1px_11px_1px_#e0dede66] p-5 rounded-xl'>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600 text-center">Checking availability...</p>
                </div>
                ) }
                
                { slots.length > 0 && (
                <div className="h-[300px] border border-[#3f51b512] shadow-[1px_1px_11px_1px_#e0dede66] p-5 rounded-xl">
                <div className="grid grid-cols-3 gap-3">
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
                </div>
                )}
              </div>
            </div>
          </>
        )

      default:
        return null
    }
  }

  export default FormSteps;