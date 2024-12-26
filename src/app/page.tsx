import Image from 'next/image'
import { Memories } from './components/Memories'

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/v1/test`)
  const data = await response.json();
  console.log('Users:', data);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-white shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-extrabold text-center">봉구</h1>
                <div className="text-center">
                  <Image
                    src="/bonggu/main.jpeg?height=300&width=300"
                    alt="고양이 봉구"
                    width={300}
                    height={300}
                    className="rounded-full mx-auto"
                  />
                </div>
                <p className="text-center">
                  장난기 많던 막내 고양이 봉구
                  <br/>
                  8년간 짧지만 좋은 시간 함께해서 고마워
                  <br/>
                  이제는 편히 쉬길
                </p>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <Memories />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-8 text-center text-gray-500">
        <p>좋은 곳에서 편히 쉬길, 2016-2024</p>
      </footer>
    </div>
  )
}

