'use client';
import Image from 'next/image';
import LinkedIn from '@/public/linkedin-black-128.png';
import GitHub from '@/public/github-logo.png'

const Clipboards = [
  { name: 'LinkedIn', img: LinkedIn, link: 'https://www.linkedin.com/in/haverho/' },
  { name: 'Github', img: GitHub, link: 'https://github.com/haverh' }
]

const copyLink = (link: string) => {
  navigator.clipboard.writeText(link);
}

export default function ClipBoardLinks() {
  return (
    <div className="flex flex-row w-full">
      {Clipboards.map((clipboard) => {
        const alt = `${clipboard.name} Brand`;
        return (
          <button 
            key={clipboard.name}
            className="w-1/2 bg-white flex justify-center items-center rounded hover:bg-gray-200"
            onClick={() => copyLink(clipboard.link)}
          >
            <Image src={clipboard.img} alt={alt}
              width={100}
              height={35}
            />
          </button>
        );
      })}
    </div>
  )
}