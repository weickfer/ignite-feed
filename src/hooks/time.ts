import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function useTime(date: Date, delay = 30000) {
  const [watchedDate, setWatchedDate] = useState(() => {
    return formatDistanceToNow(date, {
      locale: ptBR,
      addSuffix: true,
    })
  })

  useEffect(() => {
    let interval = setInterval(() => {
      setWatchedDate(() => {
        return formatDistanceToNow(date, {
          locale: ptBR,
          addSuffix: true,
        })
      })
    }, delay)
    
    return () => {
      clearInterval(interval)
    }
  }, [])

  return watchedDate
}