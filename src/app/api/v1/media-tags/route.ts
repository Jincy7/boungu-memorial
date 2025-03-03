import { NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase/supabase.client'

// 미디어와 태그 매칭
export async function POST(request: Request) {
  try {
    const { mediaId, tagId } = await request.json()

    // Supabase에 media_tags 데이터 추가
    const { data, error } = await supabase
      .from('media_tags')
      .insert([{ media_id: mediaId, tag_id: tagId }])

    if (error) {
      throw new Error(`Error inserting media tag: ${error.message}`)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error matching tag to media:', error)
    return NextResponse.error()
  }
}