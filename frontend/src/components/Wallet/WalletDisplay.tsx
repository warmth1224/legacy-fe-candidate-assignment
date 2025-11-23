import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import './WalletDisplay.css'

export function WalletDisplay() {
  const { user, primaryWallet, handleLogOut } = useDynamicContext()

  if (!user || !primaryWallet) {
    return null
  }

  const walletAddress = primaryWallet.address

  return (
    <div className="wallet-display">
      <div className="wallet-info">
        <div className="wallet-section">
          <h3>Wallet Address</h3>
          <div className="wallet-address">
            <code>{walletAddress}</code>
            <button
              className="copy-btn"
              onClick={() => {
                if (walletAddress) {
                  navigator.clipboard.writeText(walletAddress)
                }
              }}
              title="Copy address"
            >
              📋
            </button>
          </div>
        </div>

        {user.email && (
          <div className="wallet-section">
            <h3>Email</h3>
            <p className="email">{user.email}</p>
          </div>
        )}

        {user.userId && (
          <div className="wallet-section">
            <h3>User ID</h3>
            <code className="user-id">{user.userId}</code>
          </div>
        )}
      </div>

      <div className="wallet-actions">
        <button className="disconnect-btn" onClick={handleLogOut}>
          Disconnect Wallet
        </button>
      </div>
    </div>
  )
}
