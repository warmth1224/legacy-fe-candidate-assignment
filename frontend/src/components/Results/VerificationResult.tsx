import { SignedMessage } from '../../types'
import './VerificationResult.css'

interface VerificationResultProps {
  signedMessage: SignedMessage
}

export function VerificationResult({ signedMessage }: VerificationResultProps) {
  const { message, signature, isValid, signer, timestamp } = signedMessage

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className={`verification-result ${isValid ? 'valid' : 'invalid'}`}>
      <div className="result-header">
        <div className={`status-badge ${isValid ? 'valid' : 'invalid'}`}>
          {isValid ? '✓ Valid Signature' : '✗ Invalid Signature'}
        </div>
        <p className="timestamp">{formatTime(timestamp)}</p>
      </div>

      <div className="result-content">
        <div className="result-section">
          <h4>Message</h4>
          <div className="result-value message-value">{message}</div>
        </div>

        {signer && (
          <div className="result-section">
            <h4>Signer Address</h4>
            <div className="result-value">
              <code>{signer}</code>
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(signer)}
                title="Copy signer address"
              >
                📋
              </button>
            </div>
          </div>
        )}

        <div className="result-section">
          <h4>Signature</h4>
          <div className="result-value signature-value">
            <code>{signature}</code>
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(signature)}
              title="Copy signature"
            >
              📋
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
