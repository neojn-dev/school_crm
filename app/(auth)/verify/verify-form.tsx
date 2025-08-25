"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export function VerifyForm() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus('error')
        setMessage('No verification token provided')
        return
      }

      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const result = await response.json()

        if (response.ok) {
          setVerificationStatus('success')
          setMessage(result.message || 'Email verified successfully!')
        } else {
          setVerificationStatus('error')
          setMessage(result.error || 'Verification failed')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setVerificationStatus('error')
        setMessage('An error occurred during verification')
      }
    }

    verifyEmail()
  }, [token])

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
            <h3 className="text-lg font-medium">Verifying your email...</h3>
            <p className="text-gray-600">Please wait while we verify your account.</p>
          </div>
        )

      case 'success':
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
            <h3 className="text-lg font-medium text-green-600">Email Verified Successfully!</h3>
            <p className="text-gray-600">{message}</p>
            <div className="pt-4">
              <Link href="/signin">
                <Button className="w-full">
                  Continue to Sign In
                </Button>
              </Link>
            </div>
          </div>
        )

      case 'error':
        return (
          <div className="text-center space-y-4">
            <XCircle className="h-12 w-12 text-red-600 mx-auto" />
            <h3 className="text-lg font-medium text-red-600">Verification Failed</h3>
            <p className="text-gray-600">{message}</p>
            <div className="space-y-2">
              <Link href="/signup">
                <Button variant="outline" className="w-full">
                  Try Signing Up Again
                </Button>
              </Link>
              <Link href="/signin">
                <Button className="w-full">
                  Go to Sign In
                </Button>
              </Link>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md card-custom">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Email Verification
          </CardTitle>
          <CardDescription>
            {verificationStatus === 'loading' 
              ? 'Verifying your email address...' 
              : verificationStatus === 'success' 
                ? 'Your email has been verified!' 
                : 'Verification failed'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  )
}

