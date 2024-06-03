'use client';
import Image from 'next/image';
import LinkedInLogo from '@/public/linkedin-black-128.png';
import GitHubLogo from '@/public/github-logo.png';
import LinkedInIcon from '@/public/linkedin-mark.png';
import GithubIcon from '@/public/github-mark.png';
import PortfolioIcon from '@/public/portfolio-black.png';

// const logosClipboards = [
//   { name: 'LinkedIn', logo: LinkedInLogo, icon: LinkedInIcon, link: 'https://www.linkedin.com/in/haverho/' },
//   { name: 'Github', logo: GitHubLogo, icon: GithubIcon, link: 'https://github.com/haverh' },
//   { name: 'Portfolio', icon: PortfolioIcon, link: }
// ]

const logosClipboards = [
  { name: 'LinkedIn', logo: LinkedInLogo, icon: LinkedInIcon },
  { name: 'Github', logo: GitHubLogo, icon: GithubIcon },
  { name: 'Portfolio', logo: 'Portfolio', icon: PortfolioIcon }
]

const copyLink = (link: string) => {
  navigator.clipboard.writeText(link);
}

export default function ClipBoardLinks({
  links
}: {
  links: any
}) {
  console.log(links['linkedin'])
  return (
    <div className="flex gap-2 md:flex-col">
      {logosClipboards.map((clip) => {
        const alt = `${clip.name} Brand/Logo`;
        const type = clip.name.toLowerCase()
        console.log(links[type].length)

        if ( links[type].length > 0 ) {
          return (
            <button 
              key={clip.name}
              className="w-[48px] h-[48px] bg-white flex justify-center items-center rounded hover:bg-yellow-100 md:w-full"
              onClick={() => copyLink(links[type])}
            >
              {clip.name !== 'Portfolio' ? <Image src={clip.logo} alt={alt}
                width={70}
                height={35}
                className='hidden md:block'
              /> : <p className='w-[70px] font-bold hidden md:block'>Portfolio</p>}

              <Image src={clip.icon} alt={alt}
                width={35}
                height={35}
                className='md:hidden'
              />
            </button>
          );
        }
      })}
    </div>
  )
}