// MediaType 열거형 정의
export enum MediaType {
  Image = 'image',
  Video = 'video',
}

// MediaMetadata 모델 타입 정의
export type MediaMetadata = {
  id: string
  timestamp: Date // TIMESTAMP(3)와 일치
  title: string
  description?: string
  media_src: string // media_src와 일치
  type: MediaType
  media_tags?: MediaTags[] // 선택적 필드로 변경
}

// Tag 모델 타입 정의
export type Tag = {
  id: string
  title: string
  description?: string
  color?: string
  media_tags?: MediaTags[] // 선택적 필드로 변경
}

// MediaTags 모델 타입 정의
export type MediaTags = {
  id: string
  media_id: string // MediaMetadata의 id와 연결
  tag_id: string // Tag의 id와 연결
  media?: MediaMetadata // 선택적 필드로 변경
  tag?: Tag // 선택적 필드로 변경
}