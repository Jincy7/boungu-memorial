import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export function Memories() {
    const memories = [
      "어릴때 무척 귀엽던 봉구",
      "가끔 이상한 곳에 몸을 던지던 봉구",
      "낚싯대 장난감을 물어 와선 빤히 쳐다보던 봉구",
    ];
  
    return (
      <div className="text-black">
        <Link href="/gallery">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                추억들
                <FaArrowRight className="ml-2" />
            </h2>
        </Link>
        
        <ul className="space-y-2">
          {memories.map((memory, index) => (
            <li key={index} className="bg-gray-50 p-3 rounded-lg">
              {memory}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  