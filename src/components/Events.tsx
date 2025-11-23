'use client'

import { useEffect, useState } from 'react'

interface CalendarEvent {
  id?: string
  summary?: string
  description?: string
  start?: { dateTime?: string }
  end?: { dateTime?: string }
}


export default function Events() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err))
  }, [])
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.summary}</h2>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  )
}