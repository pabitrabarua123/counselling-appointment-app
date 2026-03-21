'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SignIn() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmit(true);
    try {
      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (res?.error) {
        setError('Invalid credentials')
        setSubmit(false)
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (error) {
      setError(`An error occurred - ${error}`)
      setSubmit(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      
      {/* LEFT SIDE - FORM */}
      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-6">

          {/* Logo */}
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-15 w-15 items-center justify-center text-white text-xl font-bold">
              <Image src="/logo.png" width={60} height={60} alt='TalkCure'/>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Counsellor Login
            </h2>
            <p className="text-sm text-gray-500">
              Access your dashboard and manage your sessions
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember me
              </label>
              <a href="#" className="text-theme hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={submit}
              className="w-full rounded-lg bg-[#009688] py-2 font-medium text-white hover:bg-[#057f74] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#009688]"
            >
              { submit ? 'Signing in...' : 'Sign in'} 
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/auth/signup" className="text-theme hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - IMAGE / MESSAGE */}
      <div className="relative hidden lg:flex lg:w-1/2">
        
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1493836512294-502baa1986e2"
          alt="Therapy"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"></div>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Empower lives through conversation
          </h2>
          <p className="max-w-md text-lg text-gray-200">
           Join a platform designed to support your work as a mental health professional—connect with clients, manage sessions with ease, and focus on delivering meaningful care.
          </p>
        </div>
      </div>
    </div>
  )
}