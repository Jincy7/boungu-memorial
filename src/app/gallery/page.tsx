
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/app/lib/supabase/supabase.client'
import { FaArrowLeft } from 'react-icons/fa'


const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || ''

export default async function Gallery() {
  // Supabase에서 모든 미디어 데이터를 가져옵니다.
  const { data, error } = await supabase
    .from('media_metadata')
    .select('type, description, src:media_src, title, timestamp')

  if (error) {
    console.error('Error fetching media data:', error)
    return <div>데이터를 가져오는 중 오류가 발생했습니다.</div>
  }

  // src에 CDN URL을 붙입니다.
  const mediaData = data.map(item => ({
    ...item,
    src: `${CDN_URL}${item.src}`
  }))

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center">
      <Link href="/" className="mb-6 text-gray-900 hover:text-cyan-700 transition-colors duration-200 flex items-center">
        <FaArrowLeft className="mr-2" /> {/* 아이콘 사용 */}
        뒤로가기
      </Link>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {mediaData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            {item.type === 'image' ? (
              <Image src={item.src} alt={item.description} width={300} height={300} className="w-full h-64 object-cover mb-2" />
            ) : (
              <video src={item.src} controls className="w-full h-64 object-cover mb-2" />
            )}
            <h3 className="text-lg font-semibold">{item.description}</h3> {/* 제목 표시 */}
            <p className="text-gray-500">{item.timestamp}</p> {/* 날짜 표시 */}
          </div>
        ))}
      </div>
    </div>
  )
}