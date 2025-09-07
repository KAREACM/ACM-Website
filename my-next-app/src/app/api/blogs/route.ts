import { NextResponse } from "next/server"

// Blog type (same as Card in page.tsx)
interface Blog {
  id: number
  title: string
  description: string
  image: string
  category?: string
  tags?: string[]
  link: string
}

export async function GET() {
  const blogs: Blog[] = [
    {
      id: 1,
      title: "Quantum Cryptography",
      description: "Quantum cryptography offers unbreakable encryption using quantum principles.",
      image: "https://placehold.co/600x400",
      category: "Quantum",
      tags: ["Quantum", "Cryptography", "Security"],
      link: "https://acm.org"
    },
    {
      id: 2,
      title: "Willow: Quantum in Computing",
      description: "Explore how Willow revolutionizes quantum computing.",
      image: "https://placehold.co/600x400",
      category: "Quantum",
      tags: ["Quantum", "Computing", "Willow"],
      link: "https://acm.org"
    },
    {
      id: 3,
      title: "AI in Healthcare",
      description: "Artificial Intelligence is transforming diagnostics and patient care.",
      image: "https://placehold.co/600x400",
      category: "AI",
      tags: ["AI", "Healthcare", "Innovation"],
      link: "https://acm.org"
    },
    {
      id: 4,
      title: "Web3 and Decentralization",
      description: "The future of the web is decentralized with blockchain and smart contracts.",
      image: "https://placehold.co/600x400",
      category: "Web3",
      tags: ["Blockchain", "Web3", "Smart Contracts"],
      link: "https://acm.org"
    }
  ]

  return NextResponse.json(blogs)
}
