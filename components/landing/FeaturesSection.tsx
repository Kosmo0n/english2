'use client'

import { motion } from 'framer-motion'
import { Mic, Zap, BookOpen, Brain, Globe, Award } from 'lucide-react'

const features = [
  {
    id: 'ai-speaking',
    icon: Mic,
    title: 'AI Speaking Coach',
    description: 'Practice speaking with our advanced AI tutor that understands context, corrects pronunciation, and gives real-time feedback.',
    color: 'from-primary to-purple-400',
    glow: 'hover:shadow-neon-purple',
    border: 'hover:border-primary/50',
    tag: 'Most Popular',
  },
  {
    id: 'instant-feedback',
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Get detailed corrections and explanations the moment you make a mistake. Learn faster with AI-powered insights.',
    color: 'from-accent to-pink-400',
    glow: 'hover:shadow-neon-pink',
    border: 'hover:border-accent/50',
    tag: 'AI Powered',
  },
  {
    id: 'topic-learning',
    icon: BookOpen,
    title: 'Topic-Based Learning',
    description: 'Master English in contexts you actually use — travel, business, shopping, dining, and 200+ real-life scenarios.',
    color: 'from-blue-500 to-cyan-400',
    glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]',
    border: 'hover:border-blue-500/50',
    tag: '200+ Topics',
  },
  {
    id: 'brain-training',
    icon: Brain,
    title: 'Smart Vocabulary',
    description: 'Our spaced repetition system ensures you remember every word permanently using scientifically proven techniques.',
    color: 'from-emerald-500 to-teal-400',
    glow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]',
    border: 'hover:border-emerald-500/50',
    tag: 'Science-Based',
  },
  {
    id: 'global-community',
    icon: Globe,
    title: 'Global Community',
    description: 'Join 50,000+ learners worldwide. Compete on leaderboards and celebrate milestones together.',
    color: 'from-orange-500 to-amber-400',
    glow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]',
    border: 'hover:border-orange-500/50',
    tag: '50K+ Users',
  },
  {
    id: 'achievements',
    icon: Award,
    title: 'Achievements & Streaks',
    description: 'Stay motivated with daily streaks, XP points, achievement badges, and personalized learning milestones.',
    color: 'from-yellow-500 to-amber-300',
    glow: 'hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]',
    border: 'hover:border-yellow-500/50',
    tag: 'Gamified',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
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
            <Zap className="w-4 h-4 text-primary" />
            Everything you need to succeed
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Features that make you{' '}
            <span className="gradient-text">fluent faster</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Combining cutting-edge AI with proven learning science to deliver the most effective English learning experience.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              id={`feature-${feature.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`group glass rounded-2xl p-6 border border-white/08 cursor-default transition-all duration-300 ${feature.glow} ${feature.border}`}
            >
              {/* Tag */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/05 text-white/60 border border-white/08">
                  {feature.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{feature.description}</p>

              {/* Bottom glow line */}
              <div className={`mt-4 h-px bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
