import { useParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { useTea } from "~/drinktea/tea";

export const useRecordScrollPositionAtToSeeList = () => {
  const { cate, keyword } = useParams();
  const data_key = `to-see-list`;

  const [scroll_pos, set_scroll_pos] = useTea.scroll_pos()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const scroll_box = scrollRef.current as HTMLElement | null

    if (scroll_box) {
      scroll_box.scrollTo(0, scroll_pos[data_key] || 0)
    }

  }, [cate, keyword])

  const record_pos = () => {
    const list_container = scrollRef.current as HTMLElement | null

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


