import { useTea } from "~/drinktea/tea";
import { google_login, user_willingness_check } from "../tool/google-login";
import { debounce } from "~/tool/debounce";
import { ToSeeData } from "~/interface/to-see-data";
import { useParams } from "@remix-run/react";
import { app_confirm } from "~/tool/app-confirm";
import { is_child_inside_parent } from "~/tool/is-child-inside-parent";
import { is_my_error } from "~/interface/error";
import { app_alert } from "~/tool/app-alert";
import { optimistic_handle_num } from "~/config/optimistic-handle-num";
import { post_error } from "~/api/post-error";



const Collect = (props: { style?: React.CSSProperties, className?: string; video_data: ToSeeData }) => {
  const { className = "", video_data, style = {} } = props;
  const [to_see_list_map, set_to_see_list_map] = useTea.to_see_list_map();
  const [my_to_see_list = [], set_my_to_see_list] = useTea.my_to_see_list();
  const [is_removing, set_is_removing] = useTea.is_removing();
  const [uid] = useTea.user_id();
  const { tab } = useParams();
  const is_collected = to_see_list_map.has(`${video_data.id}`);

  /* ---------- */

  const recovery_optimistic = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!uid || !!tab) return;

    let target = e.target as HTMLElement | null;
    while (target && target.tagName.toLowerCase() !== "svg") {
      target = target.parentElement;
    }
    if (target) {
      target.classList.toggle("active");
    }
  };

  const update_to_see_list = (data_stored: ToSeeData) => {
    if (!!my_to_see_list) {
      if (is_collected) {
        const index = my_to_see_list.findIndex(
          ({ id }) => id === video_data.id
        );

        const newList = [
          ...my_to_see_list.slice(0, index),
          ...my_to_see_list.slice(index + 1),
        ];

        setTimeout(() => {
          set_my_to_see_list(newList);
        }, 300);
      } else {
        set_my_to_see_list((prev) => [...(prev || []), { ...data_stored }]);
      }
    }
  };

  const update_set = () => {
    set_to_see_list_map((prev_set) => {
      const new_set = new Set(prev_set);

      if (is_collected) {
        new_set.delete(`${video_data.id}`);
      } else {
        new_set.add(`${video_data.id}`);
      }

      return new_set;
    });
  };

  const hot_update = (data_stored: ToSeeData) => {
    update_set();
    update_to_see_list(data_stored);
    set_is_removing(false);
  };

  const post_api = async () => {
    const data_stored = {
      ...video_data,
      user_id: uid,
      collect_date: new Date().valueOf(),
      debug: window?.collect_debug
    };

    set_is_removing(true);
    const response = await fetch(is_collected ? "/delete-card" : "/add-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: is_collected
        ? JSON.stringify({
            user_id: uid,
            item_id: video_data.id,
          })
        : JSON.stringify(data_stored),
    }).then((r) => r.json());

    return { response, data_stored };
  };

  const make_optimistic = (
    e: React.MouseEvent<HTMLButtonElement>,
    is_recovery?: boolean
  ) => {
    const tran_time = getComputedStyle(document.documentElement).getPropertyValue('--transition-time').trim()
    const gap = Number(getComputedStyle(document.documentElement).getPropertyValue('--general-gap').replace('px', ''))
    const page_margin = Number(getComputedStyle(document.documentElement).getPropertyValue('--page-margin').replace('px', ''))

    let target = e.target as HTMLElement;

    while (target.tagName !== "DIV") {
      target = target.parentNode as HTMLElement;
      if (!target) return;
    }

    target.style.transition = tran_time
    target.style.transform = is_recovery ? "" : "translateY(-50%) scale(0.5)";
    target.style.opacity = is_recovery ? "" : "0";
    target.style.overflow = 'hidden'

    const container = target.parentNode as HTMLElement;

    let next_sibling = target.nextSibling;
    let card_num = 0


    while (
      next_sibling &&
      next_sibling instanceof HTMLElement &&
      next_sibling.classList.contains("video-card") &&
      card_num <= optimistic_handle_num
    ) {

      if (next_sibling instanceof HTMLElement) {
        const just_move_to_left = is_child_inside_parent(
          next_sibling,
          container
        );
        next_sibling.style.transition = tran_time
        next_sibling.style.overflow = 'hidden'

        if (just_move_to_left) {
          next_sibling.style.transform = is_recovery
            ? ""
            : `translateX(-${target.getBoundingClientRect().width + gap}px)`;
        } else {
          next_sibling.style.transform = is_recovery
            ? ""
            : `translate(${
                window.innerWidth -
                next_sibling.getBoundingClientRect().left -
                page_margin -
                next_sibling.getBoundingClientRect().width
              }px, -${next_sibling.getBoundingClientRect().height + gap}px)`;
        }
      }

      next_sibling = next_sibling.nextSibling;
      card_num ++ 
    }
  };

  const clickToCollectOrDelete = debounce(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (is_removing) {
        await app_alert({content: "網路繁忙中, 請稍候"})
        return;
      }

      if (!!tab && tab === "to-see-list") {
        const remove = await app_confirm({ content: "要移除這部影片嗎？" });
        if (!remove) return;
        make_optimistic(e);
      }

      try {
        const { response, data_stored } = await post_api();
        if (response.ok) {
          hot_update(data_stored);
        } else {
          await app_alert({content:`${response.message}。 \n 錯誤碼: ${response.code}` })
          recovery_optimistic(e);
          make_optimistic(e, true);
          set_is_removing(false);
        }
      } catch (error: unknown) {
        if (is_my_error(error)) {
          await app_alert({content:`${error?.message}。 \n 錯誤碼: ${error?.code}` })
        } else {
          await app_alert({content:`${error}` })
        }

        recovery_optimistic(e);
        make_optimistic(e, true);
        post_error(error)
        set_is_removing(false);
      }

       
    },
    tab === "to-see-list" ? 0 : 300
  );

  /* ---------- */

  const clickToOptimistic = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!uid || !!tab || is_removing) return;
    e.currentTarget.classList.toggle("active", !is_collected);
  };

  /* ---------- */

  return (
    <>
    <button
      onClick={!uid ? async () => {
        const user_want_to = await user_willingness_check('登入後才可以收藏電影喔！')
        if (!user_want_to) return 
        google_login()
      }: clickToCollectOrDelete}
      aria-label="Collect button"
      className={
        "collect-btn flex items-center justify-center bg-[--bg] text-white text-[32px] rounded-full absolute fone:top-[5%] fone:right-[4%] desk:top-[15px] desk:right-[15px] w-[20.1%] h-[13.45%] " +
        className
      }
      style={style}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="100"
        height="100"
        className={`relative icon ${is_collected ? "active" : ""} z-[2]`}
        onClick={clickToOptimistic}
      >
        <line
          x1="30"
          y1="50"
          x2="70"
          y2="50"
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
          className="horizontal"
        />

        <line
          x1="50"
          y1="30"
          x2="50"
          y2="70"
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
          className="vertical"
        />

        <polyline
          points="30,50 45,65 75,35"
          stroke="black"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          className="check"
        />
      </svg>
    </button>

    </>
  );
};

export default Collect;
