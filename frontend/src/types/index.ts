export interface SignedMessage {
  id: string
  message: string
  signature: string
  timestamp: number
  isValid: boolean
  signer: string | null
}

export interface DynamicUser {
  userId: string
  email?: string
  verified?: boolean
  walletAddress?: string
}
