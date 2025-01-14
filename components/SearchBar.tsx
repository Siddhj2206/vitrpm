'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    onSearch(query)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto mt-8"
      initial={{ width: '50%' }}
      animate={{ width: isExpanded ? '100%' : '50%' }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          name="search"
          placeholder="Search for a professor..."
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-full focus:outline-none focus:border-blue-500"
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-2 mr-4 text-blue-500"
        >
          Search
        </button>
      </form>
    </motion.div>
  )
}

