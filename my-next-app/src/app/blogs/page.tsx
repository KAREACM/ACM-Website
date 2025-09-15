"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Search, Calendar, User, ArrowRight, X, Filter } from "lucide-react"

// Types based on SmoothUI structure
interface Card {
  _id: string
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
  selectedCard: string | null
  onSelect: (id: string | null) => void
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
    <div className={`grid gap-6 ${className}`}>
      {cards.map((card) => {
        const isSelected = selectedCard === card._id
        return (
          <div
            key={card._id}
            className={`relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-500 cursor-pointer hover:shadow-2xl transform hover:-translate-y-2 group ${
              isSelected ? "shadow-2xl bg-white/90" : ""
            } ${cardClassName}`}
            style={{
              border: isSelected 
                ? 'none' 
                : '1px solid #e0f2fe',
              boxShadow: isSelected 
                ? '0px 0px 15px 2px #3b82f6aa' 
                : '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            onClick={() => onSelect(isSelected ? null : card._id)}
          >
            <div className="flex">
              {/* Image */}
              <div className="w-52 h-36 flex-shrink-0 relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-l-xl group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-sky-500/5 rounded-l-xl"></div>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-sky-600 transition-colors duration-300">
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>
                    
                    {/* Category badge */}
                    {card.category && (
                      <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-semibold border border-sky-300">
                        {card.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="ml-6 flex flex-col items-center gap-2">
                    <ArrowRight 
                      className={`w-6 h-6 text-sky-500 transition-transform duration-300 ${
                        isSelected ? "rotate-90" : ""
                      }`} 
                    />
                  </div>
                </div>
                
                {/* Expandable content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  isSelected ? "max-h-96 mt-6" : "max-h-0"
                }`}>
                  <div className="pt-6 border-t border-sky-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-gray-600 leading-relaxed mb-6">
                          Click "Read More" to explore this topic in detail on Medium and dive deeper into the content.
                        </p>
                        
                        {/* Tags */}
                        {card.tags && card.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {card.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
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
                        className="ml-6 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-blue-400 hover:border-blue-300"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          boxShadow: '0px 0px 20px 1px #3b82f6aa',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/5 group-hover:to-sky-500/10 transition-all duration-500 pointer-events-none"></div>
          </div>
        )
      })}
    </div>
  )
}
// Main Blog Page Component
const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Card[]>([])   // ⬅️ dynamic blogs from backend
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  // ⬅️ Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs") // adjust if proxy is set
        const data = await res.json()
        setBlogs(data)
      } catch (err) {
        console.error("Failed to fetch blogs:", err)
      }
    }
    fetchBlogs()
  }, [])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(blogs.map(card => card.category).filter(Boolean))]
    return cats
  }, [blogs])

  // Filter cards based on search term and category
  const filteredCards = useMemo(() => {
    return blogs.filter(card => {
      const matchesSearch =
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (card.tags && card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))

      const matchesCategory = selectedCategory === "All" || card.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [blogs, searchTerm, selectedCategory])

  const clearSearch = () => {
    setSearchTerm("")
    setSelectedCategory("All")
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f1f5f9 100%)'
    }}>
      
      {/* Background Glow Design matching Events Page */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(147,197,253,0.55) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}></div>

        <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}></div>

        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(191,219,254,0.45) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}></div>

        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full" style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.45) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}></div>
      </div>

      <div className="relative" style={{zIndex: 10}}>
        {/* Header */}
        <div className="px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <div className="text-9xl font-black text-sky-200">BLOGS</div>
              </div>
              <div className="relative z-10">
                <h1 className="text-5xl font-black mb-4 leading-tight text-gray-800">
                  KARE ACM Blogs
                </h1>
                <div className="w-32 h-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mx-auto mb-6"></div>
                <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
                  Discover cutting-edge insights in technology, quantum computing, AI, and more from our student chapter.
                  <span className="font-semibold"> Stay updated with the latest</span> in tech innovation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="px-8 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sky-200 p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search blogs by title, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white text-gray-700 placeholder-gray-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sky-500 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-sky-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white text-gray-700 font-semibold"
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
                    className="px-6 py-3 text-sky-600 hover:text-sky-800 font-semibold transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Search Results Info */}
              <div className="mt-4 text-sm text-gray-700 font-semibold">
                {filteredCards.length === blogs.length ? (
                  `Showing all ${blogs.length} blogs`
                ) : (
                  `Found ${filteredCards.length} blog${filteredCards.length !== 1 ? 's' : ''} ${searchTerm ? `matching "${searchTerm}"` : ''} ${selectedCategory !== "All" ? `in ${selectedCategory}` : ''}`
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            {filteredCards.length > 0 ? (
              <ExpandableCards
                cards={filteredCards}
                selectedCard={selectedCard}
                onSelect={setSelectedCard}
                className="max-w-4xl mx-auto"
              />
            ) : (
              <div className="text-center py-16">
                <div className="text-sky-400 mb-6">
                  <Search className="w-20 h-20 mx-auto mb-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  No blogs found
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Try adjusting your search terms or filters to discover more content
                </p>
                <button
                  onClick={clearSearch}
                  className="px-8 py-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all duration-300 shadow-lg font-semibold transform hover:scale-105"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage