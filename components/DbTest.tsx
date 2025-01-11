'use client'

import { useState, useEffect } from 'react'

export function DbTest() {
  const [testResult, setTestResult] = useState<string>('Testing...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/db-test')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.success) {
          setTestResult('Database connection successful!')
        } else {
          setTestResult('Database connection failed.')
        }
      } catch (err) {
        console.error('Error:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setTestResult('Error testing database connection.')
      }
    }

    fetchData()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return <div>{testResult}</div>
}

