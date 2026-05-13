'use client'

import { Check } from 'lucide-react'

const steps = [
  { id: 'vocabulary', label: 'Vocabulary', emoji: '📖' },
  { id: 'listening', label: 'Listening', emoji: '🎧' },
  { id: 'practice', label: 'Practice', emoji: '✍️' },
  { id: 'speaking', label: 'AI Speaking', emoji: '🎙️' },
  { id: 'final', label: 'Final Test', emoji: '🏆' },
]

interface LessonStepperProps {
  currentStep: number
}

export default function LessonStepper({ currentStep }: LessonStepperProps) {
  return (
    <div className="glass rounded-2xl p-4 border border-white/08 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i < currentStep
                    ? 'bg-gradient-to-br from-primary to-accent text-white shadow-neon-sm'
                    : i === currentStep
                    ? 'border-2 border-primary text-white bg-primary/15'
                    : 'border border-white/20 text-white/30 bg-white/04'
                }`}
              >
                {i < currentStep ? <Check className="w-4 h-4" /> : step.emoji}
              </div>
              <span
                className={`text-xs hidden sm:block text-center leading-tight ${
                  i === currentStep ? 'text-white font-medium' : i < currentStep ? 'text-primary' : 'text-white/30'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-2 transition-all duration-500 ${i < currentStep ? 'bg-gradient-to-r from-primary to-accent' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
