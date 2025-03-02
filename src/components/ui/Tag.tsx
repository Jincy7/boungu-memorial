import React from 'react'

// Tag 컴포넌트의 props 타입 정의
type TagProps = {
  title: string
  color?: string
}

// Tag 컴포넌트 정의
const Tag: React.FC<TagProps> = ({ title, color }) => {
  return (
    <div
      className="inline-block px-2 py-0.5 border rounded-md text-xs font-medium"
      style={{
        borderColor: color || '#000',
        color: color || '#000',
      }}
    >
      {title}
    </div>
  )
}

export default Tag