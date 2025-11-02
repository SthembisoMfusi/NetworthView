/**
 * Login Form Component
 * 
 * Displays a login form for user authentication.
 * Handles email and password input with validation.
 * Integrates with NextAuth for authentication.
 */

'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { LoginFormData } from '@/types'
import { validateEmail } from '@/lib/utils/validation'

interface LoginFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

/**
 * Login Form Component
 * 
 * @param onSuccess - Callback when login is successful
 * @param onError - Callback when login fails
 */
export default function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    // Client-side validation
    const newErrors: Partial<LoginFormData> = {}
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement login logic
      // const result = await signIn('credentials', {
      //   email: formData.email,
      //   password: formData.password,
      //   redirect: false
      // })
      
      // if (result?.error) {
      //   setErrors({ password: 'Invalid email or password' })
      //   onError?.(result.error)
      // } else {
      //   onSuccess?.()
      //   router.push('/dashboard')
      // }
      
      console.log('Login not yet implemented')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setErrors({ password: errorMessage })
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  )
}

