'use client'

import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import SearchBar from '../components/SearchBar'
import ProfessorCard from '../components/ProfessorCard'
import ThemeToggle from '../components/ThemeToggle'
import professorsData from '../data/professors.json'

interface Professor {
  ID: number
  Name: string
  Image: string
}

export default function Home() {
  const [professors, setProfessors] = useState<Professor[]>([])
  const [searchResults, setSearchResults] = useState<Professor[]>([])

  useEffect(() => {
    setProfessors(professorsData)
  }, [])

  const fuse = new Fuse(professors, {
    keys: ['Name'],
    threshold: 0.3,
  })

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([])
    } else {
      const results = fuse.search(query).map(result => result.item)
      setSearchResults(results)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Professor Search</h1>
        <ThemeToggle />
      </div>
      <SearchBar onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {searchResults.map((professor) => (
            <ProfessorCard
              key={professor.ID}
              id={professor.ID}
              name={professor.Name}
              photo={professor.Image}
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
          Search for a professor to see their information.
        </p>
      )}
    </main>
  )
}

