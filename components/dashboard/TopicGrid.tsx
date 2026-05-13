'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'

import { topics } from '@/lib/data'

function ProgressRing({ progress, size = 52, id }: { progress: number; size?: number; id: string }) {
  const radius = (size - 6) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="progress-ring">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="3"
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={`url(#grad-${id})`}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
        className="progress-ring-circle"
      />
      <defs>
        <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7B61FF" />
          <stop offset="100%" stopColor="#FF4DCE" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function TopicGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Your Topics</h2>
        <Link
          href="/dashboard/topics"
          className="text-sm text-primary hover:text-primary-light transition-colors flex items-center gap-1"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.id}
            id={`topic-card-${topic.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={topic.locked ? {} : { y: -4, scale: 1.01 }}
            className={`glass rounded-2xl p-5 border border-white/08 transition-all duration-300 ${
              topic.locked
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:border-primary/30 hover:shadow-neon-sm cursor-pointer'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {topic.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight">{topic.title}</h3>
                  <p className="text-xs text-white/40 mt-0.5">
                    {topic.lessons}/{topic.totalLessons} lessons
                  </p>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <ProgressRing progress={topic.progress} id={topic.id} />
                <span className="absolute text-xs font-bold">{topic.progress}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-white/08 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${topic.progress}%` }}
                transition={{ duration: 1, delay: 0.3 + i * 0.07 }}
                className={`h-full rounded-full bg-gradient-to-r ${topic.color}`}
              />
            </div>

            {/* Action */}
            {topic.locked ? (
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Lock className="w-3 h-3" />
                Unlock with Standard plan
              </div>
            ) : (
              <Link
                href={`/dashboard/lesson/${topic.id}`}
                className="flex items-center gap-2 text-xs font-medium text-primary hover:text-primary-light transition-colors group"
              >
                {topic.progress === 0 ? 'Start Topic' : topic.progress === 100 ? 'Review' : 'Continue'}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
