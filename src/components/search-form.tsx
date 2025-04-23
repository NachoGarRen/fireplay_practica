"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface SearchFormProps {
  initialQuery?: string
}

export default function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar juegos..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
          Buscar
        </button>
      </div>
    </form>
  )
}
