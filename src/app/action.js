'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate() {
  redirect(`/dashboard`)
}

export async function navigateToLogin(){
  redirect('/login')
}