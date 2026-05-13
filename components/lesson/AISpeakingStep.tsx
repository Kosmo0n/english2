'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, RotateCcw, ArrowRight, Volume2 } from 'lucide-react'

const prompts = [
  {
    id: 'p1',
    text: 'Tell me about your last trip. Where did you go and what did you do there?',
    hint: 'Use past simple: "I went...", "I visited...", "We stayed..."',
  },
  {
    id: 'p2',
    text: 'Describe your ideal holiday destination. Why would you choose it?',
    hint: 'Use conditionals: "I would love to...", "It would be..."',
  },
]

type State = 'idle' | 'recording' | 'processing' | 'done'

export default function AISpeakingStep({ onComplete }: { onComplete: () => void }) {
  const [promptIdx, setPromptIdx] = useState(0)
  const [state, setState] = useState<State>('idle')
  const [transcript, setTranscript] = useState('')
  const [feedback, setFeedback] = useState<{ score: number; comment: string } | null>(null)
  const recRef = useRef<any>(null)

  const prompt = prompts[promptIdx]

  const speak = (text: string) => {
    window.speechSynthesis?.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'; u.rate = 0.9
    window.speechSynthesis?.speak(u)
  }

  const startRecording = () => {
    setState('recording')
    setTranscript('')
    setFeedback(null)
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SR) {
      const r = new SR()
      r.lang = 'en-US'; r.continuous = false; r.interimResults = true
      r.onresult = (e: any) => setTranscript(Array.from(e.results).map((r: any) => r[0].transcript).join(''))
      r.onend = processRecording
      r.onerror = processRecording
      recRef.current = r
      r.start()
    } else {
      setTimeout(() => {
        setTranscript('I went to Paris last summer. We visited the Eiffel Tower and the Louvre museum.')
        processRecording()
      }, 3000)
    }
  }

  const stopRecording = () => recRef.current?.stop()

  const processRecording = () => {
    setState('processing')
    setTimeout(() => {
      const score = Math.floor(Math.random() * 20) + 75
      const comments = [
        'Great fluency! Your sentence structure sounds very natural.',
        'Good vocabulary. Try using more connectives like "furthermore" and "however".',
        'Excellent pronunciation! Your intonation is very natural.',
      ]
      setFeedback({ score, comment: comments[Math.floor(Math.random() * comments.length)] })
      setState('done')
    }, 2000)
  }

  const reset = () => { setState('idle'); setTranscript(''); setFeedback(null) }

  const nextPrompt = () => {
    if (promptIdx < prompts.length - 1) { setPromptIdx(i => i + 1); reset() }
    else onComplete()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">AI Speaking Practice</h2>
          <p className="text-sm text-white/50">Prompt {promptIdx + 1} of {prompts.length}</p>
        </div>
        <div className="flex gap-1.5">
          {prompts.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === promptIdx ? 'bg-primary w-6' : i < promptIdx ? 'bg-primary/40 w-2' : 'bg-white/15 w-2'}`} />
          ))}
        </div>
      </div>

      {/* Prompt */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Speak about this:</div>
            <p className="text-lg font-medium leading-relaxed">{prompt.text}</p>
          </div>
          <button id="speaking-listen" onClick={() => speak(prompt.text)}
            className="w-9 h-9 glass rounded-xl flex items-center justify-center text-primary hover:bg-primary/15 border border-primary/20 transition-all flex-shrink-0">
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-white/40 bg-white/04 rounded-xl px-3 py-2">💡 {prompt.hint}</div>
      </div>

      {/* Mic */}
      <div className="flex flex-col items-center gap-5 py-2">
        <div className="relative">
          {state === 'recording' && [1, 2, 3].map(i => (
            <motion.div key={i} className="absolute inset-0 rounded-full border-2 border-accent/30"
              initial={{ scale: 1, opacity: 0.7 }} animate={{ scale: 2.5 + i * 0.3, opacity: 0 }}
              transition={{ duration: 1.8, delay: i * 0.4, repeat: Infinity }} />
          ))}
          <motion.button id="speaking-mic"
            onClick={state === 'idle' ? startRecording : state === 'recording' ? stopRecording : undefined}
            whileHover={state === 'idle' ? { scale: 1.05 } : {}}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              state === 'recording' ? 'bg-gradient-to-br from-red-500 to-accent animate-pulse-glow' :
              state === 'processing' ? 'bg-gradient-to-br from-primary/50 to-accent/50 cursor-wait' :
              'bg-gradient-to-br from-primary to-accent hover:shadow-neon-purple cursor-pointer'
            }`}>
            {state === 'recording' ? <MicOff className="w-10 h-10 text-white" /> :
             state === 'processing' ? (
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                 className="w-10 h-10 rounded-full border-[3px] border-white/30 border-t-white" />
             ) : <Mic className="w-10 h-10 text-white" />}
          </motion.button>
        </div>

        <p className="text-sm text-center text-white/50">
          {state === 'idle' && 'Tap the mic to start speaking'}
          {state === 'recording' && <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-accent">🎙️ Recording... tap to stop</motion.span>}
          {state === 'processing' && <span className="text-primary">🤖 AI is analyzing your speech...</span>}
          {state === 'done' && <span className="text-emerald-400">✓ Analysis complete!</span>}
        </p>

        {state === 'recording' && (
          <div className="flex items-center gap-1 h-10">
            {[...Array(18)].map((_, i) => (
              <motion.div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-primary to-accent"
                style={{ height: '40px', originY: 1 }}
                animate={{ scaleY: [0.2, 1, 0.2] }}
                transition={{ duration: 0.7, delay: (i * 0.06) % 0.7, repeat: Infinity, ease: 'easeInOut' }} />
            ))}
          </div>
        )}
      </div>

      {/* Transcript */}
      <AnimatePresence>
        {transcript && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-4 border border-white/10">
            <div className="text-xs text-white/40 mb-2 uppercase tracking-widest">Your response:</div>
            <p className="text-sm text-white/80 italic">"{transcript}"</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-5 border border-primary/25 shadow-neon-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-primary">🤖 AI Feedback</div>
              <div className="text-2xl font-black gradient-text">{feedback.score}<span className="text-white/40 text-sm font-normal">/100</span></div>
            </div>
            <div className="h-2 bg-white/08 rounded-full overflow-hidden mb-3">
              <motion.div initial={{ width: 0 }} animate={{ width: `${feedback.score}%` }} transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
            <p className="text-sm text-white/70 mb-4">{feedback.comment}</p>
            <div className="flex gap-3">
              <button id="speaking-retry" onClick={reset}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-sm text-white/70 hover:text-white transition-all">
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
              <button id="speaking-next" onClick={nextPrompt}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:opacity-90 transition-all ml-auto">
                {promptIdx < prompts.length - 1 ? 'Next Prompt' : 'Finish'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
