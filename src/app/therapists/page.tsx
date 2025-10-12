import Link from 'next/link'
import { Star, MapPin, Clock, Award } from 'lucide-react'
import { therapists } from '@/data/therapists'

export default function TherapistsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Therapists
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of licensed mental health professionals is here to support you on your journey to better mental health.
          </p>
        </div>

        {/* Therapists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {therapists.map((therapist) => (
            <div key={therapist.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Therapist Image */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              </div>

              {/* Therapist Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{therapist.name}</h3>
                    <p className="text-blue-600 font-medium">{therapist.title}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">{therapist.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{therapist.reviews} reviews</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="h-4 w-4 mr-2" />
                    <span>{therapist.specialization}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{therapist.experience} experience</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{therapist.location}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {therapist.bio}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {therapist.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {therapist.specialties.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{therapist.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Languages:</h4>
                  <p className="text-sm text-gray-600">{therapist.languages.join(', ')}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Availability:</h4>
                  <p className="text-sm text-gray-600">{therapist.availability}</p>
                </div>

                <Link
                  href={`/book?therapist=${therapist.id}`}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                >
                  Book Session
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Therapy Journey?
          </h2>
          <p className="text-blue-100 mb-6">
            Find the right therapist for you and take the first step towards better mental health.
          </p>
          <Link
            href="/book"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block"
          >
            Browse All Therapists
          </Link>
        </div>
      </div>
    </div>
  )
}
