import { verifyMessage } from 'ethers'

export interface VerificationResult {
  isValid: boolean
  signer: string | null
  originalMessage: string
  error?: string
}

export async function verifySignature(
  message: string,
  signature: string
): Promise<VerificationResult> {
  try {
    const signer = verifyMessage(message, signature)

    return {
      isValid: true,
      signer,
      originalMessage: message,
    }
  } catch (error) {
    console.error('Signature verification error:', error)
    return {
      isValid: false,
      signer: null,
      originalMessage: message,
      error: error instanceof Error ? error.message : 'Invalid signature',
    }
  }
}
