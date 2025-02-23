'use client'

import { useState, useEffect } from 'react'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (token) {
      verifyToken(token)
    } else {
      setMessage('로그인이 필요합니다.')
      setIsLoading(false)
    }
  }, [])

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/v1/login/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()
      if (data.success) {
        setIsAuthenticated(true)
      } else {
        setMessage('로그인이 필요합니다.')
        localStorage.removeItem('authToken')
      }
    } catch (error) {
      console.error('Error verifying token:', error)
      setMessage('서버 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">로딩 중...</h1>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const username = (form.elements.namedItem('username') as HTMLInputElement).value
            const password = (form.elements.namedItem('password') as HTMLInputElement).value

            const response = await fetch('/api/v1/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            })

            const data = await response.json()
            if (data.success) {
              localStorage.setItem('authToken', data.token)
              setIsAuthenticated(true)
              setMessage('')
            } else {
              setMessage(data.message)
            }
          }}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <div className="mb-4">
            <label className="block text-gray-700">사용자 이름</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">비밀번호</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">로그인</button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    )
  }

  return <>{children}</>
}