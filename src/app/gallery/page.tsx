'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowLeft } from 'react-icons/fa'

// MediaItem 타입 정의
type MediaItem = {
  type: 'image' | 'video'
  src: string
  title: string
  timestamp: string
}

// Gallery 컴포넌트
export default function Gallery() {
  // 미디어 데이터 상태 관리
  const [media,] = useState<MediaItem[]>([
    { type: 'image', src: '/bonggu/memories/little.jpeg', title: '어렸을때 무척 귀엽던 봉구', timestamp: '2023-01-01' },
    { type: 'video', src: '/bonggu/memories/slide.MOV', title: '가끔 이상한 곳에 몸을 던지던 봉구', timestamp: '2023-02-15' },
    { type: 'image', src: '/bonggu/memories/let-me-play.jpeg', title: '낚싯대 장난감을 물어 와선 빤히 쳐다보던 봉구', timestamp: '2023-03-10' },
  ])

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center">
      <Link href="/" className="mb-6 text-gray-900 hover:text-cyan-700 transition-colors duration-200 flex items-center">
        <FaArrowLeft className="mr-2" /> {/* 아이콘 사용 */}
        뒤로가기
      </Link>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {media.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            {item.type === 'image' ? (
              <Image src={item.src} alt={item.title} width={300} height={300} className="w-full h-64 object-cover mb-2" />
            ) : (
              <video src={item.src} controls className="w-full h-64 object-cover mb-2" />
            )}
            <h3 className="text-lg font-semibold">{item.title}</h3> {/* 제목 표시 */}
            <p className="text-gray-500">{item.timestamp}</p> {/* 날짜 표시 */}
          </div>
        ))}
      </div>
    </div>
  )
}