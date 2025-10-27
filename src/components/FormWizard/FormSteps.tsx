  import { BookingData } from '@/types';
  import { Zap, Users, AlertTriangle, Moon, Shield, Frown, Briefcase, HelpCircle } from 'lucide-react'
  import { therapists } from '@/data/therapists'
  
  const FormSteps = ({bookingData, updateBookingData}: {bookingData: BookingData, updateBookingData: (updates: Partial<BookingData>) => void}) => {
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

  export default FormSteps;