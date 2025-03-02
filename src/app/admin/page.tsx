import { supabase } from '@/app/lib/supabase/supabase.client'
import FileUploader from './components/FileUploader'
import MediaTable from './components/MediaTable'
import AuthWrapper from './components/AuthWrapper'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'


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
    <div className="min-h-scree p-6 bg-gray-100 py-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>
      <AuthWrapper>
        <Tabs defaultValue="media" className="w-full max-w-4xl">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="media">미디어 관리</TabsTrigger>
            <TabsTrigger value="tags">태그 관리</TabsTrigger>
          </TabsList>
          <div className="w-full">
            <TabsContent value="media" className="min-h-[300px] w-full">
              <FileUploader />
              <MediaTable mediaItems={mediaItems} />
            </TabsContent>
            <TabsContent value="tags" className="min-h-[300px] w-full">
              {/* 태그 관리 컴포넌트 또는 내용 추가 */}
              <div>태그 관리 기능이 여기에 표시됩니다.</div>
            </TabsContent>
          </div>
        </Tabs>
      </AuthWrapper>
    </div>
  )
}