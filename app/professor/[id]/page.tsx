'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ThemeToggle from '../../../components/ThemeToggle'
import professorsData from '../../../data/professors.json'
import commentsData from '../../../data/comments.json'

interface Comment {
  comment: string
  timestamp: string
}

interface Professor {
  ID: number
  Name: string
  Image: string
}

export default function ProfessorProfile() {
  const { id } = useParams()
  const [professor, setProfessor] = useState<Professor | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const prof = professorsData.find(p => p.ID === Number(id))
    if (prof) {
      setProfessor(prof)
      const profComments = commentsData[prof.ID as keyof typeof commentsData] || []
      setComments(profComments)
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const comment: Comment = { 
      comment: newComment, 
      timestamp: new Date().toISOString() 
    }
    setComments([...comments, comment])
    setNewComment('')

    try {
      const response = await fetch('/api/saveComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          professorId: professor?.ID,
          comment: comment,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to save comment')
      }
    } catch (error) {
      console.error('Error saving comment:', error)
    }
  }

  if (!professor) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="text-primary hover:underline">
          &larr; Back to Search
        </Link>
        <ThemeToggle />
      </div>
      <div className="bg-card text-card-foreground shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Image
            src={professor.Image}
            alt={professor.Name}
            width={150}
            height={150}
            className="rounded-full mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{professor.Name}</h1>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-8 mb-4">User Comments</h2>
        {comments.map((comment, index) => (
          <div key={index} className="mb-4 p-4 bg-muted rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">{new Date(comment.timestamp).toLocaleString()}</span>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))}
        <h3 className="text-xl font-semibold mt-8 mb-4">Add a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={3}
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded">
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  )
}

