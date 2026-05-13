'use client'

import { motion } from 'framer-motion'

const achievements = [
  { id: 'first-lesson', emoji: '🎓', title: 'First Steps', desc: 'Completed first lesson', unlocked: true, color: 'from-blue-500 to-cyan-400' },
  { id: 'streak-7', emoji: '🔥', title: '7-Day Streak', desc: '7 days in a row', unlocked: true, color: 'from-orange-500 to-red-400' },
  { id: 'speed-learner', emoji: '⚡', title: 'Speed Learner', desc: 'Finished lesson in 5 min', unlocked: true, color: 'from-yellow-500 to-amber-400' },
  { id: 'vocabulary-100', emoji: '📚', title: 'Word Master', desc: 'Learned 100 words', unlocked: false, color: 'from-primary to-purple-400' },
  { id: 'perfect-score', emoji: '🏆', title: 'Perfectionist', desc: 'Score 100% on test', unlocked: false, color: 'from-emerald-500 to-teal-400' },
  { id: 'speaking-pro', emoji: '🎙️', title: 'Speaking Pro', desc: 'AI Speaking 10 sessions', unlocked: false, color: 'from-accent to-pink-400' },
]

export default function AchievementBadges() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Achievements</h2>
        <span className="text-sm text-white/40">{achievements.filter(a => a.unlocked).length}/{achievements.length} unlocked</span>
      </div>

      <div className="glass rounded-2xl p-5 border border-white/08">
        <div className="flex flex-wrap gap-4">
          {achievements.map((badge, i) => (
            <motion.div
              key={badge.id}
              id={`badge-${badge.id}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08, type: 'spring', stiffness: 200 }}
              whileHover={badge.unlocked ? { scale: 1.1, y: -4 } : {}}
              className="relative group cursor-default"
            >
              {/* Badge circle */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
                  badge.unlocked
                    ? `bg-gradient-to-br ${badge.color} shadow-lg group-hover:shadow-neon-purple`
                    : 'bg-white/05 border border-white/08 grayscale'
                }`}
              >
                {badge.unlocked ? (
                  <>
                    {badge.emoji}
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-2xl animate-shimmer opacity-0 group-hover:opacity-100" />
                  </>
                ) : (
                  <span className="text-white/20 text-xl">🔒</span>
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-28 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="glass rounded-lg px-2 py-1.5 text-xs">
                  <div className="font-semibold text-white">{badge.title}</div>
                  <div className="text-white/50">{badge.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
