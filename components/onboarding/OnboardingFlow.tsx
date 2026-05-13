'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Zap, ArrowRight, ArrowLeft, Check } from 'lucide-react'

const levels = [
  { id: 'beginner', label: 'Beginner', emoji: '🌱', desc: 'I know very little English' },
  { id: 'elementary', label: 'Elementary', emoji: '📖', desc: 'I know basic words and phrases' },
  { id: 'intermediate', label: 'Intermediate', emoji: '💬', desc: 'I can hold simple conversations' },
  { id: 'advanced', label: 'Advanced', emoji: '🚀', desc: 'I want to polish my fluency' },
]

const goals = [
  { id: '10', label: '10 min', emoji: '⚡', desc: 'Quick daily practice' },
  { id: '15', label: '15 min', emoji: '🎯', desc: 'Balanced learning' },
  { id: '20', label: '20 min', emoji: '💪', desc: 'Serious progress' },
  { id: '30', label: '30 min', emoji: '🏆', desc: 'Maximum results' },
]

const topics = [
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'work', label: 'Work & Career', emoji: '💼' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'food', label: 'Food & Dining', emoji: '🍕' },
  { id: 'tech', label: 'Technology', emoji: '💻' },
  { id: 'culture', label: 'Culture & Art', emoji: '🎭' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'health', label: 'Health', emoji: '🏥' },
]

const steps = ['Your Level', 'Daily Goal', 'Interests']

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
}

export default function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [level, setLevel] = useState('')
  const [goal, setGoal] = useState('')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  const goNext = () => {
    setDirection(1)
    if (step < 2) setStep((s) => s + 1)
    else router.push('/dashboard')
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => s - 1)
  }

  const toggleTopic = (id: string) =>
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )

  const canProceed =
    (step === 0 && level) ||
    (step === 1 && goal) ||
    (step === 2 && selectedTopics.length > 0)

  return (
    <div className="min-h-screen bg-navy bg-grid flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">Winglish</span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < step
                    ? 'bg-gradient-to-br from-primary to-accent text-white'
                    : i === step
                    ? 'border-2 border-primary text-primary'
                    : 'border border-white/20 text-white/30'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? 'text-white' : 'text-white/30'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-8 h-px ${i < step ? 'bg-primary' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-white/08 overflow-hidden relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {step === 0 && (
                <div>
                  <h2 className="text-2xl font-black mb-1">What's your level?</h2>
                  <p className="text-white/50 text-sm mb-6">We'll personalize your learning path.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {levels.map((l) => (
                      <button
                        id={`level-${l.id}`}
                        key={l.id}
                        onClick={() => setLevel(l.id)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                          level === l.id
                            ? 'border-primary bg-primary/15 shadow-neon-sm'
                            : 'border-white/08 bg-white/04 hover:border-white/20'
                        }`}
                      >
                        <div className="text-2xl mb-1">{l.emoji}</div>
                        <div className="font-semibold text-sm">{l.label}</div>
                        <div className="text-xs text-white/50 mt-0.5">{l.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-black mb-1">Daily goal</h2>
                  <p className="text-white/50 text-sm mb-6">How much time can you dedicate each day?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {goals.map((g) => (
                      <button
                        id={`goal-${g.id}`}
                        key={g.id}
                        onClick={() => setGoal(g.id)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                          goal === g.id
                            ? 'border-primary bg-primary/15 shadow-neon-sm'
                            : 'border-white/08 bg-white/04 hover:border-white/20'
                        }`}
                      >
                        <div className="text-2xl mb-1">{g.emoji}</div>
                        <div className="font-bold">{g.label}</div>
                        <div className="text-xs text-white/50 mt-0.5">{g.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-black mb-1">Choose your interests</h2>
                  <p className="text-white/50 text-sm mb-6">Pick topics you want to master (select multiple).</p>
                  <div className="grid grid-cols-2 gap-2">
                    {topics.map((t) => (
                      <button
                        id={`topic-${t.id}`}
                        key={t.id}
                        onClick={() => toggleTopic(t.id)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2 ${
                          selectedTopics.includes(t.id)
                            ? 'border-primary bg-primary/15 shadow-neon-sm'
                            : 'border-white/08 bg-white/04 hover:border-white/20'
                        }`}
                      >
                        <span className="text-xl">{t.emoji}</span>
                        <span className="text-sm font-medium">{t.label}</span>
                        {selectedTopics.includes(t.id) && (
                          <Check className="w-4 h-4 text-primary ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              id="onboarding-back"
              onClick={goBack}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                step === 0 ? 'invisible' : 'text-white/60 hover:text-white glass border border-white/08'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              id="onboarding-next"
              onClick={goNext}
              disabled={!canProceed}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-accent text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-200 shadow-neon-sm"
            >
              {step < 2 ? 'Continue' : 'Start Learning'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
