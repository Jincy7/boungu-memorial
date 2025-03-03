import { NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase/supabase.client'

export async function GET() {
  try {
    // Supabase에서 모든 media_metadata와 관련된 tags 정보 가져오기
    const { data: mediaItems, error } = await supabase
      .from('media_metadata')
      .select(`
        *,
        media_tags (
          tag_id,
          tag:tags (
            id,
            title,
            color,
            description
          )
        )
      `)

    if (error) {
      throw new Error(`Error fetching media with tags: ${error.message}`)
    }

    return NextResponse.json(mediaItems)
  } catch (error) {
    console.error('Error fetching media with tags:', error)
    return NextResponse.error()
  }
}

async function uploadToSupabaseStorage(file: File, bucketName: string, targetName: string): Promise<string> {
  const filePath = `uploads/${targetName}`

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`)
  }

  return data.fullPath
}
// 미디어 데이터 추가
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const type = formData.get('type') as string
    const timestamp = formData.get('timestamp') as string

    // Supabase Storage에 파일 업로드
    const mediaSrc = await uploadToSupabaseStorage(file, 'boungu-media', title)

    // Supabase에 메타데이터 저장
    const { data: newMediaItem, error } = await supabase
      .from('media_metadata')
      .insert([{
        title,
        description,
        media_src: mediaSrc,
        type,
        timestamp: new Date(timestamp),
      }])

    if (error) throw error

    return NextResponse.json(newMediaItem)
  } catch (error) {
    console.error('Error adding media item:', error)
    return NextResponse.error()
  }
}