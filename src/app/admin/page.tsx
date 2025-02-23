import { supabase } from '@/app/lib/supabase/supabase.client'
import FileUploader from './components/FileUploader'
import MediaTable from './components/MediaTable'
import AuthWrapper from './components/AuthWrapper'


// 서버 컴포넌트로 AdminPage 구현
export default async function AdminPage() {
  const { data: mediaItems, error } = await supabase
    .from('media_metadata')
    .select('*')

  if (error) {
    console.error('Error fetching media items:', error)
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>
      <AuthWrapper>
        <FileUploader />
        <MediaTable mediaItems={mediaItems} />
      </AuthWrapper>
    </div>
  )
}