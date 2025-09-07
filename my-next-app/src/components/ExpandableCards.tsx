"use client"

import React from "react"

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
  selectedCard: number | null
  onSelect: (id: number | null) => void
  className?: string
}

const ExpandableCards: React.FC<Props> = ({ cards, selectedCard, onSelect, className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className || ""}`}>
      {cards.map(card => (
        <div
          key={card.id}
          className={`p-4 border rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
            selectedCard === card.id ? "bg-gray-100 scale-105" : "bg-white"
          }`}
          onClick={() => onSelect(selectedCard === card.id ? null : card.id)}
        >
          <img src={card.image} alt={card.title} className="rounded-lg w-full h-48 object-cover mb-4" />
          <h3 className="text-xl font-bold mb-2">{card.title}</h3>
          <p className="text-gray-600 mb-2">{card.description}</p>
          {card.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {card.tags.map((tag, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ExpandableCards
