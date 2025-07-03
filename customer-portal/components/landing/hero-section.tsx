// components/landing/hero-section.tsx
import { useState } from 'react'

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">
              Get More Personal Injury Clients With{' '}
              <span className="text-yellow-400">Automated Demand Letters</span>{' '}
              That Convert
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Turn case intake into settlements 3x faster with AI-powered legal automation. 
              Join 2,500+ PI attorneys who've recovered $180M+ using our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors"
                onClick={() => window.location.href = '/sign-up'}
              >
                Start Free 14-Day Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}