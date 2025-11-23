import { FormEventHandler, useState } from 'react'
import { useConnectWithOtp } from '@dynamic-labs/sdk-react-core'
import './AuthForm.css'

interface EmailAuthFormProps {
  onEmailSubmitted: (email: string) => void
}

export function EmailAuthForm({ onEmailSubmitted }: EmailAuthFormProps) {
  const { connectWithEmail } = useConnectWithOtp()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!email.trim()) {
        throw new Error('Please enter your email')
      }

      await connectWithEmail(email)
      onEmailSubmitted(email)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send OTP'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign in with Email</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={isLoading}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </button>

        <p className="form-hint">
          We'll send you a one-time password to verify your email.
        </p>
      </form>
    </div>
  )
}
