import { useTea } from "~/drinktea/tea";
import { google_login, user_willingness_check } from "../tool/google-login";
import { useState } from "react";
import useEnterKeyPress from "~/hooks/useEnterKeyPress";
import { format_timestamp_to_ISO8601 } from "~/tool/time-trans";
import { useParams } from "@remix-run/react";
import { debounce } from "~/tool/debounce";
import { ThreadList } from "~/interface/thread";
import { app_alert } from "~/tool/app-alert";
import LoginElf from "./LoginElf";

const LeaveComment = () => {
  const { id: video_id = "" } = useParams();
  const [user_id] = useTea.user_id();
  const [avatar_src] = useTea.avatar_src();
  const [user_name] = useTea.user_name();
  const [text, set_text] = useState("");
  const [focus, set_focus] = useState<boolean>(false);
  const [, set_items] = useTea.comment_list_data[video_id].list();
  const [is_adding, set_is_adding] = useTea.is_adding();

  const hot_update = (id: string) => {
    set_items((prev) => [
      {
        ...prev[0],
        id,
      },
      ...prev.slice(1, prev.length),
    ]);
  };

  const post_api = async (data: {
    user_id: string;
    video_id: string;
    comment_data: Pick<ThreadList, "snippet">;
  }) => {
    set_is_adding(true);
    const response = await fetch("/add-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...data, debug: window?.comment_debug}),
    }).then((r) => r.json());
    set_is_adding(false);

    return response;
  };

  const make_optimistic = (data: ThreadList) => {
    set_text("");
    set_items((prev) => [{ ...data }, ...prev]);
  };

  const clickToAddComment = debounce(async () => {
    if (is_adding) {
      await app_alert({ content: "網路繁忙中, 請稍候" });
      return;
    }

    if (!!text) {
      const comment_data = {
        snippet: {
          topLevelComment: {
            snippet: {
              authorChannelId: { value: "dummy" },
              textDisplay: text,
              likeCount: 0,
              authorProfileImageUrl: avatar_src,
              authorDisplayName: user_name,
              publishedAt: format_timestamp_to_ISO8601(new Date()),
            },
          },
          totalReplyCount: 0,
        },
      };
      const data = {
        user_id,
        video_id,
        comment_data,
      };

      make_optimistic({
        user_id,
        id: "hot-update",
        ...comment_data,
      });

      const response = await post_api(data);

      if (response.ok) {
        hot_update(response.id);
      } else {
        await app_alert({
          content: `${response.message}。\n 錯誤碼: ${response.code}`,
        });
        set_items((prev) => [...prev.slice(1, prev.length)]);
      }
    }
  }, 300);

  useEnterKeyPress(() => {
    if (focus) {
      clickToAddComment();
    }
  });


  return (
    <>
      <div className="flex fone:w-[calc(100vw-32px)] desk:w-[calc(33vw-32px)]">
        <input
          onFocus={() => set_focus(true)}
          onBlur={() => set_focus(false)}
          onChange={(e) => set_text(e.target.value)}
          value={text}
          type="text"
          enterKeyHint="send"
          placeholder={!!user_id ? "留下你的評論！" : "登入後留言！"}
          className={
            "w-full py-2 px-4 rounded-[--rounded] border border-gray-300 focus:outline-none " +
            (!!user_id
              ? "focus:ring-2 focus:ring-[--yellow]"
              : "cursor-pointer border-gray-800 bg-gray-600 focus:ring-0 ")
          }
          onClick={async () => {
            if (!user_id) {
              const user_want_to = await user_willingness_check('登入後才可以留言喔！')
              if (!user_want_to) return 
              google_login()
            }
          }}
          readOnly={!user_id}
          tabIndex={!user_id ? -1 : 0}
        />

        <button
          onClick={
            !user_id
              ? async () => {
                const user_want_to = await user_willingness_check('登入後才可以留言喔！')
                if (!user_want_to) return 
                google_login()
              }
              : clickToAddComment
          }
          className={
            "ml-[8px] text-white py-[--comp-little-padding] px-[--comp-padding] rounded-[--rounded] whitespace-nowrap bg-[--btn-bg]"
          }
        >
          {!!user_id ? "送出" : "登入"}
        </button>
      </div>

    </>
  );
};

export default LeaveComment;
