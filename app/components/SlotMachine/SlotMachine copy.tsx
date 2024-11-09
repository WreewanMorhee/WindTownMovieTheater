import { useEffect, useRef, useState } from "react";
import styles from "./slot.module.css";
import { useTea } from "~/drinktea/tea";

const change_freq = 50;
const change_delay_const = 300;
const set_res_delay = 200;
const time_to_generate_ans = 3000;

const get_random_value = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const equal_length = (target: string, length: number): string =>
  target.length === length ? target : equal_length(`0${target}`, length);

const SlotMachine = ({
  set_final_val,
  final_val,
  set_show_card
}: {
  set_show_card: (value: boolean) => void
  set_final_val: (value: string) => void;
  final_val: string;
}) => {
  const [my_to_see_list = []] = useTea.my_to_see_list();
  const [start, set_start] = useState(false);

  const timer1 = useRef<NodeJS.Timeout | null>(null);

  const total_number = my_to_see_list.length




  return (
    <div
      className={
        styles["neumorphic-board"] +
        (!!final_val ? ` ${styles["success"]}` : "")
      }
    >


        <div className="flex w-full gap-[--general-gap] items-center justify-evenly">
      {total_number
        .toString()
        .split("")
        .map((text, index) => (
          <NumberComp
            key={`${text}-${index}`}
            className={
              styles["concave"] +
              " " +
              (index % 3 === 0
                ? styles["red"]
                : index % 3 === 1
                ? styles["yellow"]
                : styles["blue"])
            }
            start={start}
            index={index}
            text={text}
            final_val={final_val}
          />
        ))}
        </div>

      <div className="w-full"></div>
      <button
        onClick={() => {
          if (timer1.current) return;

          if (final_val) {
            set_final_val("");
            set_start(false);
            set_show_card(false)
          } else {
            set_start(true);
            timer1.current = setTimeout(() => {
              set_final_val(
                equal_length(
                  get_random_value(1, total_number).toString(),
                  total_number.toString().length
                )
              );

              if (!!timer1.current) clearTimeout(timer1.current);
              timer1.current = null;
            }, time_to_generate_ans);
          }
        }}
        className={styles["neumorphic-button"]}
      >
        {!!final_val ? "再來一次！" : "上帝之手"}
      </button>

      <div className={styles["neon-bottom-right"]}></div>
    </div>
  );
};

const NumberComp = ({
  className,
  text,
  start,
  index,
  final_val,
}: {
  text: string;
  className: string;
  start: boolean;
  index: number;
  final_val: string;
}) => {
  const [d_num, set_d_num] = useState(Number(text));

  const timer1 = useRef<NodeJS.Timeout | null>(null);
  const timer2 = useRef<NodeJS.Timeout | null>(null);
  const timer3 = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (start) {
      /* 開始轉動 */
      timer1.current = setTimeout(() => {
        timer2.current = setInterval(() => {
          set_d_num((prev) => (prev === 9 ? 0 : prev + 1));
        }, change_freq);
      }, index * change_delay_const);
    }
  }, [start]);

  const [my_val, set_my_val] = useState("");
  useEffect(() => {
    if (final_val) {
      timer3.current = setTimeout(() => {
        set_my_val(final_val);

        if (!!timer1.current) clearTimeout(timer1.current);
        if (!!timer2.current) clearTimeout(timer2.current);
        if (!!timer3.current) clearTimeout(timer3.current);

        timer1.current = null;
        timer2.current = null;
        timer3.current = null;
      }, index * set_res_delay);
    } else {
      set_my_val("");
      set_d_num(Number(text))
    }
  }, [final_val]);



  return (
    <div className={className}>
      {!!my_val ? my_val[index] : start ? d_num : text}
    </div>
  );
};

export default SlotMachine;
