'use client';

import { Tag as TagType } from "@/app/types/media.type"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Tag from "@/components/ui/Tag";

interface TagMapperProps {
    tags: TagType[];
    mediaId: string;
}


export default function TagMapper(props: TagMapperProps) {
    const { tags, mediaId } = props;
    const matchTagToMedia = async (mediaId: string, tagId: string) => {
        try {
          const response = await fetch('/api/v1/media-tags', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mediaId, tagId }),
          })
          if (!response.ok) {
            throw new Error('Failed to match tag to media')
          }
        } catch (error) {
          console.error('Error matching tag to media:', error)
        }
      }

    return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="bg-gray-500 text-white px-2 py-1">태그 추가</button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>태그 선택</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {tags.map(tag => (
        <DropdownMenuItem key={tag.id} onClick={() => matchTagToMedia(mediaId, tag.id)}>
            {<Tag title={tag.title} color={tag.color} />}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
}