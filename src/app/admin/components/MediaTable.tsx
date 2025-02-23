import { MediaMetadata } from '@/app/types/media.type'

type MediaTableProps = {
  mediaItems: MediaMetadata[]
}

export default function MediaTable({ mediaItems }: MediaTableProps) {
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-2">미디어 테이블</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">제목</th>
            <th className="py-2">설명</th>
            <th className="py-2">타입</th>
            <th className="py-2">URL</th>
            <th className="py-2">날짜</th>
            <th className="py-2">작업</th>
          </tr>
        </thead>
        <tbody>
          {mediaItems.map((item: MediaMetadata) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">{item.type}</td>
              <td className="border px-4 py-2">{item.mediaSrc}</td>
              <td className="border px-4 py-2">{item.timestamp.toString()}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2">수정</button>
                <button className="bg-red-500 text-white px-2 py-1">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}