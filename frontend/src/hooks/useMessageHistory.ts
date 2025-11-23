import { useState, useEffect } from 'react'
import { SignedMessage } from '../types'

const STORAGE_KEY = 'messageHistory'

export function useMessageHistory() {
  const [history, setHistory] = useState<SignedMessage[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SignedMessage[]
        setHistory(parsed.sort((a, b) => b.timestamp - a.timestamp))
      } catch {
        setHistory([])
      }
    }
    setIsLoaded(true)
  }, [])

  const addMessage = (message: SignedMessage) => {
    const updated = [message, ...history]
    setHistory(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const removeMessage = (id: string) => {
    const updated = history.filter((msg) => msg.id !== id)
    setHistory(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return {
    history,
    isLoaded,
    addMessage,
    clearHistory,
    removeMessage,
  }
}
