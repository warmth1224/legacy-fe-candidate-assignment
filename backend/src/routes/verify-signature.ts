import { Router, Request, Response } from 'express'
import { verifySignature } from '../services/signature-verifier.js'

export const verifySignatureRouter = Router()

interface VerifySignatureRequest {
  message: string
  signature: string
}

verifySignatureRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { message, signature } = req.body as VerifySignatureRequest

    if (!message || !signature) {
      res.status(400).json({ error: 'Missing message or signature' })
      return
    }

    const result = await verifySignature(message, signature)

    res.json(result)
  } catch (error) {
    console.error('Verification error:', error)
    res.status(500).json({ 
      error: 'Verification failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})
