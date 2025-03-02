"use client"

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Tag from '@/components/ui/Tag'
import { Tag as TagType } from '@/app/types/media.type'

// TagItem 컴포넌트 정의
const TagItem: React.FC<{ tag: TagType, onUpdate: (id: string, title: string, color: string) => void, onDelete: (id: string) => void }> = ({ tag, onUpdate, onDelete }) => {
    const [editTitle, setEditTitle] = useState(tag.title)
    const [editColor, setEditColor] = useState(tag.color ?? '#000000')
  
    return (
      <li className="flex flex-col items-start mb-2">
        <div className="flex flex-col">
          <div className="mb-1">
            <span className="text-sm text-gray-500 mr-2">원본:</span>
            <Tag title={tag.title} color={tag.color} />
          </div>
          <div>
            <span className="text-sm text-gray-500 mr-2">미리보기:</span>
            <Tag title={editTitle} color={editColor} />
          </div>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border px-2 py-1"
          />
          <input
            type="color"
            value={editColor}
            onChange={(e) => setEditColor(e.target.value)}
            className="mx-2"
          />
          <button onClick={() => onUpdate(tag.id, editTitle, editColor)} className="bg-blue-500 text-white px-2 py-1">수정</button>
          <button onClick={() => onDelete(tag.id)} className="bg-red-500 text-white px-2 py-1 ml-2">삭제</button>
        </div>
      </li>
    )
  }
const TagManager: React.FC = () => {
  const { refresh } = useRouter();
  const [newTagTitle, setNewTagTitle] = useState('')
  const [newTagColor, setNewTagColor] = useState('#000000')
  const [tags, setTags] = useState<TagType[]>([])
  const fetchTags = async () => {
    const response = await fetch('/api/v1/tags')
    if (response.ok) {
      const data = await response.json()
      setTags(data)
    } else {
      console.error('Error fetching tags')
    }
  }
  // 태그 목록 가져오기
  useEffect(() => {
    fetchTags()
  }, [refresh])

  // 태그 추가 함수
  const addTag = async () => {
    const response = await fetch('/api/v1/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTagTitle, color: newTagColor }),
    })
    if (response.ok) {
      fetchTags()
    } else {
      console.error('Error adding tag')
    }
  }

  // 태그 수정 함수
  const updateTag = async (id: string, title: string, color: string) => {
    const response = await fetch(`/api/v1/tags`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, color }), // id를 body에 포함
    })
    if (response.ok) {
      fetchTags()
    } else {
      console.error('Error updating tag')
    }
  }

  // 태그 삭제 함수
  const deleteTag = async (id: string) => {
    const response = await fetch(`/api/v1/tags`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }), // id를 body에 포함
    })
    if (response.ok) {
      fetchTags()
    } else {
      console.error('Error deleting tag')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">태그 관리</h2>
      <div>
        <span className="text-sm text-gray-500 mr-2">미리보기:</span>
        <Tag title={newTagTitle} color={newTagColor} />
      </div>
      <div className="mb-4 mt-2">
        <input
          type="text"
          placeholder="태그 제목"
          value={newTagTitle}
          onChange={(e) => setNewTagTitle(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="color"
          value={newTagColor}
          onChange={(e) => setNewTagColor(e.target.value)}
          className="mr-2"
        />
        <button onClick={addTag} className="bg-green-500 text-white px-2 py-1">추가</button>
      </div>
      <ul>
        {tags.map(tag => (
          <TagItem key={tag.id} tag={tag} onUpdate={updateTag} onDelete={deleteTag} />
        ))}
      </ul>
    </div>
  )
}

export default TagManager