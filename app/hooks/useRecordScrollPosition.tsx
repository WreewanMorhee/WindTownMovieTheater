import { useParams } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { is_mobile } from "~/config/is-mobile.client";
import { useTea } from "~/drinktea/tea";



export const useRecordScrollPosition = () => {
  const { cate, keyword } = useParams();
  const data_key = `${cate}-${keyword}`;



  const [scroll_pos, set_scroll_pos] = useTea.scroll_pos()
  const scrollRef = useRef(null)
  useEffect(() => {
    const scroll_box = is_mobile ? scrollRef.current : document.querySelector('html')

    if (scroll_box) {
      scroll_box.scrollTo(0, scroll_pos[data_key] || 0)
    }

  }, [cate, keyword])

  const record_pos = () => {
    const list_container = is_mobile ? scrollRef.current : document.querySelector('html')

    if (list_container) {
      set_scroll_pos((prev) => ({
        ...prev,
        [data_key]: list_container.scrollTop,
      }));
    }
  }
  useEffect(() => {
    window.addEventListener('click', record_pos)

    return () => {
      window.removeEventListener('click', record_pos)
    }
  }, [cate, keyword])


  return scrollRef
}


