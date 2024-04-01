'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Dashboard() {
  const router = useRouter()
  return router.push('/dashboard/users')
}
