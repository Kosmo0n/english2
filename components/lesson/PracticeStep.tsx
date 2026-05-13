'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ArrowRight, Lightbulb } from 'lucide-react'
import { Question } from '@/lib/data'

interface PracticeStepProps {
  onComplete: () => void;
  questions?: Question[];
}

const defaultQuestions: Question[] = [
  {
    id: 'p1',
    question: 'Which of these is a synonym for "Fluency"?',
    options: ['Accuracy', 'Eloquence', 'Hesitation', 'Silence'],
    answer: 1,
    explanation: '"Eloquence" is the ability to speak or write well and easily, which is very close to fluency.',
  },
]

export default function PracticeStep({ onComplete, questions = defaultQuestions }: PracticeStepProps) {
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentQuestions = questions.length > 0 ? questions : defaultQuestions;
  const q = currentQuestions[qIdx] || currentQuestions[0]

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const correct = idx === q.answer
    setIsCorrect(correct)
    setShowExplanation(true)
  }

  const next = () => {
    if (qIdx < currentQuestions.length - 1) {
      setQIdx(i => i + 1)
      setSelected(null)
      setIsCorrect(null)
      setShowExplanation(false)
    } else {
      onComplete()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Practice Quiz</h2>
          <p className="text-sm text-white/50">Question {qIdx + 1} of {currentQuestions.length}</p>
        </div>
        <div className="flex gap-1.5">
          {currentQuestions.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === qIdx ? 'bg-primary w-8' : i < qIdx ? 'bg-primary/40 w-4' : 'bg-white/10 w-4'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-white/10 shadow-neon-purple/5">
        <h3 className="text-lg font-medium mb-6 leading-relaxed">
          {q.question}
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {q.options.map((option, idx) => {
            const isSelected = selected === idx
            const isTargetCorrect = idx === q.answer
            
            let borderCls = 'border-white/10 hover:border-primary/40 hover:bg-white/04'
            if (selected !== null) {
              if (isTargetCorrect) borderCls = 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
              else if (isSelected) borderCls = 'border-red-500 bg-red-500/10 text-red-400'
              else borderCls = 'border-white/05 opacity-50'
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group ${borderCls}`}
              >
                <span className="text-sm font-medium">{option}</span>
                {selected !== null && isTargetCorrect && <Check className="w-5 h-5 text-emerald-400" />}
                {selected !== null && isSelected && !isTargetCorrect && <X className="w-5 h-5 text-red-400" />}
              </button>
            )
          })}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-6 border-t border-white/06"
            >
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/04 border border-white/06">
                <Lightbulb className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isCorrect ? 'text-emerald-400' : 'text-yellow-400'}`} />
                <div>
                  <div className={`text-sm font-bold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-yellow-400'}`}>
                    {isCorrect ? 'Correct!' : 'Almost there!'}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
              
              <button
                onClick={next}
                className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-neon-sm"
              >
                {qIdx < currentQuestions.length - 1 ? 'Next Question' : 'Continue to AI Speaking'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
