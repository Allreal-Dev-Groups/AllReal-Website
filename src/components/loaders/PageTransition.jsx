"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLoader } from "@/store/loaderStore";

export default function PageTransition() {
  const pathname = usePathname();
  const [currentpath, setcurrentpath] = useState("");
  const { reset } = useLoader();
  useEffect(() => {
    if (currentpath != pathname) reset();
    setcurrentpath(pathname);
  }, [pathname]);

  return null;
}
