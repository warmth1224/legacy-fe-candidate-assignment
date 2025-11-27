import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { verifySignatureRouter } from './routes/verify-signature.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000'

app.use(express.json())
app.use(cors({ origin: corsOrigin }))

app.use('/api/verify-signature', verifySignatureRouter)

app.get('/health', (_, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
