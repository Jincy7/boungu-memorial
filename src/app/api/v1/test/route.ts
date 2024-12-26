import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase/supabase.client';

// GET 요청 핸들러
export async function GET() {
  // Supabase에서 users 테이블의 모든 데이터 가져오기
  const { data: users, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    // 오류가 발생한 경우 500 상태 코드와 오류 메시지 반환
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 성공적으로 데이터를 가져온 경우 200 상태 코드와 데이터 반환
  return NextResponse.json(users, { status: 200 });
}