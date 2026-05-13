'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import LessonStepper from '@/components/lesson/LessonStepper'
import VocabularyStep from '@/components/lesson/VocabularyStep'
import ListeningStep from '@/components/lesson/ListeningStep'
import PracticeStep from '@/components/lesson/PracticeStep'
import AISpeakingStep from '@/components/lesson/AISpeakingStep'
import FinalTestStep from '@/components/lesson/FinalTestStep'

const STEP_COMPONENTS = [VocabularyStep, ListeningStep, PracticeStep, AISpeakingStep, FinalTestStep]

const topicMeta: Record<string, { title: string; emoji: string; color: string }> = {
  travel:   { title: 'Travel & Tourism',  emoji: '✈️', color: 'from-blue-600 to-cyan-500' },
  work:     { title: 'Work & Career',     emoji: '💼', color: 'from-primary to-purple-400' },
  shopping: { title: 'Shopping',          emoji: '🛍️', color: 'from-accent to-pink-400' },
  food:     { title: 'Food & Dining',     emoji: '🍕', color: 'from-orange-500 to-amber-400' },
  tech:     { title: 'Technology',        emoji: '💻', color: 'from-emerald-500 to-teal-400' },
}

export default function LessonPage({ params }: { params: { topic: string } }) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  const meta = topicMeta[params.topic] ?? { title: params.topic, emoji: '📖', color: 'from-primary to-accent' }
  const StepComponent = STEP_COMPONENTS[step]

  const handleComplete = () => {
    if (step < STEP_COMPONENTS.length - 1) {
      setDirection(1)
      setStep(s => s + 1)
    }
  }

  return (
    <div className="min-h-screen bg-navy bg-grid">
      {/* Top bar */}
      <div className="glass-dark border-b border-white/06 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" id="lesson-back"
            className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white border border-white/08 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">{meta.emoji}</span>
            <div>
              <div className="font-semibold text-sm">{meta.title}</div>
              <div className="text-xs text-white/40">Lesson 1</div>
            </div>
          </div>
          <div className="ml-auto">
            <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${meta.color} text-white`}>
              Step {step + 1}/5
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Stepper */}
        <LessonStepper currentStep={step} />

        {/* Step content */}
        <div className="glass rounded-2xl p-6 border border-white/08 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <StepComponent onComplete={handleComplete} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
