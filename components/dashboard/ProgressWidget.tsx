'use client'

import { motion } from 'framer-motion'
import { Flame, Target, BookOpen, Star } from 'lucide-react'

const stats = [
  { icon: Flame, label: 'Day Streak', value: '7', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { icon: BookOpen, label: 'Words Learned', value: '284', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Target, label: 'Lessons Done', value: '12', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Star, label: 'Accuracy', value: '94%', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
]

export default function ProgressWidget() {
  const xp = 240
  const maxXp = 300
  const pct = Math.round((xp / maxXp) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 border border-white/08"
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold">Today's Progress</h2>
          <p className="text-sm text-white/50 mt-0.5">Keep your streak alive! 🔥</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black gradient-text">{xp} XP</div>
          <div className="text-xs text-white/40">of {maxXp} XP goal</div>
        </div>
      </div>

      {/* XP Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-white/50 mb-2">
          <span>Experience Points</span>
          <span>{pct}% complete</span>
        </div>
        <div className="h-3 bg-white/08 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent shadow-neon-sm"
          />
        </div>
        {/* Milestone markers */}
        <div className="flex justify-between mt-1">
          {[25, 50, 75, 100].map((m) => (
            <div
              key={m}
              className={`text-xs ${pct >= m ? 'text-primary' : 'text-white/20'}`}
            >
              {m}%
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
            className="bg-white/04 rounded-xl p-3 border border-white/06"
          >
            <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-xs text-white/40">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
