import { describe, it, expect } from 'vitest'
import { verifySignature } from './signature-verifier.js'

describe('Signature Verifier', () => {
  it('should reject invalid signatures', async () => {
    const result = await verifySignature('test message', '0xinvalidsignature')
    expect(result.isValid).toBe(false)
    expect(result.signer).toBe(null)
  })

  it('should preserve original message', async () => {
    const message = 'test message'
    const result = await verifySignature(message, '0xinvalidsignature')
    expect(result.originalMessage).toBe(message)
  })
})
