"use client"

import React, { useState, useMemo } from "react"
import { Search, Calendar, User, ArrowRight, X, Filter } from "lucide-react"

// Types based on SmoothUI structure
interface Card {
  id: number
  title: string
  image: string
  description: string
  link: string
  category?: string
  tags?: string[]
}

// ExpandableCards Component (based on SmoothUI pattern)
interface ExpandableCardsProps {
  cards: Card[]
  selectedCard: number | null
  onSelect: (id: number | null) => void
  className?: string
  cardClassName?: string
}

const ExpandableCards: React.FC<ExpandableCardsProps> = ({
  cards,
  selectedCard,
  onSelect,
  className = "",
  cardClassName = ""
}) => {
  return (
    <div className={`grid gap-4 ${className}`}>
      {cards.map((card) => {
        const isSelected = selectedCard === card.id
        return (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-white via-[#E1F1FA]/20 to-white backdrop-blur-lg shadow-xl transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-[1.02] ${
              isSelected ? "shadow-2xl ring-2 ring-[#A8D4EC] bg-gradient-to-br from-white to-[#E1F1FA]/30" : ""
            } ${cardClassName}`}
            onClick={() => onSelect(isSelected ? null : card.id)}
          >
            <div className="flex">
              {/* Image */}
              <div className="w-52 h-36 flex-shrink-0 relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-l-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#E1F1FA]/20 via-transparent to-[#A8D4EC]/10 rounded-l-2xl"></div>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-600 text-base leading-relaxed mb-5 font-medium">
                      {card.description}
                    </p>
                    
                    {/* Category badge */}
                    {card.category && (
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#E1F1FA] to-[#A8D4EC] text-gray-700 rounded-full text-sm font-semibold border border-white shadow-md">
                        {card.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="ml-6 flex flex-col items-center gap-2">
                    <ArrowRight 
                      className={`w-6 h-6 text-[#A8D4EC] transition-transform duration-300 ${
                        isSelected ? "rotate-90" : ""
                      }`} 
                    />
                  </div>
                </div>
                
                {/* Expandable content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  isSelected ? "max-h-96 mt-6" : "max-h-0"
                }`}>
                  <div className="pt-6 border-t border-[#E1F1FA]/50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                          Click "Read More" to explore this topic in detail on Medium and dive deeper into the content.
                        </p>
                        
                        {/* Tags */}
                        {card.tags && card.tags.length > 0 && (
                          <div className="flex flex-wrap gap-3 mb-6">
                            {card.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-gradient-to-r from-white to-[#E1F1FA]/50 text-gray-600 rounded-full text-sm border border-[#E1F1FA] shadow-sm font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <a 
                        href={card.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-6 px-8 py-3 bg-gradient-to-r from-[#A8D4EC] to-[#E1F1FA] text-gray-700 rounded-xl hover:from-[#E1F1FA] hover:to-[#A8D4EC] transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ACM Blog data
const blogCards: Card[] = [
  {
    id: 1,
    image: 'https://miro.medium.com/v2/resize:fit:640/format:webp/0*LOL2w2bBp88QmZnq',
    title: 'Quantum Cryptography',
    description: 'Leveraging quantum mechanics to create unbreakable security.',
    link: 'https://medium.com/@kareacm/quantum-cryptography-03b09a128bdf',
    category: 'Quantum Computing',
    tags: ['Quantum', 'Cryptography', 'Security']
  },
  {
    id: 2,
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*GFUg7ncps0LXwZcatY3oWA.jpeg',
    title: 'Willow: Quantum in Computing',
    description: 'Revolutionizing problem-solving with quantum chips.',
    link: 'https://medium.com/@kareacm/willow-quantum-in-computing-caddcd9f13dd',
    category: 'Quantum Computing',
    tags: ['Quantum', 'Computing', 'Willow', 'Technology']
  },
  {
    id: 3,
    image: 'https://miro.medium.com/v2/resize:fit:504/format:webp/1*fKd1VpDBhU6v4F4Xopm0MA.png',
    title: 'Competitive Programming',
    description: 'Sharpen your problem-solving skills with competitive programming.',
    link: 'https://medium.com/@kareacm/competitive-programming-cefc5acc307a',
    category: 'Programming',
    tags: ['Programming', 'Algorithms', 'Problem Solving', 'Competitive']
  },
  {
    id: 4,
    image: 'https://miro.medium.com/v2/resize:fit:600/format:webp/0*hbn-pBRb7RiOeCiT',
    title: 'Blockchain Technology',
    description: 'Exploring decentralized, transparent, and secure ledgers.',
    link: 'https://medium.com/@kareacm/blockchain-technology-706036b6deac',
    category: 'Blockchain',
    tags: ['Blockchain', 'Decentralized', 'Cryptocurrency', 'Security']
  },
  {
    id: 5,
    image: 'https://miro.medium.com/v2/resize:fit:640/format:webp/0*hSdbkSKgfLHrpFoS',
    title: 'Decentralized Computing',
    description: 'Distributing computing resources for greater flexibility.',
    link: 'https://medium.com/@kareacm/decentralised-computing-d8c275b93ded',
    category: 'Cloud Computing',
    tags: ['Decentralized', 'Computing', 'Distributed Systems', 'Cloud']
  },
  {
    id: 6,
    image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/0*UN_i0yyLD-C24qZP',
    title: 'The internet of things and smart cities',
    description: 'A New Era of Urban Development',
    link: 'https://medium.com/@kareacm/the-internet-of-things-and-smart-cities-8ffbc1f3d6ec',
    category: 'IoT',
    tags: ['IoT', 'Smart Cities', 'Urban Development', 'Technology']
  },
  {
    id: 7,
    image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4gtR9bVjRlc3yloHG0lVJA.png',
    title: 'Gen AI in Nutshell',
    description: 'The AI Revolution: How Generative AI is Reshaping Our World',
    link: 'https://medium.com/@kareacm/gen-ai-in-nutshell-3ba5cdac6218',
    category: 'Artificial Intelligence',
    tags: ['AI', 'Generative AI', 'Machine Learning', 'Technology']
  },
  {
    id: 8,
    image: 'https://miro.medium.com/v2/resize:fit:598/format:webp/0*o39MTmWXTprLsRlS',
    title: 'LLMs and RAG',
    description: 'LLMs generate human-like text, while RAG enhances accuracy by retrieving real-time data for more reliable and up-to-date AI responses.',
    link: 'https://medium.com/@kareacm/understanding-large-language-models-llms-and-retrieval-augmented-generation-rag-fe5ff44e00fb',
    category: 'Artificial Intelligence',
    tags: ['LLM', 'RAG', 'Machine Learning', 'Natural Language Processing']
  }
]

// Main Blog Page Component
const BlogPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(blogCards.map(card => card.category).filter(Boolean))]
    return cats
  }, [])

  // Filter cards based on search term and category
  const filteredCards = useMemo(() => {
    return blogCards.filter(card => {
      const matchesSearch = 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (card.tags && card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      
      const matchesCategory = selectedCategory === "All" || card.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const clearSearch = () => {
    setSearchTerm("")
    setSelectedCategory("All")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B3E5FC] via-[#E3F2FD] to-[#81D4FA]">




      {/* Header */}
      <div className="border-b border-white/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
              KARE ACM BLOGS
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Discover cutting-edge insights in technology, quantum computing, AI, and more from our student chapter
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-white/60 p-8 mb-10">

      
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A8D4EC] w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-[#E1F1FA] rounded-xl focus:ring-2 focus:ring-[#A8D4EC] focus:border-[#A8D4EC] outline-none bg-white/80 text-gray-700 placeholder-gray-500 shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#A8D4EC] hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-[#A8D4EC]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-5 py-4 border border-[#E1F1FA] rounded-xl focus:ring-2 focus:ring-[#A8D4EC] focus:border-[#A8D4EC] outline-none bg-white/80 text-gray-700 shadow-inner"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={clearSearch}
                className="px-6 py-4 text-[#A8D4EC] hover:text-gray-600 font-medium transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Search Results Info */}
          <div className="mt-6 text-sm text-gray-600 font-medium">
            {filteredCards.length === blogCards.length ? (
              `Showing all ${blogCards.length} blogs`
            ) : (
              `Found ${filteredCards.length} blog${filteredCards.length !== 1 ? 's' : ''} ${searchTerm ? `matching "${searchTerm}"` : ''} ${selectedCategory !== "All" ? `in ${selectedCategory}` : ''}`
            )}
          </div>
        </div>

        {/* Blog Cards */}
        {filteredCards.length > 0 ? (
          <ExpandableCards
            cards={filteredCards}
            selectedCard={selectedCard}
            onSelect={setSelectedCard}
            className="max-w-4xl mx-auto"
          />
        ) : (
          <div className="text-center py-16">
            <div className="text-[#A8D4EC] mb-6">
              <Search className="w-20 h-20 mx-auto mb-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              No blogs found
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Try adjusting your search terms or filters to discover more content
            </p>
            <button
              onClick={clearSearch}
              className="px-8 py-4 bg-gradient-to-r from-[#A8D4EC] to-[#E1F1FA] text-gray-700 rounded-xl hover:from-[#E1F1FA] hover:to-[#A8D4EC] transition-all duration-300 shadow-lg font-bold transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPage