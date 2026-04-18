"use client";

import GradientText from "../ui/GradientText";
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
        <GradientText>PDF</GradientText>
      </span>
    </div>
  );
}
