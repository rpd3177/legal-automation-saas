'use client'
export const dynamic = 'force-dynamic';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✅</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Legal Automation!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your subscription is now active. You can start generating demand letters immediately.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/dashboard/integrations"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Set Up Your Integration
          </Link>
          
          <Link 
            href="/onboarding"
            className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Complete Setup
          </Link>
        </div>
        
        {sessionId && (
          <p className="text-xs text-gray-500 mt-4">
            Session ID: {sessionId}
          </p>
        )}
      </div>
    </div>
  )
}