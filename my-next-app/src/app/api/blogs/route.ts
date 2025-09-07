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
      image: "https://miro.medium.com/v2/resize:fit:640/format:webp/0*LOL2w2bBp88QmZnq",
      title: "Quantum Cryptography",
      description: "Leveraging quantum mechanics to create unbreakable security.",
      link: "https://medium.com/@kareacm/quantum-cryptography-03b09a128bdf",
      category: "Quantum Computing",
      tags: ["Quantum", "Cryptography", "Security"]
    },
    {
      id: 2,
      image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*GFUg7ncps0LXwZcatY3oWA.jpeg",
      title: "Willow: Quantum in Computing",
      description: "Revolutionizing problem-solving with quantum chips.",
      link: "https://medium.com/@kareacm/willow-quantum-in-computing-caddcd9f13dd",
      category: "Quantum Computing",
      tags: ["Quantum", "Computing", "Willow", "Technology"]
    },
    {
      id: 3,
      image: "https://miro.medium.com/v2/resize:fit:504/format:webp/1*fKd1VpDBhU6v4F4Xopm0MA.png",
      title: "Competitive Programming",
      description: "Sharpen your problem-solving skills with competitive programming.",
      link: "https://medium.com/@kareacm/competitive-programming-cefc5acc307a",
      category: "Programming",
      tags: ["Programming", "Algorithms", "Problem Solving", "Competitive"]
    },
    {
      id: 4,
      image: "https://miro.medium.com/v2/resize:fit:600/format:webp/0*hbn-pBRb7RiOeCiT",
      title: "Blockchain Technology",
      description: "Exploring decentralized, transparent, and secure ledgers.",
      link: "https://medium.com/@kareacm/blockchain-technology-706036b6deac",
      category: "Blockchain",
      tags: ["Blockchain", "Decentralized", "Cryptocurrency", "Security"]
    },
    {
      id: 5,
      image: "https://miro.medium.com/v2/resize:fit:640/format:webp/0*hSdbkSKgfLHrpFoS",
      title: "Decentralized Computing",
      description: "Distributing computing resources for greater flexibility.",
      link: "https://medium.com/@kareacm/decentralised-computing-d8c275b93ded",
      category: "Cloud Computing",
      tags: ["Decentralized", "Computing", "Distributed Systems", "Cloud"]
    },
    {
      id: 6,
      image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*UN_i0yyLD-C24qZP",
      title: "The internet of things and smart cities",
      description: "A New Era of Urban Development",
      link: "https://medium.com/@kareacm/the-internet-of-things-and-smart-cities-8ffbc1f3d6ec",
      category: "IoT",
      tags: ["IoT", "Smart Cities", "Urban Development", "Technology"]
    },
    {
      id: 7,
      image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4gtR9bVjRlc3yloHG0lVJA.png",
      title: "Gen AI in Nutshell",
      description: "The AI Revolution: How Generative AI is Reshaping Our World",
      link: "https://medium.com/@kareacm/gen-ai-in-nutshell-3ba5cdac6218",
      category: "Artificial Intelligence",
      tags: ["AI", "Generative AI", "Machine Learning", "Technology"]
    },
    {
      id: 8,
      image: "https://miro.medium.com/v2/resize:fit:598/format:webp/0*o39MTmWXTprLsRlS",
      title: "LLMs and RAG",
      description: "LLMs generate human-like text, while RAG enhances accuracy by retrieving real-time data for more reliable and up-to-date AI responses.",
      link: "https://medium.com/@kareacm/understanding-large-language-models-llms-and-retrieval-augmented-generation-rag-fe5ff44e00fb",
      category: "Artificial Intelligence",
      tags: ["LLM", "RAG", "Machine Learning", "Natural Language Processing"]
    }
  ]

  return NextResponse.json(blogs)
}
