import { supabase } from '@/app/lib/supabase/supabase.client'
import { NextResponse } from 'next/server'


// 태그 목록 가져오기
export async function GET() {
  const { data: tags, error } = await supabase.from('tags').select('*')
  if (error) {
    return NextResponse.json({ error: 'Error fetching tags' }, { status: 500 })
  }
  return NextResponse.json(tags)
}

// 태그 추가
export async function POST(request: Request) {
  const { title, color } = await request.json()
  const { data, error } = await supabase.from('tags').insert([{ title, color }])
  if (error) {
    return NextResponse.json({ error: 'Error adding tag' }, { status: 500 })
  }
  return NextResponse.json(data)
}

// 태그 삭제
export async function DELETE(request: Request) {
  const { id } = await request.json()
  const { error } = await supabase.from('tags').delete().eq('id', id)
  if (error) {
    return NextResponse.json({ error: 'Error deleting tag' }, { status: 500 })
  }
  return NextResponse.json({ message: 'Tag deleted successfully' })
}

// 태그 수정
export async function PUT(request: Request) {
  const { id, title, color } = await request.json()
  const { error } = await supabase.from('tags').update({ title, color }).eq('id', id)
  if (error) {
    return NextResponse.json({ error: 'Error updating tag' }, { status: 500 })
  }
  return NextResponse.json({ message: 'Tag updated successfully' })
}