import { SignedMessage } from '../../types'
import './MessageHistory.css'

interface MessageHistoryProps {
  messages: SignedMessage[]
  onClearHistory: () => void
  onSelectMessage: (message: SignedMessage) => void
}

export function MessageHistory({
  messages,
  onClearHistory,
  onSelectMessage,
}: MessageHistoryProps) {
  if (messages.length === 0) {
    return (
      <div className="message-history empty">
        <div className="empty-state">
          <p>No messages signed yet</p>
          <p className="empty-hint">Sign a message to see it here</p>
        </div>
      </div>
    )
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`

    return date.toLocaleDateString()
  }

  return (
    <div className="message-history">
      <div className="history-header">
        <h2>Message History</h2>
        {messages.length > 0 && (
          <button className="clear-btn" onClick={onClearHistory}>
            Clear History
          </button>
        )}
      </div>

      <div className="history-list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`history-item ${msg.isValid ? 'valid' : 'invalid'}`}
            onClick={() => onSelectMessage(msg)}
          >
            <div className="item-header">
              <div className="item-status">
                {msg.isValid ? (
                  <span className="status-icon valid">✓</span>
                ) : (
                  <span className="status-icon invalid">✗</span>
                )}
              </div>
              <div className="item-title">
                <p className="message-preview">
                  {msg.message.length > 60
                    ? `${msg.message.substring(0, 60)}...`
                    : msg.message}
                </p>
                <p className="item-time">{formatTime(msg.timestamp)}</p>
              </div>
            </div>
            {msg.signer && (
              <div className="item-signer">
                <code>
                  {msg.signer.slice(0, 6)}...{msg.signer.slice(-4)}
                </code>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="history-hint">Click a message to view details</p>
    </div>
  )
}
