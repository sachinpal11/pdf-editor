"use client";

import { useRouter } from "next/navigation";

export default function Logo() {

  const router = useRouter();


  const handleClick = () => {
    router.push('/');
  }
  return (
    <div className="flex items-center gap-[10px]">
      <span onClick={handleClick} className="text-[16px] cursor-pointer font-medium leading-none">
        <span className="text-white">OnTheGo</span>
        <span 
          style={{ 
            background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >PDF</span>
      </span>
    </div>
  );
}
