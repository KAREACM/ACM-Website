"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Card {
  id: number
  title: string
  description: string
  image: string
  category?: string
  tags?: string[]
  link: string
}

interface Props {
  cards: Card[]
  className?: string
}

const ExpandableCards: React.FC<Props> = ({ cards, className }) => {
  // state for tracking which card is open
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  const toggleCard = (id: number) => {
    setSelectedCard((prev) => (prev === id ? null : id)) // close if same card, open if new
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className || ""}`}>
      {cards.map((card) => {
        const isSelected = selectedCard === card.id
        return (
          <motion.div
            key={card.id}
            layout
            className={`p-4 border rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
              isSelected ? "bg-gray-100 scale-105" : "bg-white"
            }`}
            onClick={() => toggleCard(card.id)}
          >
            {/* Card Thumbnail */}
            <motion.img
              layout="position"
              src={card.image}
              alt={card.title}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <motion.h3 layout="position" className="text-xl font-bold mb-2">
              {card.title}
            </motion.h3>
            <motion.p layout="position" className="text-gray-600 mb-2 line-clamp-2">
              {card.description}
            </motion.p>

            {/* Expanded Section */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3"
                >
                  {/* Full Description */}
                  <p className="text-gray-700 mb-3">{card.description}</p>

                  {/* Tags */}
                  {card.tags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {card.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Button */}
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Read More
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

export default ExpandableCards
