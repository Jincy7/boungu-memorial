import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

// BackButton 컴포넌트는 뒤로가기 버튼을 렌더링합니다.
const BackButton = () => {
  return (
    <Link href="/" className="mb-6 text-gray-900 hover:text-cyan-700 transition-colors duration-200 flex items-center" aria-label="홈으로 돌아가기" tabIndex={0}>
      <FaArrowLeft className="mr-2" aria-hidden="true" />
      <span>뒤로가기</span>
    </Link>
  )
}

export default BackButton
