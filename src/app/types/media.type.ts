// MediaType 열거형 정의
export enum MediaType {
    Image = 'image',
    Video = 'video',
  }
  
  // MediaMetadata 모델 타입 정의
  export type MediaMetadata = {
    id: string
    timestamp: Date
    title: string
    description?: string
    mediaSrc: string
    type: MediaType
    mediaTags: MediaTags[]
  }
  
  // Tag 모델 타입 정의
  export type Tag = {
    id: string
    title: string
    description?: string
    mediaTags: MediaTags[]
  }
  
  // MediaTags 모델 타입 정의
  export type MediaTags = {
    id: string
    media: MediaMetadata
    mediaId: string
    tag: Tag
    tagId: string
  }