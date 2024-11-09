import { ReactElement, useEffect, useRef, useState } from "react";
import { useTea } from "~/drinktea/tea";
import VideoTimeIndicator from "./VideoTimeIndicator";
import { formmater_date } from "~/tool/formatter-date";
import { app_confirm } from "~/tool/app-confirm";
import { useParams } from "@remix-run/react";
import { CommentItemType } from "~/interface/comment-item";
import { is_my_error } from "~/interface/error";
import { app_alert } from "~/tool/app-alert";


const extract_times = (s: string): string[] | [] => {
  const pattern = /\b\d{1,2}:\d{2}(:\d{2})?\b/g;
  const matches = s.match(pattern);
  return matches || [];
};

const set_time_comp = (content: string) => {
  let visited_content = content;
  let new_content: (string | ReactElement)[] = [];

  if (!!extract_times(content).length) {
    extract_times(content).forEach((i, index, arr) => {
      const [prev = "", after = ""] = visited_content.split(i);
      new_content = [
        ...new_content,
        prev,
        <VideoTimeIndicator key={i} text={i} />,
      ];
      visited_content = after;

      if (index === arr.length - 1) {
        new_content = [...new_content, after];
      }
    });
  } else {
    new_content = [content];
  }

  return new_content;
};

const CommentItem: React.FC<CommentItemType> = ({
  src,
  name,
  like_count,
  content,
  publish = "",
  children,
  user_id,
  comment_id,
}) => {
  const new_content = set_time_comp(content);
  const [uid] = useTea.user_id();
  const {id: vid = ''} = useParams()
  const [items = [], set_items] = useTea.comment_list_data[vid].list()
  const [is_deleting = [], set_is_deleting] = useTea.is_deleting()

  const [tran_end, set_tran_end] = useState(false)
  const [res_ok, set_res_ok] = useState(false)
  useEffect(() => {
    if (tran_end && res_ok) {
      host_update()
      set_res_ok(false)
      set_tran_end(false)
    }
  }, [tran_end, res_ok])


  const host_update = () => {
    const delete_index = items.findIndex(({id}) => id === comment_id)
    const newList = [
      ...items.slice(0, delete_index),
      ...items.slice(delete_index + 1),
    ]
    set_items(newList)
  }

  const post_api = async () => {
    set_is_deleting(true)
    const response = await fetch("/delete-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vid, cid: comment_id, debug: window?.comment_debug }),
    }).then(r => r.json())

    return response
  }

  const make_optimistic = (e: React.MouseEvent<HTMLDivElement>, is_recovery?: boolean) => {
    const _target = e.target as HTMLElement | null;

    if (_target?.parentNode?.parentNode instanceof HTMLElement) {
      const target = _target.parentNode.parentNode as HTMLElement;
      target.style.transition =  getComputedStyle(document.documentElement).getPropertyValue('--transition-time').trim()
      target.style.transform = is_recovery ? '' : `translateX(100%)`;
      target.style.opacity = is_recovery ? '' :  "0";

      let nextSibling = target.nextElementSibling as HTMLElement | null;
      while(nextSibling) {
        nextSibling.style.transition = getComputedStyle(document.documentElement).getPropertyValue('--transition-time').trim()
        nextSibling.style.transform = is_recovery ? '' :  `translateY(-${target.getBoundingClientRect().height + 16}px)`

        nextSibling = nextSibling.nextElementSibling as HTMLElement | null
      }
    }
  }

  const clickToDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (is_deleting) {
      await app_alert({content: "網路繁忙中, 請稍候"})
      return 
    }

    const is_delete = await app_confirm({ content: "確定刪除此留言嗎?" });

    if (is_delete) {
      make_optimistic(e)

      try {
        const response = await post_api()

        if (response.ok) {
          set_res_ok(true)
        } else {
          await app_alert({content: `${response.message}。錯誤碼: ${response.code}`})
          make_optimistic(e, true)
        }
      } catch (error: unknown) {
        if (is_my_error(error)) {
          await app_alert({content: `${error?.message}。錯誤碼: ${error?.code}`})
        } else {
          await app_alert({content: `${error}`})
        }
        make_optimistic(e, true)
      }

      set_is_deleting(false)
    }
  };

  return (
    <li onTransitionEnd={() => set_tran_end(true)} className="items-start self-baseline flex flex-col shrink-0 mt-[16px] ">
      <div className="self-baseline flex flex-col shrink-0 border-[1px] border-[rgba(150,150,150,1)] rounded-[--rounded] px-[--comp-padding] py-[--comp-little-padding] pr-[32px] ">
        <div className="flex fone:flex-wrap desk:flex-nowrap">
          <div
            style={{
              backgroundImage: `url(${src})`,
            }}
            className="w-[30px] min-h-[30px] h-[30px] bg-[#3A3A3A] bg-no-repeat bg-cover bg-center rounded-full "
          />

          <div
            className="pt-[3px] max-w-[150px] overflow-hidden block text-ellipsis cursor-pointer whitespace-pre ml-[8px] font-bold h-[30px] text-[16px] text-[#D1D1D1]"
          >
            {name}
          </div>

          <div className="items-center flex ml-[18px] w-auto h-[30px] text-[16px] text-[#A1A1A1]">
            <div className="mr-[4px] w-[20px] min-w-[20px] h-[20px] bg-center bg-cover bg-no-repeat bg-[url(/assets/love.webp)]" />
            {like_count}
          </div>

          <div className="whitespace-pre flex items-center fone:ml-[38px] desk:ml-[16px] fone:w-[100%] desk:w-auto h-[30px] text-[16px] text-[#A1A1A1]">
            {formmater_date(publish)}
          </div>
        </div>
        <div>
          <div className="break-all [&>a]:text-[#4A90E2] [&>span]:cursor-pointer [&>span]:text-[#4A90E2] ml-[38px] text-[16px] text-[#BFBFBF] whitespace-break-spaces">
            {new_content}
          </div>
        </div>

        {!!uid && user_id === uid && comment_id !== 'hot-update' && (
          <div
            onClick={clickToDelete}
            className="cursor-pointer bg-cover bg-center bg-no-repeat bg-[image:url(/assets/trashcan.webp)] mt-[8px] ml-auto w-[35px] h-[35px] bg-[#3e3e3e] rounded-full flex items-center justify-center"
          />
        )}
      </div>

      {children}
    </li>
  );
};

export default CommentItem;
