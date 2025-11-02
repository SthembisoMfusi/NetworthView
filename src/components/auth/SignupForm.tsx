/**
 * Signup Form Component
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { SignupFormData } from '@/types'
import { validateEmail, validatePasswordStrength, validatePasswordMatch } from '@/lib/utils/validation'

interface SignupFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function SignupForm({ onSuccess, onError }: SignupFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Partial<SignupFormData & { confirmPassword?: string }>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    const newErrors: Partial<SignupFormData & { confirmPassword?: string }> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    const passwordValidation = validatePasswordStrength(formData.password)
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.requirements?.join(', ')
    }
    
    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement signup logic
      console.log('Signup not yet implemented')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed'
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>
      <button type="submit" disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400">
        {isLoading ? 'Creating account...' : 'Sign up'}
      </button>
    </form>
  )
}

