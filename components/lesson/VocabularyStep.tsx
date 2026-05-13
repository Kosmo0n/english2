'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, RotateCcw, Check, X } from 'lucide-react'

const words = [
  {
    id: 'elaborate',
    word: 'Elaborate',
    phonetic: '/ ɪˈlæb.ər.ət /',
    definition: 'Involving many carefully arranged parts; detailed and complicated.',
    example: 'She gave an elaborate explanation of the plan.',
    translation: 'Подробный, детальный',
  },
  {
    id: 'negotiate',
    word: 'Negotiate',
    phonetic: '/ nɪˈɡəʊ.ʃi.eɪt /',
    definition: 'To discuss something formally in order to make an agreement.',
    example: 'We need to negotiate the terms of the contract.',
    translation: 'Договариваться, переговоры',
  },
  {
    id: 'itinerary',
    word: 'Itinerary',
    phonetic: '/ aɪˈtɪn.ər.er.i /',
    definition: 'A plan of a journey, including the route and the places that will be visited.',
    example: 'Please send me the travel itinerary before the trip.',
    translation: 'Маршрут, план путешествия',
  },
]

interface VocabularyStepProps {
  onComplete: () => void
}

export default function VocabularyStep({ onComplete }: VocabularyStepProps) {
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [direction, setDirection] = useState(0)
  const [known, setKnown] = useState<string[]>([])
  const [learning, setLearning] = useState<string[]>([])

  const card = words[cardIndex]
  const progress = Math.round((cardIndex / words.length) * 100)

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleMark = (isKnown: boolean) => {
    if (isKnown) setKnown((p) => [...p, card.id])
    else setLearning((p) => [...p, card.id])

    if (cardIndex < words.length - 1) {
      setDirection(1)
      setFlipped(false)
      setTimeout(() => setCardIndex((i) => i + 1), 150)
    } else {
      onComplete()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Vocabulary</h2>
          <p className="text-sm text-white/50">{cardIndex + 1} of {words.length} words</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-emerald-400 flex items-center gap-1">✓ {known.length} known</span>
          <span className="text-yellow-400 flex items-center gap-1">↻ {learning.length} learning</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-white/08 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </div>

      {/* Flashcard */}
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={cardIndex}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
            style={{ perspective: '1000px' }}
          >
            <div
              className={`relative cursor-pointer transition-transform duration-600`}
              style={{
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.5s ease',
              }}
              onClick={() => setFlipped(!flipped)}
            >
              {/* Front */}
              <div
                className="glass rounded-3xl p-8 border border-white/10 min-h-64 flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-xs text-white/40 mb-4 uppercase tracking-widest">Click to reveal definition</div>
                <div className="text-4xl font-black mb-2 gradient-text">{card.word}</div>
                <div className="text-white/50 text-sm mb-6">{card.phonetic}</div>
                <button
                  id="vocab-speak"
                  onClick={(e) => { e.stopPropagation(); speak(card.word) }}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm text-primary hover:text-white hover:bg-primary/20 transition-all border border-primary/20"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen
                </button>
              </div>

              {/* Back */}
              <div
                className="glass rounded-3xl p-8 border border-primary/20 min-h-64 flex flex-col justify-center text-center absolute inset-0 shadow-neon-sm"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="text-sm text-white/50 italic mb-3">Definition</div>
                <div className="text-lg font-semibold mb-4">{card.definition}</div>
                <div className="text-sm text-white/60 bg-white/05 rounded-xl px-4 py-3 mb-4">
                  "{card.example}"
                </div>
                <div className="text-sm text-primary-light">{card.translation}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4"
        >
          <button
            id="vocab-learning"
            onClick={() => handleMark(false)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition-all font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Still Learning
          </button>
          <button
            id="vocab-known"
            onClick={() => handleMark(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:opacity-90 transition-all font-medium shadow-lg"
          >
            <Check className="w-4 h-4" />
            I Know This
          </button>
        </motion.div>
      )}

      {!flipped && (
        <div className="text-center text-sm text-white/30">Tap the card to flip it</div>
      )}
    </div>
  )
}
