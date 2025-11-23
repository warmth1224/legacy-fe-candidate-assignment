'use client'

import { useState } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Authentication } from '@/src/components/Auth/Authentication'
import { WalletDisplay } from '@/src/components/Wallet/WalletDisplay'
import { MessageSigningForm } from '@/src/components/MessageForm/MessageSigningForm'
import { VerificationResult } from '@/src/components/Results/VerificationResult'
import { MessageHistory } from '@/src/components/History/MessageHistory'
import { useMessageHistory } from '@/src/hooks/useMessageHistory'
import { SignedMessage } from '@/src/types'
import '@/src/App.css'

export default function Home() {
  const { user } = useDynamicContext()
  const { history, addMessage, clearHistory } = useMessageHistory()
  const [selectedMessage, setSelectedMessage] = useState<SignedMessage | null>(null)

  if (!user) {
    return <Authentication />
  }

  return (
    <div className="app-content">
      <header className="app-header">
        <h1>Web3 Message Signer & Verifier</h1>
        <p>Sign messages and verify signatures with your wallet</p>
      </header>

      <main className="app-main">
        <div className="app-container">
          <div className="primary-column">
            <WalletDisplay />
            <MessageSigningForm onMessageSigned={addMessage} />
          </div>

          <div className="secondary-column">
            {selectedMessage && (
              <div className="result-section">
                <button
                  className="close-result-btn"
                  onClick={() => setSelectedMessage(null)}
                >
                  ← Back to History
                </button>
                <VerificationResult signedMessage={selectedMessage} />
              </div>
            )}

            <MessageHistory
              messages={history}
              onClearHistory={clearHistory}
              onSelectMessage={setSelectedMessage}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
