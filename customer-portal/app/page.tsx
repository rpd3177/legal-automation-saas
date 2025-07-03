'use client'
import Link from 'next/link'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function HomePage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (priceId: string, planName: string) => {
    setLoading(planName)
    
    try {
      const stripe = await stripePromise
      if (!stripe) {
        alert('Stripe is not loaded. Please contact support.')
        setLoading(null)
        return
      }
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          customerEmail: 'customer@example.com' // Replace with actual customer email later
        }),
      })

      const { sessionId } = await response.json()
      
      const result = await stripe?.redirectToCheckout({
        sessionId: sessionId,
      })

      if (result?.error) {
        console.error(result.error.message)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-900">
              Legal Automation
            </div>
            <div className="space-x-4">
              <Link 
                href="/sign-in"
                className="text-gray-600 hover:text-blue-900"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Get More Personal Injury Clients With{' '}
              <span className="text-yellow-400">Automated Demand Letters</span>{' '}
              That Convert
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Turn case intake into settlements 3x faster with AI-powered legal automation. 
              Join 2,500+ PI attorneys who've recovered $180M+ using our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300"
                onClick={() => window.location.href = '/sign-up'}
              >
                Start Free 14-Day Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                Watch 2-Min Demo
              </button>
            </div>
            <div className="flex items-center justify-center mt-6 space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span>🛡️</span>
                <span>SOC 2 Type II Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔒</span>
                <span>HIPAA Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✅</span>
                <span>Bar Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why 2,500+ Attorneys Choose Our Platform</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Save 20+ Hours Per Week</h3>
              <p className="text-gray-600">Generate professional demand letters in minutes, not hours. Focus on winning cases, not paperwork.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Increase Settlements by 340%</h3>
              <p className="text-gray-600">AI-powered templates proven to maximize settlement values and negotiation outcomes.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Filevine Integration</h3>
              <p className="text-gray-600">Works directly with your existing case management system. No data entry required.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your practice. All plans include 14-day free trial.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-4xl font-bold mb-2">$297<span className="text-lg font-normal">/month</span></div>
              <p className="text-gray-600 mb-6">Perfect for solo practitioners</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>50 demand letters/month</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Basic AI templates</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Email support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Filevine integration</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Usage analytics</span>
                </li>
              </ul>
              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                onClick={() => handleCheckout('price_1RgFqMRoZGA8P6RHZuZH3Kd7', 'Starter')}
                disabled={loading === 'Starter'}
              >
                {loading === 'Starter' ? 'Loading...' : 'Choose Starter'}
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <div className="text-4xl font-bold mb-2">$497<span className="text-lg font-normal">/month</span></div>
              <p className="text-gray-600 mb-6">Best for growing firms</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>150 demand letters/month</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Advanced AI templates</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>All integrations</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Team collaboration</span>
                </li>
              </ul>
              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                onClick={() => handleCheckout('price_1RgFsIRoZGA8P6RHx9sYG398', 'Professional')}
                disabled={loading === 'Professional'}
              >
                {loading === 'Professional' ? 'Loading...' : 'Choose Professional'}
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-2">$997<span className="text-lg font-normal">/month</span></div>
              <p className="text-gray-600 mb-6">For large practices</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Unlimited demand letters</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Custom AI templates</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>API access</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>White-label option</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✅</span>
                  <span>Custom integrations</span>
                </li>
              </ul>
              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                onClick={() => handleCheckout('price_1RgFuSRoZGA8P6RHJBZlqClR', 'Enterprise')}
                disabled={loading === 'Enterprise'}
              >
                {loading === 'Enterprise' ? 'Loading...' : 'Choose Enterprise'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a 
              href="/dashboard/integrations"
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-center"
            >
              🔗 Set Up Filevine Integration
            </a>
            <button className="block w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors">
              ⚡ Generate Test Demand Letter
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">Legal Automation</div>
          <p className="text-gray-400 mb-8">Empowering personal injury attorneys with AI-powered automation</p>
          <div className="flex justify-center space-x-8 text-sm">
            <Link href="/privacy" className="hover:text-yellow-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-yellow-400">Terms of Service</Link>
            <Link href="/contact" className="hover:text-yellow-400">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}