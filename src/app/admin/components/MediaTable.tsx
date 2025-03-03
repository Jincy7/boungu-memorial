'use client';

import { Input } from "@/components/ui/input"
import { MediaMetadata } from '@/app/types/media.type'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import Image from 'next/image';

type MediaTableProps = {
  mediaItems: MediaMetadata[]
}

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || ''

export default function MediaTable({ mediaItems }: MediaTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>('')

  // 검색어에 따라 mediaItems 필터링
  const filteredMediaItems = mediaItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="w-full max-w-4xl overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">미디어 테이블</h2>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <Table className="hidden md:table min-w-full bg-white table-fixed">
        <TableCaption>미디어 항목 목록</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 w-1/6">제목</TableHead>
            <TableHead className="py-2 min-w-[200px] w-2/6">설명</TableHead>
            <TableHead className="py-2 w-1/6">타입</TableHead>
            <TableHead className="py-2 min-w-[200px] w-2/6">미리보기</TableHead>
            <TableHead className="py-2 w-1/6">날짜</TableHead>
            <TableHead className="py-2 min-w-[200px] w-2/6">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMediaItems.map((item: MediaMetadata) => (
            <TableRow key={item.id}>
              <TableCell className="border px-4 py-2">{item.title}</TableCell>
              <TableCell className="border px-4 py-2">{item.description}</TableCell>
              <TableCell className="border px-4 py-2">{item.type}</TableCell>
              <TableCell className="border px-4 py-2">
                {
                  item.type === 'image' 
                    ? <Image width={300} height={300} src={`${CDN_URL}${item.media_src}`} alt={item.title} className="w-32 h-32 object-cover" /> 
                    : <video src={`${CDN_URL}${item.media_src}`} controls className="w-32 h-32 object-cover" />
                }
              </TableCell>
              <TableCell className="border px-4 py-2">{item.timestamp.toString()}</TableCell>
              <TableCell className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2">수정</button>
                <button className="bg-red-500 text-white px-2 py-1">삭제</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 모바일 카드 레이아웃 */}
      <div className="block md:hidden">
        {filteredMediaItems.map((item: MediaMetadata) => (
          <Card key={item.id} className="mb-4">
            <CardHeader>
              <CardTitle>{item.description}</CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div className="flex-shrink-0">
                {
                  item.type === 'image' 
                    ? <Image width={300} height={300} src={`${CDN_URL}${item.media_src}`} alt={item.title} className="w-32 h-32 object-cover" /> 
                    : <video src={`${CDN_URL}${item.media_src}`} controls className="w-32 h-32 object-cover" />
                }
              </div>
              <div className="flex-grow ml-4">
                <CardDescription>{item.title}</CardDescription>
                <p className="text-sm text-gray-500">{item.timestamp.toString()}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <button className="bg-blue-500 text-white px-2 py-1">수정</button>
              <button className="bg-red-500 text-white px-2 py-1">삭제</button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}