'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Star, TrendingUp, MessageCircle, BookOpen } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

function FloatingCard({
  className,
  children,
  delay = 0,
}: {
  className?: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`glass rounded-2xl p-4 shadow-glass ${className}`}
      style={{
        animation: `float ${5 + delay}s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-grid bg-radial-glow overflow-hidden pt-20">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm text-primary-light mb-6"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>AI-Powered English Learning</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
            >
              Learn English Through{' '}
              <span className="gradient-text">Real-Life</span>{' '}
              Communication
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl"
            >
              Master English with AI-powered speaking practice, instant feedback, and
              topic-based lessons designed for real conversations.
            </motion.p>

            {/* Stats */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-6 mb-10"
            >
              {[
                { value: '50K+', label: 'Active Learners' },
                { value: '200+', label: 'Topics' },
                { value: '4.9★', label: 'Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-white/50">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              <Link
                id="hero-get-started"
                href="/onboarding"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-neon-purple hover:shadow-neon-pink hover:scale-105 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                id="hero-watch-demo"
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl glass border border-white/10 text-white font-semibold hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
              >
                <Play className="w-4 h-4 text-primary" />
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Right: 3D Illustration */}
          <div className="relative h-[520px] hidden lg:block">
            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72"
            >
              <div className="glass rounded-3xl p-6 shadow-glass animate-float border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Daily Progress</div>
                    <div className="text-xs text-white/50">Today's XP</div>
                  </div>
                </div>
                {/* XP Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>Experience</span>
                    <span>240 / 300 XP</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Streak', value: '7🔥' },
                    { label: 'Words', value: '34' },
                    { label: 'Score', value: '98%' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/05 rounded-xl p-2 text-center">
                      <div className="text-sm font-bold">{s.value}</div>
                      <div className="text-xs text-white/40">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating vocabulary card */}
            <FloatingCard
              className="absolute top-8 right-0 w-52 border border-primary/20"
              delay={0.6}
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs text-white/60">New Word</span>
              </div>
              <div className="text-lg font-bold mb-1">Elaborate</div>
              <div className="text-xs text-white/50 italic">/ ɪˈlæb.ər.ət /</div>
              <div className="text-xs text-white/70 mt-2">To explain in detail</div>
            </FloatingCard>

            {/* Floating chat card */}
            <FloatingCard
              className="absolute bottom-12 right-4 w-56 border border-accent/20"
              delay={1}
            >
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-4 h-4 text-accent" />
                <span className="text-xs text-white/60">AI Speaking</span>
                <span className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse" />
              </div>
              <div className="text-xs text-white/80 bg-white/05 rounded-xl px-3 py-2 mb-2">
                "Tell me about your weekend plans..."
              </div>
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-primary to-accent"
                    style={{
                      height: `${Math.random() * 20 + 8}px`,
                      animation: `wave-bar 1.5s ease-in-out ${i * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            </FloatingCard>

            {/* Floating streak card */}
            <FloatingCard
              className="absolute top-20 left-0 w-40 border border-yellow-500/20"
              delay={0.3}
            >
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-lg font-bold">7 Day Streak</div>
              <div className="text-xs text-white/50">Keep it going!</div>
            </FloatingCard>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
    </section>
  )
}
