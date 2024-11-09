import {  useLocation, useParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { is_mobile } from "~/config/is-mobile.client";
import { useTea } from "~/drinktea/tea";

export const useScrollHideHeader = () => {

  const scrollHeaderRef = useRef<HTMLElement | null>(null)
  const [scroll_down, set_scroll_down] = useTea.scroll_down()
  useEffect(() => {
    let lastScroll = scrollHeaderRef?.current?.scrollTop || 0;

    const scroll_func = () => {
      if (!scrollHeaderRef.current) return 
      const header = document.querySelector("header") as HTMLElement;
      const currentScroll = scrollHeaderRef.current.scrollTop;
    
      if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
        set_scroll_down(true)
      } else if (currentScroll < lastScroll) {
        set_scroll_down(false)
      }
  
      lastScroll = currentScroll;
    }

    

    if (scrollHeaderRef.current && is_mobile) {
      scrollHeaderRef.current.addEventListener("scroll", scroll_func);
    }

    return () => {
      if (scrollHeaderRef.current && is_mobile) {
        scrollHeaderRef.current.removeEventListener("scroll", scroll_func);
      }
    }

  }, [scrollHeaderRef])

  return {scroll_down, scrollHeaderRef}
}
