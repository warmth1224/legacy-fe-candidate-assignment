import { useState } from 'react'
import { EmailAuthForm } from './EmailAuthForm'
import { OTPVerificationForm } from './OTPVerificationForm'

type AuthStep = 'email' | 'otp'

export function Authentication() {
  const [step, setStep] = useState<AuthStep>('email')
  const [email, setEmail] = useState('')

  const handleEmailSubmitted = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setStep('otp')
  }

  const handleOtpSubmitted = () => {
    setStep('email')
    setEmail('')
  }

  const handleBack = () => {
    setStep('email')
    setEmail('')
  }

  return (
    <>
      {step === 'email' ? (
        <EmailAuthForm onEmailSubmitted={handleEmailSubmitted} />
      ) : (
        <OTPVerificationForm
          email={email}
          onOtpSubmitted={handleOtpSubmitted}
          onBack={handleBack}
        />
      )}
    </>
  )
}
