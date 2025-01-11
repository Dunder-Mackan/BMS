'use client'

import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { sv } from 'date-fns/locale'

interface Activity {
  id: number
  text: string
  time: string
  type: string
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('/api/activities')
        if (!response.ok) {
          throw new Error('Failed to fetch activities')
        }
        const data = await response.json()
        setActivities(data)
      } catch (error) {
        console.error('Error fetching activities:', error)
      }
    }

    fetchActivities()
  }, [])

  return (
    <ul className="space-y-4">
      {activities.map((activity) => (
        <li key={activity.id} className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-gray-900">{activity.text}</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(activity.time), { addSuffix: true, locale: sv })}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

