export const revalidate = 600

import Image from 'next/image'
import BackButton from '@/components/ui/BackButton'
import { Separator } from '@/components/ui/separator'
import { MediaMetadata } from '@/app/types/media.type'
import Tag from '@/components/ui/Tag'


const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || ''

export default async function Gallery() {
  // Supabase에서 모든 미디어 데이터를 가져옵니다.
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/media`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json() as MediaMetadata[];

  // src에 CDN URL을 붙입니다.
  const mediaData = data.map(item => ({
    ...item,
    src: `${CDN_URL}${item.media_src}`
  }))

  return (
    <div className="min-h-screen p-6 bg-gray-100 py-6 flex flex-col items-center">
      <BackButton />
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mediaData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            {item.type === 'image' ? (
              <Image src={item.src} alt={item.description ?? ''} width={300} height={300} className="w-full h-64 object-cover rounded-t-lg mb-4" />
            ) : (
              <video src={item.src} controls className="w-full h-64 object-cover rounded-t-lg mb-4" />
            )}
            <Separator className='mb-4' />
            {item.media_tags?.map(({ tag_id, tag }) => {
              return <Tag key={tag_id} {...tag} />
            })}
            <h3 className="text-xl font-bold mb-2">{item.description}</h3> {/* 제목 표시 */}
            <p className="text-gray-400 text-sm">{new Date(item.timestamp).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p> {/* 날짜 표시 */}
          </div>
        ))}
      </div>
    </div>
  )
}