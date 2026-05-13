'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'

const questions = [
  {
    id: 'q1',
    type: 'multiple',
    question: 'Choose the correct sentence:',
    options: [
      'I am work at the airport.',
      'I work at the airport.',
      'I working at the airport.',
      'I works at the airport.',
    ],
    answer: 1,
    explanation: '"I work" is the correct present simple form for first person.',
  },
  {
    id: 'q2',
    type: 'multiple',
    question: 'What does "check-in" mean at an airport?',
    options: [
      'To look at something carefully',
      'To register for your flight and drop luggage',
      'To check the departure board',
      'To pay for your ticket',
    ],
    answer: 1,
    explanation: 'Check-in is the process of confirming your presence for a flight and handing in your luggage.',
  },
  {
    id: 'q3',
    type: 'multiple',
    question: 'Fill in: "Could you _____ me where the gate is?"',
    options: ['talk', 'say', 'tell', 'speak'],
    answer: 2,
    explanation: '"Tell" is used with an indirect object — "tell someone something".',
  },
  {
    id: 'q4',
    type: 'multiple',
    question: 'Which word means "to arrange a journey plan"?',
    options: ['Navigate', 'Itinerary', 'Expedition', 'Transit'],
    answer: 1,
    explanation: '"Itinerary" refers to a detailed plan of a journey.',
  },
]

interface PracticeStepProps {
  onComplete: () => void
}

export default function PracticeStep({ onComplete }: PracticeStepProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [direction, setDirection] = useState(1)

  const q = questions[currentQ]
  const isCorrect = selected === q.answer

  const handleSelect = (idx: number) => {
    if (showFeedback) return
    setSelected(idx)
    setShowFeedback(true)
    if (idx === q.answer) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setDirection(1)
      setSelected(null)
      setShowFeedback(false)
      setCurrentQ((i) => i + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Practice Quiz</h2>
          <p className="text-sm text-white/50">Question {currentQ + 1} of {questions.length}</p>
        </div>
        <div className="text-sm font-medium px-3 py-1.5 glass rounded-xl border border-white/08">
          Score: <span className="gradient-text font-bold">{score}/{questions.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-white/08 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${((currentQ) / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-2xl p-6 border border-white/08"
        >
          <p className="text-lg font-semibold mb-6">{q.question}</p>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let cls = 'border-white/08 text-white/80 hover:border-primary/40 hover:bg-primary/08'
              if (showFeedback) {
                if (idx === q.answer) cls = 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                else if (idx === selected) cls = 'border-red-500 bg-red-500/15 text-red-300'
                else cls = 'border-white/04 text-white/30'
              } else if (selected === idx) {
                cls = 'border-primary bg-primary/15 text-white'
              }

              return (
                <motion.button
                  key={idx}
                  id={`practice-option-${idx}`}
                  whileHover={showFeedback ? {} : { scale: 1.01 }}
                  whileTap={showFeedback ? {} : { scale: 0.99 }}
                  onClick={() => handleSelect(idx)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl border text-left transition-all duration-200 ${cls}`}
                >
                  <span className="w-7 h-7 rounded-lg border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-medium">{opt}</span>
                  {showFeedback && idx === q.answer && (
                    <Check className="w-4 h-4 text-emerald-400 ml-auto" />
                  )}
                  {showFeedback && idx === selected && idx !== q.answer && (
                    <X className="w-4 h-4 text-red-400 ml-auto" />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback Banner */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-2xl px-5 py-4 border flex items-start justify-between gap-4 ${
              isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                {isCorrect ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <X className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div>
                <div className={`font-semibold text-sm ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct! 🎉' : 'Not quite 🤔'}
                </div>
                <div className="text-xs text-white/60 mt-0.5">{q.explanation}</div>
              </div>
            </div>
            <button
              id="practice-next"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold whitespace-nowrap hover:opacity-90 transition-all shadow-neon-sm flex-shrink-0"
            >
              {currentQ < questions.length - 1 ? 'Next' : 'Finish'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
