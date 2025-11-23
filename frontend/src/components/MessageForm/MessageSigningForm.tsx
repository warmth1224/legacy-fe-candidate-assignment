import { FormEventHandler, useState } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { verifySignature } from '../../services/api'
import { SignedMessage } from '../../types'
import './MessageSigningForm.css'

interface MessageSigningFormProps {
  onMessageSigned: (signedMessage: SignedMessage) => void
}

export function MessageSigningForm({ onMessageSigned }: MessageSigningFormProps) {
  const { primaryWallet } = useDynamicContext()
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!message.trim()) {
        throw new Error('Please enter a message')
      }

      if (!primaryWallet) {
        throw new Error('Wallet not connected')
      }

      const signature = await primaryWallet.signMessage(message)

      if (!signature) {
        throw new Error('Failed to sign message')
      }

      const result = await verifySignature({
        message,
        signature,
      })

      const signedMessage: SignedMessage = {
        id: Date.now().toString(),
        message,
        signature,
        timestamp: Date.now(),
        isValid: result.isValid,
        signer: result.signer,
      }

      onMessageSigned(signedMessage)
      setMessage('')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to sign message'
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="message-signing-container">
      <form onSubmit={handleSubmit} className="message-signing-form">
        <h2>Sign a Message</h2>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter the message you want to sign..."
            disabled={isLoading}
            required
            rows={5}
            maxLength={1000}
          />
          <div className="char-count">
            {message.length} / 1000 characters
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isLoading} className="sign-btn">
          {isLoading ? 'Signing Message...' : 'Sign Message'}
        </button>

        <p className="form-hint">
          Your message will be signed with your wallet and verified by our backend.
        </p>
      </form>
    </div>
  )
}
