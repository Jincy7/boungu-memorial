import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET_KEY

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!SECRET_KEY) {
    return NextResponse.json({ success: false, message: '서버 설정 오류' }, { status: 500 })
  }

  const envUsername = process.env.USERNAME
  const envPassword = process.env.PASSWORD

  if (username === envUsername && password === envPassword) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })
    return NextResponse.json({ success: true, token })
  } else {
    return NextResponse.json({ success: false, message: '잘못된 사용자 이름 또는 비밀번호' }, { status: 401 })
  }
}