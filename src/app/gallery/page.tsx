'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type MediaItem = {
  type: 'image' | 'video'
  src: string
  caption: string
}

export default function Gallery() {
  const [media,] = useState<MediaItem[]>([
    { type: 'image', src: '/bonggu/memories/little.jpeg', caption: '어렸을때 무척 귀엽던 봉구' },
    { type: 'video', src: '/bonggu/memories/slide.MOV', caption: '가끔 이상한 곳에 몸을 던지던 봉구' },
    { type: 'image', src: '/bonggu/memories/let-me-play.jpeg', caption: '낚싯대 장난감을 물어 와선 빤히 쳐다보던 봉구' },
  ])

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center">
      <Link href="/" className="mb-6 text-gray-900 hover:text-cyan-700 transition-colors duration-200">
        ← Back to Memorial
      </Link>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {media.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            {item.type === 'image' ? (
              <Image src={item.src} alt={item.caption} width={300} height={300} className="w-full h-64 object-cover mb-2" />
            ) : (
              <video src={item.src} controls className="w-full h-64 object-cover mb-2" />
            )}
            <p className="text-gray-600">{item.caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

