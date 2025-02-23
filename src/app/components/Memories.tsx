import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { supabase } from '@/app/lib/supabase/supabase.client'

export async function Memories() {
  // Supabase에서 모든 description을 가져옵니다.
  const { data, error } = await supabase
    .from('media_metadata')
    .select('description')

  if (error) {
    console.error('Error fetching descriptions:', error)
    return <div>데이터를 가져오는 중 오류가 발생했습니다.</div>
  }

  // 랜덤으로 최대 5개의 description을 선택합니다.
  const shuffled = data.sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 5).map(item => item.description)

  return (
    <div className="text-black">
      <Link href="/gallery">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          추억들
          <FaArrowRight className="ml-2" />
        </h2>
      </Link>

      <ul className="space-y-2">
        {selected.map((memory, index) => (
          <li key={index} className="bg-gray-50 p-3 rounded-lg">
            {memory}
          </li>
        ))}
      </ul>
    </div>
  )
}