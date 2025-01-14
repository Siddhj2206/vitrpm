import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  const { professorId, comment } = await req.json()

  const commentsFilePath = path.join(process.cwd(), 'data', 'comments.json')
  let commentsData = {}

  if (fs.existsSync(commentsFilePath)) {
    commentsData = JSON.parse(fs.readFileSync(commentsFilePath, 'utf-8'))
  }

  if (!commentsData[professorId]) {
    commentsData[professorId] = []
  }

  commentsData[professorId].push(comment)

  fs.writeFileSync(commentsFilePath, JSON.stringify(commentsData, null, 2))

  return NextResponse.json({ success: true })
}

