import Image from 'next/image'
import Link from 'next/link'

interface ProfessorCardProps {
  id: number
  name: string
  photo: string
}

export default function ProfessorCard({ id, name, photo }: ProfessorCardProps) {
  return (
    <Link href={`/professor/${id}`}>
      <div className="bg-card text-card-foreground shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
        <Image
          src={photo}
          alt={name}
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
        <h2 className="text-lg font-semibold text-center">{name}</h2>
      </div>
    </Link>
  )
}

