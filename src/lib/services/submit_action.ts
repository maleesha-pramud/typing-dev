'use server'

import { cookies } from 'next/headers'

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Here you would typically verify the user's credentials against your database
  // For this example, we'll just check for a dummy email/password
  if (email === 'maleeshapramud2005@gmail.com' && password === '123456') {
    // Set a cookie to indicate the user is logged in
    cookies().set('email', email, { secure: true, httpOnly: true })
    return { success: true, message: 'Login successful' }
  } else {
    return { success: false, message: 'Invalid email or password' }
  }
}