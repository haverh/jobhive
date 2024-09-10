'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {useTheme} from '../ThemeContext';

import LinkedInLogo from '@/public/linkedin-logo-dark.png';
import GitHubLogo from '@/public/github-logo-dark.png';
import LinkedInIcon from '@/public/linkedin-mark-dark.png';
import GithubIcon from '@/public/github-mark-dark.png';
import PortfolioIcon from '@/public/portfolio-black.png';

import LinkedInLogoDark from '@/public/linkedin-logo-blue.png';
import GitHubLogoDark from '@/public/github-logo-light.png';
import GithubIconDark from '@/public/github-mark-light.png';
import LinkedInIconDark from '@/public/linkedin-mark-blue.png';
import PortfolioIconDark from '@/public/portfolio-mark-blue-2.png';

const logosClipboards = [
  { name: 'LinkedIn', logoDark: LinkedInLogoDark, iconDark: LinkedInIconDark, logo: LinkedInLogo, icon:LinkedInIcon },
  { name: 'Github', logoDark: GitHubLogoDark, iconDark: GithubIconDark, logo: GitHubLogo, icon:GithubIcon },
  { name: 'Portfolio', logoDark: 'Portfolio', iconDark: PortfolioIconDark, logo: 'Portfolio', icon: PortfolioIcon }
]

const copyLink = (link: string) => {
  navigator.clipboard.writeText(link);
}

export default function ClipBoardLinks({
  links
}: {
  links: any
}) {
  const [noLinks, setNoLinks] = useState(false);
  const {theme} = useTheme();
  
  useEffect(() => {
    if (links.linkedin?.length > 0 || links.github?.length > 0 || links.portfolio?.length > 0) {
      setNoLinks(false);
    } else {
      setNoLinks(true);
    }
  },[links])

  return (
    <div className="flex items-center justify-center gap-2 md:flex-col p-2">
      {logosClipboards.map((clip) => {
        const alt = `${clip.name} Brand/Logo`;
        const type = clip.name.toLowerCase()

        if ( links[type]?.length > 0 ) {
          
          return (
            <button 
              key={clip.name}
              className="bg-white dark:bg-[#1F1F1F] h-[40px] flex justify-center items-center rounded hover:bg-yellow-100 md:h-[48px]"
              onClick={() => copyLink(links[type])}
            >
              {clip.name !== 'Portfolio' ? <Image src={theme === 'dark' ? clip.logoDark : clip.logo } alt={alt}
                className='m-1 w-[70px] h-auto hidden md:block'
              /> : <p className='w-[70px] font-bold hidden md:block'>Portfolio</p>}
          
              <Image src={theme === 'dark' ? clip.iconDark : clip.icon} alt={alt}
                className='size-[40px] h-auto md:hidden'
              />
            </button>
          );
        }
      })}
      {noLinks && <div className='py-2 px-4 text-center text-xs sm:text-xs md:text-base'>
        <h3>Setup up your links at <b>Settings &gt; Links</b></h3>
      </div>}
    </div>
  )
}