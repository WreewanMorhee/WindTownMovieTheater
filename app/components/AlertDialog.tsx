import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
// import { micro_ani_time } from "~/config/microanitime";


const AlertDialog = ({
  content,
  yes,
  confirm_text = "確定",
}: {
  content: string;
  yes: () => void;
  confirm_text: string;
}) => {
  const micro_ani_time = Number(getComputedStyle(document.documentElement).getPropertyValue('--transition-time').trim().replace('s', ''))
  const [hide, set_hide] = useState(false);

  const clickToYes = () => {
    set_hide(true);
    setTimeout(yes, micro_ani_time * 1000);
  };


  const blackRef = useRef(null);
  const whiteRef = useRef(null);

  useEffect(() => {
    if (blackRef.current) {
      gsap.fromTo(
        blackRef.current,
        {
          alpha: 0,
        },
        {
          alpha: 1,
          duration: micro_ani_time,
        }
      );
    }

    if (whiteRef.current) {
      gsap.fromTo(
        whiteRef.current,
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: micro_ani_time,
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!!hide) {
      if (blackRef.current) {
        gsap.fromTo(
          blackRef.current,
          {
            alpha: 1,
          },
          {
            alpha: 0,
            duration: micro_ani_time,
          }
        );
      }

      if (whiteRef.current) {
        gsap.fromTo(
          whiteRef.current,
          {
            scale: 1,
          },
          {
            scale: 0,
            duration: micro_ani_time,
          }
        );
      }
    }
  }, [hide]);

  return (
    <div
      className="fixed w-[100vw] h-[100vh] bg-black bg-opacity-50 flex items-center justify-center inset-0 z-[20] opacity-0"
      ref={blackRef}
    >
      <div
        className="shadow-[2px_2px_30px_10px_rgba(255,255,255,0.1)] bg-gray-900 fone:w-[calc(100%-32px)] desk:w-[360px]  rounded-[--rounded] fone:p-[24px] desk:p-[32px] items-center justify-center flex flex-col"
        ref={whiteRef}
      >

        <div className="whitespace-pre fone:text-[16px] desk:text-[24px] mt-[20px] text-[#ffffff] items-center justify-center text-center flex flex-col">
          {content}
        </div>

        <div className="w-[100%] flex justify-around mt-[24px]">

          <div
            className="py-[8px] px-[24px] cursor-pointer flex items-center justify-center w-[136px] h-auto mt-[20px] rounded-[--rounded] fone:text-[16px] desk:text-[24px] text-gray-900 bg-[#ffffff]"
            onClick={clickToYes}
          >
            {confirm_text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
