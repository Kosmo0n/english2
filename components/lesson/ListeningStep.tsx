'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react'
import { Question } from '@/lib/data'

interface ListeningData {
  title: string;
  transcript: string;
  questions: Question[];
}

interface ListeningStepProps {
  onComplete: () => void;
  data?: ListeningData;
}

const defaultListeningData: ListeningData = {
  title: 'At the Airport',
  transcript: 'Excuse me, could you tell me where the check-in counter for Flight BA204 is? I need to drop my luggage before going through security.',
  questions: [
    {
      id: 'q1',
      question: 'What is the speaker looking for?',
      options: ['The boarding gate', 'The check-in counter', 'The baggage claim', 'The customs area'],
      answer: 1,
      explanation: 'The speaker asks for the "check-in counter".',
    },
  ],
}

export default function ListeningStep({ onComplete, data = defaultListeningData }: ListeningStepProps) {
  const [playing, setPlaying] = useState(false)
  const [played, setPlayed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(data?.questions.length || 0).fill(null))
  const [submitted, setSubmitted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentData = data || defaultListeningData;

  const simulatePlay = () => {
    // Always clear existing interval and stop current speech if starting/toggling
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    if (playing) {
      setPlaying(false)
      window.speechSynthesis?.cancel()
      return
    }

    setPlaying(true)
    setPlayed(true)
    
    // Stop any current speech before starting new
    window.speechSynthesis?.cancel()

    // Simulate audio playing
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(currentData.transcript)
      utterance.lang = 'en-US'
      utterance.rate = 0.85
      utterance.onend = () => { setPlaying(false); setProgress(100) }
      window.speechSynthesis.speak(utterance)
    }
    
    // Animate progress
    const total = 8000
    const start = Date.now()
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / total) * 100, 100)
      setProgress(pct)
      if (pct >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setPlaying(false)
      }
    }, 100)
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const handleAnswer = (qIdx: number, aIdx: number) => {
    if (submitted) return
    const updated = [...answers]
    updated[qIdx] = aIdx
    setAnswers(updated)
  }

  const allAnswered = answers.every((a) => a !== null)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(onComplete, 2000)
  }

  const score = submitted
    ? answers.filter((a, i) => a === currentData.questions[i].answer).length
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Listening Exercise</h2>
        <p className="text-sm text-white/50">{currentData.title}</p>
      </div>

      {/* Player */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <button
            id="audio-play"
            onClick={simulatePlay}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-neon-purple hover:opacity-90 transition-all"
          >
            {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
          </button>
          <div className="flex-1">
            <div className="h-2 bg-white/08 rounded-full overflow-hidden cursor-pointer">
              <motion.div
                animate={{ width: `${progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
          </div>
          <button
            id="audio-restart"
            onClick={() => { 
              setProgress(0); 
              setPlaying(false); 
              window.speechSynthesis?.cancel();
              if (intervalRef.current) clearInterval(intervalRef.current);
            }}
            className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-colors border border-white/08"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Waveform */}
        <div className="flex items-center gap-0.5 h-12">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-300 ${
                playing ? 'bg-gradient-to-t from-primary to-accent' : 'bg-white/15'
              }`}
              style={{
                height: `${Math.sin((i / 40) * Math.PI * 3) * 40 + 60}%`,
                animation: playing ? `wave-bar 1.2s ease-in-out ${(i * 0.03) % 1}s infinite` : 'none',
              }}
            />
          ))}
        </div>

        {played && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-white/04 rounded-xl border border-white/06 text-sm text-white/70 italic"
          >
            "{currentData.transcript}"
          </motion.div>
        )}
      </div>

      {/* Questions */}
      {played && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {currentData.questions.map((q, qIdx) => (
            <div key={q.id} id={`question-${q.id}`} className="glass rounded-2xl p-5 border border-white/08">
              <p className="font-medium text-sm mb-3">{qIdx + 1}. {q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, aIdx) => {
                  const selected = answers[qIdx] === aIdx
                  const isCorrect = aIdx === q.answer
                  let cls = 'border border-white/08 text-white/70 hover:border-primary/40'
                  if (submitted) {
                    cls = isCorrect
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                      : selected
                      ? 'border-red-500 bg-red-500/15 text-red-300'
                      : 'border-white/05 text-white/30'
                  } else if (selected) {
                    cls = 'border-primary bg-primary/15 text-white'
                  }
                  return (
                    <button
                      key={aIdx}
                      id={`answer-${q.id}-${aIdx}`}
                      onClick={() => handleAnswer(qIdx, aIdx)}
                      className={`px-4 py-2.5 rounded-xl text-sm text-left transition-all duration-200 ${cls}`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {!submitted && (
            <button
              id="listening-submit"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all shadow-neon-sm"
            >
              Check Answers
            </button>
          )}

          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-4 glass rounded-2xl border border-primary/30"
            >
              <div className="text-3xl mb-1">{score === currentData.questions.length ? '🎉' : score >= currentData.questions.length / 2 ? '👍' : '📚'}</div>
              <div className="font-bold text-lg gradient-text">{score}/{currentData.questions.length} correct</div>
              <div className="text-sm text-white/50 mt-1">Moving to next step...</div>
            </motion.div>
          )}
        </motion.div>
      )}

      {!played && (
        <div className="text-center text-sm text-white/40 py-4">
          <Volume2 className="w-6 h-6 mx-auto mb-2 text-primary" />
          Press play to listen to the dialogue
        </div>
      )}
    </div>
  )
}
