import { supabase } from '@/app/lib/supabase/supabase.client'
import FileUploader from './components/FileUploader'
import MediaTable from './components/MediaTable'
import AuthWrapper from './components/AuthWrapper'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import BackButton from '@/components/ui/BackButton'
import TagManager from './components/TagManager'


// 서버 컴포넌트로 AdminPage 구현
export default async function AdminPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/media`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const { data: tags, error: tagError } = await supabase
    .from('tags')
    .select('*')

  if (tagError) {
    console.error('Error fetching media items:', tagError)
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
  }

  const mediaItems = await response.json()

  return (
    <div className="min-h-scree p-6 bg-gray-100 py-6 flex flex-col items-center">
      <BackButton />
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
              <MediaTable tags={tags} mediaItems={mediaItems} />
            </TabsContent>
            <TabsContent value="tags" className="min-h-[300px] w-full">
              <TagManager />
            </TabsContent>
          </div>
        </Tabs>
      </AuthWrapper>
    </div>
  )
}