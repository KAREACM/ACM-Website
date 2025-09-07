"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Search, X, Filter } from "lucide-react"
import ExpandableCards from "@/components/ExpandableCards"

// Types
interface Card {
  id: number
  title: string
  image: string
  description: string
  link: string
  category?: string
  tags?: string[]
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Card[]>([]) // <-- API data
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  // 🔹 Fetch blogs from backend API
  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error("Failed to fetch blogs:", err))
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
    <div className="min-h-screen bg-gradient-to-br from-[#B3E5FC] via-[#E3F2FD] to-[#81D4FA]">
      {/* Header */}
      <div className="border-b border-white/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            KARE ACM BLOGS
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Discover cutting-edge insights in technology, quantum computing, AI, and more from our student chapter
          </p>
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
            {filteredCards.length === blogs.length ? (
              `Showing all ${blogs.length} blogs`
            ) : (
              `Found ${filteredCards.length} blog${filteredCards.length !== 1 ? "s" : ""} ${searchTerm ? `matching "${searchTerm}"` : ""} ${selectedCategory !== "All" ? `in ${selectedCategory}` : ""}`
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
            <Search className="w-20 h-20 mx-auto mb-6 text-[#A8D4EC]" />
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No blogs found</h3>
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
