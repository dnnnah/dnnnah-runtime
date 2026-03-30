'use client'

import { useState } from 'react'

/**
 * Hook del formulario de contacto.
 * Maneja: estado, validación client-side, submit y success state.
 */

interface FormData {
  name:    string
  email:   string
  subject: string
  message: string
}

interface FormErrors {
  name?:    string
  email?:   string
  message?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const INITIAL_DATA: FormData = {
  name:    '',
  email:   '',
  subject: '',
  message: '',
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'name is required'
  }

  if (!data.email.trim()) {
    errors.email = 'email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'invalid email format'
  }

  if (!data.message.trim()) {
    errors.message = 'message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'message too short — min 10 chars'
  }

  return errors
}

export function useContactForm() {
  const [data,   setData]   = useState<FormData>(INITIAL_DATA)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  function handleChange(field: keyof FormData, value: string) {
    setData(d => ({ ...d, [field]: value }))
    // Limpia el error del campo cuando el usuario escribe
    if (errors[field as keyof FormErrors]) {
      setErrors(e => ({ ...e, [field]: undefined }))
    }
  }

  async function handleSubmit() {
    // Validación client-side
    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, website: '' }),
      })

      if (!res.ok) throw new Error('send failed')

      setStatus('success')
      setData(INITIAL_DATA)
    } catch {
      setStatus('error')
      // Vuelve a idle después de 3s para permitir reintento
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  function reset() {
    setData(INITIAL_DATA)
    setErrors({})
    setStatus('idle')
  }

  return { data, errors, status, handleChange, handleSubmit, reset }
}