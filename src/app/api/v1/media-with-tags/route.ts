import { NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase/supabase.client'

// 미디어와 관련된 태그 정보 가져오기
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mediaId = searchParams.get('mediaId')

    if (!mediaId) {
      return NextResponse.json({ error: 'mediaId is required' }, { status: 400 })
    }

    // Supabase에서 media_metadata와 관련된 tags 정보 가져오기
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
      .eq('id', mediaId)

    if (error) {
      throw new Error(`Error fetching media with tags: ${error.message}`)
    }

    return NextResponse.json(mediaItems)
  } catch (error) {
    console.error('Error fetching media with tags:', error)
    return NextResponse.error()
  }
}