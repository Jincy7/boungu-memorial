import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET_KEY

export async function POST(request: Request) {
  if (!SECRET_KEY) {
    return NextResponse.json({ success: false, message: '서버 설정 오류: JWT_SECRET_KEY가 설정되지 않았습니다.' }, { status: 500 })
  }

  const { token } = await request.json()

  try {
    jwt.verify(token, SECRET_KEY)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Token verification failed:', error)
    return NextResponse.json({ success: false, message: '토큰 검증 실패' }, { status: 401 })
  }
}