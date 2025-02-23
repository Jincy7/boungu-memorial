import React from 'react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  return (
    <div className={`inline-block ${sizeClasses[size]} border-4 border-t-transparent border-blue-500 rounded-full animate-spin`}></div>
  )
}