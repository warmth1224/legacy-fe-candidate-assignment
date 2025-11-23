import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface VerifySignatureRequest {
  message: string
  signature: string
}

export interface VerifySignatureResponse {
  isValid: boolean
  signer: string | null
  originalMessage: string
  error?: string
}

export async function verifySignature(
  data: VerifySignatureRequest
): Promise<VerifySignatureResponse> {
  const response = await apiClient.post('/verify-signature', data)
  return response.data
}

export default apiClient
