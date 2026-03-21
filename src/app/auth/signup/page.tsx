"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [modal, openModal] = useState(false);
  const [toc, setToc] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!toc){
      alert('Please accept terms and condition');
      return;
    }
    setError(null)

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields")
      return
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      })

      if (!res.ok) {
        const text = await res.text()
        setError(text || 'Failed to register')
        setLoading(false)
        return
      }

      // On success, redirect to sign-in
      router.push('/auth/signin')
    } catch (err) {
      setError(`An unexpected error occurred - ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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
              Join as a Counsellor
            </h2>
            <p className="text-sm text-gray-500">
              Start helping clients and manage your therapy sessions securely
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
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
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm text-gray-600">
  <input
    type="checkbox"
    checked={toc}
    onChange={() => setToc((prev) => !prev)}
    className="mt-1 rounded border-gray-300"
  />

  <p>
    I agree to the{" "}
    <span
      onClick={(e) => {
        e.preventDefault();
        openModal(true);
      }}
      className="cursor-pointer text-theme hover:underline"
    >
      Terms & Conditions
    </span>
  </p>
</div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#009688] py-2 font-medium text-white hover:bg-[#057f74] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#009688]"
            >
              { loading ? 'Creating account...' : 'Create Account'} 
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-theme hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - IMAGE / MESSAGE */}
      <div className="relative hidden lg:flex lg:w-1/2">
        
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb"
          alt="Therapy"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"></div>

        {/* Text */}
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
    <SignupSuccessModal open={modal} onClose={() => openModal(false)} setToc={() => setToc(true)}/>
    </>
  )
}

const SignupSuccessModal = ({ open, onClose, setToc } : {open: boolean, onClose: () => void, setToc: () => void }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      
      {/* Modal Box */}
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl animate-fadeIn">
        
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <span className="text-2xl">🎉</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900">
          Welcome to your safe space
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm text-gray-600">
          By creating an account, you agree to use this platform responsibly and respectfully. 
Our services are designed to support your mental well-being, but they do not replace 
emergency medical care or crisis intervention. All interactions with therapists are 
confidential and handled with care, but we encourage you to avoid sharing highly 
sensitive personal information unless necessary. 
<br/>
By continuing, you agree to our Terms & Conditions and Privacy Policy, and consent to 
the secure processing of your data to provide a safe and supportive experience.
        </p>

        {/* Actions */}
        <div className="mt-6 space-y-2">
          
          <button
            onClick={() => {onClose(); setToc();}}
            className="cursor-pointer w-full rounded-lg bg-[#009688] py-2 font-medium text-white hover:bg-[#057f74]"
          >
            I accept it
          </button>

          <button
            onClick={onClose}
            className="w-full text-sm text-gray-500 hover:underline"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}