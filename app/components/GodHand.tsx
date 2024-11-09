import { useEffect, useRef, useState } from "react";
import SlotMachine from "~/components/SlotMachine/SlotMachine";
import VideoCard from "~/components/VideoCard";
import { useTea } from "~/drinktea/tea";

const time_to_show_card = 2500

const GodHand = ({
  set_turn_on_slot,
  toggle_filter,
}: {
  toggle_filter: (value: boolean) => void;
  set_turn_on_slot: (value: boolean) => void;
}) => {
  const [my_to_see_list = []] = useTea.my_to_see_list();
  const [final_val, set_final_val] = useState("");
  const [show_card, set_show_card] = useState(false)

  const video_god_choose = my_to_see_list[Number(final_val) - 1] || {};


  const timer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!!final_val) {
      timer.current = setTimeout(() => {
        set_show_card(true)

        if (!!timer.current) {
          clearTimeout(timer.current)
          timer.current = null
        }
      }, time_to_show_card)
    }
  }, [final_val])

  return (
    <>
        <div
          onClick={() => {
            toggle_filter(false);
          }}
          className={
            "relative w-[300px] relative grid grid-cols-1 fone:mt-[32px] desk:mt-0 " +
            (!!show_card ? " animate-[flip_0.8s_ease-in]" : "")
          }
        >
          {!!show_card && <VideoCard {...video_god_choose} />}

          <div onClick={e => e.stopPropagation()} className="w-[80px] h-[80px] absolute top-[0px] right-[0px] bg-red" />
        </div>

        <div
          className={
            "mt-[10vh] flex-col text-[#ffffff] text-[32px] flex items-center justify-center"
          }
        >
          <SlotMachine set_show_card={set_show_card} set_final_val={set_final_val} final_val={final_val} />

          <div className="px-[--page-margin] mt-[80px] flex items-center justify-center text-[24px]">
            {!!final_val
              ? `今天就來看 “${video_god_choose.title}” 吧！`
              : "選出最適合今天的你的電影！"}
          </div>
        </div>

        <div
          onClick={() => {
            set_turn_on_slot(false);
            toggle_filter(false);
          }}
          className="cursor-pointer bg-[length:50%_50%]  bg-center bg-no-repeat bg-[url(/assets/cross.webp)] fone:fixed desk:absolute w-[48px] h-[48px] top-[30px] right-[30px] bg-black rounded-full"
        />
    </>
  );
};

export default GodHand;
