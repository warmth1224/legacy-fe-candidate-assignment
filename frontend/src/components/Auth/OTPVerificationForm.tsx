import { FormEventHandler, useState } from 'react'
import { useConnectWithOtp } from '@dynamic-labs/sdk-react-core'
import './AuthForm.css'

interface OTPVerificationFormProps {
  email: string
  onOtpSubmitted: () => void
  onBack: () => void
}

export function OTPVerificationForm({
  email,
  onOtpSubmitted,
  onBack,
}: OTPVerificationFormProps) {
  const { verifyOneTimePassword } = useConnectWithOtp()
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!otp.trim() || otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit code')
      }

      await verifyOneTimePassword(otp)
      onOtpSubmitted()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid OTP'
      setError(message)
      setOtp('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Verify Your Email</h2>
        
        <p className="form-subtitle">
          We sent a code to <strong>{email}</strong>
        </p>

        <div className="form-group">
          <label htmlFor="otp">One-Time Password</label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            maxLength={6}
            disabled={isLoading}
            required
            className="otp-input"
          />
          <p className="form-hint">Enter the 6-digit code</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>

        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="back-btn"
        >
          Back
        </button>
      </form>
    </div>
  )
}
