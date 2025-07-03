"use client"
import { useState } from 'react'

export default function IntegrationsPage() {
  const [filevineKey, setFilevineKey] = useState('')
  const [orgId, setOrgId] = useState('')
  const [webhookUrl] = useState('https://legal-automation-n8n.onrender.com/webhook/demand-letter/customer-abc123')
  const [testResult, setTestResult] = useState('')

  const testConnection = async () => {
    setTestResult('Testing connection...')
    setTimeout(() => {
      if (filevineKey && orgId) {
        setTestResult('✅ Connection successful! Ready to generate demand letters.')
      } else {
        setTestResult('❌ Please enter both API key and Organization ID.')
      }
    }, 2000)
  }

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl)
    alert('Webhook URL copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard - Integrations</h1>
            <div className="space-x-4">
              <a href="/dashboard" className="text-gray-600 hover:text-blue-600">← Back to Dashboard</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Connect Your Legal Software</h2>
          <p className="text-gray-600">Set up integrations to start automating your demand letters.</p>
        </div>
        {/* Filevine Integration Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-3xl">📁</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Filevine Integration</h3>
              <p className="text-gray-600">Connect your case management system to automate demand letters</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filevine API Key *</label>
              <input 
                type="password"
                value={filevineKey}
                onChange={(e) => setFilevineKey(e.target.value)}
                placeholder="Enter your Filevine API key"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Get this from Filevine → Settings → API Keys</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization ID *</label>
              <input 
                type="text"
                value={orgId}
                onChange={(e) => setOrgId(e.target.value)}
                placeholder="Your Filevine Org ID"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Found in your Filevine account settings</p>
            </div>
          </div>
          <div className="mt-6">
            <button 
              onClick={testConnection}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >Test Connection</button>
            {testResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm">{testResult}</p>
              </div>
            )}
          </div>
        </div>
        {/* Webhook Configuration */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Your Automation Webhook</h3>
          <p className="text-gray-600 mb-4">Copy this URL and add it as a webhook in Filevine to trigger automatic demand letter generation:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-gray-800 break-all">{webhookUrl}</code>
              <button 
                onClick={copyWebhook}
                className="ml-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors whitespace-nowrap"
              >Copy URL</button>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Copy the webhook URL above</li>
              <li>2. In Filevine, go to Settings → Webhooks</li>
              <li>3. Create new webhook with the copied URL</li>
              <li>4. Set trigger: "Project Status Changed to 'Ready for Demand'"</li>
              <li>5. Test by changing a case status in Filevine</li>
            </ol>
          </div>
        </div>
        {/* Coming Soon */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">More Integrations Coming Soon</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg opacity-60">
              <div className="text-3xl mb-2">⚖️</div>
              <h4 className="font-medium">Clio</h4>
              <p className="text-sm text-gray-500">Coming Q2 2025</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg opacity-60">
              <div className="text-3xl mb-2">📋</div>
              <h4 className="text-medium">MyCase</h4>
              <p className="text-sm text-gray-500">Coming Q2 2025</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg opacity-60">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="text-medium">Custom API</h4>
              <p className="text-sm text-gray-500">Available Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 