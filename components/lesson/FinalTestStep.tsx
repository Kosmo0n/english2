'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ArrowRight, Star, RotateCcw } from 'lucide-react'
import Link from 'next/link'

const questions = [
  {
    id: 'f1',
    question: 'Complete: "The flight ___ delayed by two hours."',
    options: ['is', 'was', 'were', 'be'],
    answer: 1,
    explanation: 'Use "was" for past simple with singular subjects.',
  },
  {
    id: 'f2',
    question: 'Which phrase is used to ask politely for directions?',
    options: [
      'Where is the gate?',
      'Could you tell me where the gate is?',
      'Tell me the gate!',
      'I want to know the gate.',
    ],
    answer: 1,
    explanation: '"Could you tell me..." is the polite, indirect question form.',
  },
  {
    id: 'f3',
    question: 'What does "itinerary" mean?',
    options: ['A type of ticket', 'A journey plan', 'Airport security', 'A boarding pass'],
    answer: 1,
    explanation: 'An itinerary is a detailed plan of a journey with routes and stops.',
  },
  {
    id: 'f4',
    question: 'Choose the correct preposition: "The plane arrives ___ London."',
    options: ['to', 'at', 'in', 'on'],
    answer: 2,
    explanation: 'We use "in" for cities: "arrives in London".',
  },
  {
    id: 'f5',
    question: 'Which sentence uses "elaborate" correctly?',
    options: [
      'Can you elaborate the plan?',
      'Could you elaborate on that point?',
      'She elaborated the meeting.',
      'He elaborate his idea.',
    ],
    answer: 1,
    explanation: '"Elaborate on something" is the correct collocation.',
  },
]

export default function FinalTestStep({ onComplete }: { onComplete: () => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [submitted, setSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const score = submitted
    ? answers.filter((a, i) => a === questions[i].answer).length
    : 0
  const pct = Math.round((score / questions.length) * 100)

  const xpEarned = score * 20

  const handleSelect = (qIdx: number, aIdx: number) => {
    if (submitted) return
    const updated = [...answers]
    updated[qIdx] = aIdx
    setAnswers(updated)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setShowResults(true), 800)
  }

  const allAnswered = answers.every(a => a !== null)

  if (showResults) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center">
        {/* Trophy */}
        <div className="flex flex-col items-center gap-4 py-4">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-7xl"
          >
            {pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '📚'}
          </motion.div>
          <div>
            <h2 className="text-2xl font-black mb-1">
              {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </h2>
            <p className="text-white/50 text-sm">Lesson complete</p>
          </div>
        </div>

        {/* Score card */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="grid grid-cols-3 gap-4 mb-5">
            {[
              { label: 'Score', value: `${score}/${questions.length}` },
              { label: 'Accuracy', value: `${pct}%` },
              { label: 'XP Earned', value: `+${xpEarned}` },
            ].map(s => (
              <div key={s.label} className="bg-white/04 rounded-xl p-3 border border-white/06">
                <div className="text-xl font-black gradient-text">{s.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Score bar */}
          <div className="h-3 bg-white/08 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
          <div className="flex justify-between text-xs text-white/40">
            <span>0%</span><span>100%</span>
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map(i => (
            <motion.div key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 200 }}>
              <Star className={`w-10 h-10 ${i <= Math.ceil(pct / 34) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Link href="/dashboard"
            className="flex-1 py-3 rounded-2xl glass border border-white/10 text-sm font-medium text-white/70 hover:text-white text-center transition-all">
            Back to Dashboard
          </Link>
          <Link href="/dashboard"
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold text-center hover:opacity-90 transition-all shadow-neon-sm">
            Next Lesson →
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Final Test</h2>
          <p className="text-sm text-white/50">Answer all {questions.length} questions</p>
        </div>
        <div className="text-sm text-white/50">{answers.filter(a => a !== null).length}/{questions.length} answered</div>
      </div>

      <div className="space-y-4">
        {questions.map((q, qIdx) => (
          <div key={q.id} id={`final-${q.id}`} className="glass rounded-2xl p-5 border border-white/08">
            <p className="font-medium text-sm mb-3">
              <span className="text-primary font-bold mr-2">{qIdx + 1}.</span>{q.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, aIdx) => {
                const selected = answers[qIdx] === aIdx
                const correct = aIdx === q.answer
                let cls = 'border-white/08 text-white/70 hover:border-primary/30'
                if (submitted) {
                  cls = correct
                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                    : selected
                    ? 'border-red-500 bg-red-500/15 text-red-300'
                    : 'border-white/04 text-white/25'
                } else if (selected) {
                  cls = 'border-primary bg-primary/15 text-white'
                }
                return (
                  <button key={aIdx} id={`final-${q.id}-${aIdx}`}
                    onClick={() => handleSelect(qIdx, aIdx)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm text-left transition-all duration-200 ${cls}`}>
                    <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold border border-current flex-shrink-0">
                      {String.fromCharCode(65 + aIdx)}
                    </span>
                    {opt}
                    {submitted && correct && <Check className="w-4 h-4 text-emerald-400 ml-auto flex-shrink-0" />}
                    {submitted && selected && !correct && <X className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />}
                  </button>
                )
              })}
            </div>
            <AnimatePresence>
              {submitted && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 text-xs text-white/50 bg-white/04 rounded-xl px-3 py-2 border border-white/06">
                  💡 {q.explanation}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {!submitted && (
        <button id="final-submit" onClick={handleSubmit} disabled={!allAnswered}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all shadow-neon-sm flex items-center justify-center gap-2">
          Submit Final Test <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
