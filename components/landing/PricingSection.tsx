'use client'

import { motion } from 'framer-motion'
import { Check, Star, Crown, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    id: 'free',
    name: 'Free',
    icon: Zap,
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    color: 'text-white/70',
    borderColor: 'border-white/10',
    buttonClass: 'border border-white/20 text-white hover:border-primary/40 hover:bg-primary/10',
    features: [
      '5 lessons per day',
      'Basic vocabulary cards',
      'Community access',
      '3 topics available',
      'Progress tracking',
    ],
    missing: ['AI Speaking practice', 'Unlimited lessons', 'Priority support'],
    featured: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    icon: Star,
    price: '$9',
    period: 'per month',
    description: 'For serious learners',
    color: 'gradient-text',
    borderColor: 'border-primary/40',
    buttonClass: 'bg-gradient-to-r from-primary to-accent text-white shadow-neon-purple hover:shadow-neon-pink hover:opacity-90',
    features: [
      'Unlimited lessons',
      'All 200+ topics',
      'AI Speaking (10 min/day)',
      'Instant feedback',
      'Progress analytics',
      'Achievements & streaks',
    ],
    missing: ['Unlimited AI Speaking', 'Human tutor sessions'],
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Crown,
    price: '$19',
    period: 'per month',
    description: 'The ultimate experience',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    buttonClass: 'border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10',
    features: [
      'Everything in Standard',
      'Unlimited AI Speaking',
      'Human tutor sessions (2/mo)',
      'Custom learning path',
      'Offline mode',
      'Priority support 24/7',
      'Certificate of completion',
    ],
    missing: [],
    featured: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-white/60 mb-4">
            <Crown className="w-4 h-4 text-yellow-400" />
            Simple, transparent pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Choose your{' '}
            <span className="gradient-text">learning plan</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Start free and upgrade when you're ready. Cancel anytime.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              id={`pricing-${plan.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: plan.featured ? -4 : -6 }}
              className={`relative glass rounded-3xl p-8 border transition-all duration-300 ${plan.borderColor} ${
                plan.featured ? 'md:-mt-4 md:mb-4 shadow-neon-purple animate-pulse-glow' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold shadow-neon-purple whitespace-nowrap">
                  ⭐ Most Popular
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  plan.featured ? 'bg-gradient-to-br from-primary to-accent' :
                  plan.id === 'premium' ? 'bg-gradient-to-br from-yellow-500 to-amber-300' :
                  'bg-white/10'
                }`}>
                  <plan.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className={`font-bold text-lg ${plan.featured ? 'gradient-text' : plan.id === 'premium' ? 'text-yellow-400' : 'text-white'}`}>
                    {plan.name}
                  </div>
                  <div className="text-xs text-white/50">{plan.description}</div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className="text-white/50 ml-1">/{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/onboarding"
                className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.buttonClass}`}
              >
                {plan.id === 'free' ? 'Start Free' : `Get ${plan.name}`}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-white/40 mt-10"
        >
          No credit card required for Free plan · Secure payments via Stripe · Cancel anytime
        </motion.p>
      </div>
    </section>
  )
}
