'use client'

import { useEffect, useState } from 'react'
export default function Events() {
  const [events, setEvents] = useState([])
  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err))
  }, [])
  return (
    <div>
      {events.map((event: any) => (
        <div key={event.id}>
          <h2>{event.summary}</h2>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  )
}