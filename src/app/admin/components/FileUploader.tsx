'use client'

import { Spinner } from '@/app/components/Spinner'
import { useState } from 'react'
import { toast } from 'sonner'

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'image' | 'video'>('image')
  const [timestamp, setTimestamp] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      generatePreview(selectedFile)

      // 파일 메타데이터를 사용하여 폼 자동완성
      setDescription(selectedFile.name)
      setTimestamp(new Date(selectedFile.lastModified).toISOString().split('T')[0]) // YYYY-MM-DD 형식으로 설정
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0]
      setFile(selectedFile)
      generatePreview(selectedFile)
    }
  }

  const generatePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('type', type)
      formData.append('timestamp', new Date(timestamp).toISOString())

      try {
        const response = await fetch('/api/v1/media', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          console.error('Failed to upload media')
          toast('업로드 실패')
        } else {
          console.log('Media uploaded successfully')
          toast('업로드 성공')
          resetForm();
        }
      } catch (error) {
        console.error('Upload error:', error)
        toast('업로드 중 오류 발생')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const resetForm = () => {
    setFile(null)
    setTitle('')
    setDescription('')
    setType('image')
    setTimestamp('')
    setPreview(null)
  }

  return (
    <div className="mb-6 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-2">파일 업로드</h2>
      <div className="flex space-x-4">
        {/* 파일 드롭존 */}
        <div
          className={`flex-1 border-2 ${isDragging ? 'border-blue-500' : 'border-gray-300'} border-dashed rounded-lg p-4 flex items-center justify-center`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer">
            {file ? file.name : '파일을 여기에 드롭하거나 클릭하여 선택하세요'}
          </label>
        </div>
        {/* 폼 영역 */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2"
            required
          />
          <textarea
            placeholder="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2"
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value as 'image' | 'video')} className="border p-2">
            <option value="image">이미지</option>
            <option value="video">비디오</option>
          </select>
          <input
            type="date"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="border p-2"
            required
          />
          <button
            type="submit"
            className={`px-4 py-2 text-white ${isLoading ? 'bg-gray-500' : 'bg-blue-500'}`}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : '업로드'}
          </button>
        </form>
      </div>
      {/* 미리보기 영역 */}
      {preview && (
        <div className="mt-4">
          {type === 'image' ? (
            <img src={preview} alt="미리보기" className="max-w-full h-auto" />
          ) : (
            <p>비디오 파일이 선택되었습니다.</p>
          )}
        </div>
      )}
    </div>
  )
}