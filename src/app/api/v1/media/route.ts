import { NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase/supabase.client'

// 미디어 데이터 가져오기
export async function GET() {
  try {
    const { data: mediaItems, error } = await supabase
      .from('media_metadata')
      .select('*')

    if (error) throw error

    return NextResponse.json(mediaItems)
  } catch (error) {
    console.error('Error fetching media items:', error)
    return NextResponse.error()
  }
}

// 미디어 데이터 추가
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { data: newMediaItem, error } = await supabase
      .from('media_metadata')
      .insert([data])

    if (error) throw error

    return NextResponse.json(newMediaItem)
  } catch (error) {
    console.error('Error adding media item:', error)
    return NextResponse.error()
  }
}