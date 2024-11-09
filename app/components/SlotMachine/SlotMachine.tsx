import { useEffect, useRef, useState } from "react";
import styles from "./slot.module.css";
import { useTea } from "~/drinktea/tea";

const set_res_delay = 300;
const time_to_generate_ans = 5500;
const add_number = (num: number) => (num + 1) % 10;

const get_random_value = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const equal_length = (target: string, length: number): string =>
  target.length === length ? target : equal_length(`0${target}`, length);

const SlotMachine = ({
  set_final_val,
  final_val,
  set_show_card,
}: {
  set_show_card: (value: boolean) => void;
  set_final_val: (value: string) => void;
  final_val: string;
}) => {
  const [my_to_see_list = []] = useTea.my_to_see_list();
  const [start, set_start] = useState(false);
  const [reset_key, set_reset_key] = useState(1)

  const timer1 = useRef<NodeJS.Timeout | null>(null);

  const total_number = my_to_see_list.length

  return (
    <div
      className={
        styles["neumorphic-board"] +
        (!!final_val ? ` ${styles["success"]}` : "")
      }
    >
      <div className="flex w-full h-[40%] gap-[--general-gap] items-center justify-evenly">
        {total_number
          .toString()
          .split("")
          .map((text, index) => (
            <NumberComp
              key={`${text}-${index}-${reset_key}`}
              className={
                styles["concave"] +
                " overflow-hidden " +
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
              ani_delay={0.3 * index}
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
            set_show_card(false);
            set_reset_key(prev => prev + 1)
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
  ani_delay
}: {
  text: string;
  className: string;
  start: boolean;
  index: number;
  final_val: string;
  ani_delay: number
}) => {

  const timer1 = useRef<NodeJS.Timeout | null>(null);
  const timer2 = useRef<NodeJS.Timeout | null>(null);
  const timer3 = useRef<NodeJS.Timeout | null>(null);


  const [my_val, set_my_val] = useState("");
  useEffect(() => {
    if (final_val) {
      timer3.current = setTimeout(() => {
        set_my_val(final_val[index]);

        if (!!timer1.current) clearTimeout(timer1.current);
        if (!!timer2.current) clearTimeout(timer2.current);
        if (!!timer3.current) clearTimeout(timer3.current);

        timer1.current = null;
        timer2.current = null;
        timer3.current = null;
      }, index * set_res_delay);
    } else {
      set_my_val("");
    }
  }, [final_val]);


  return (
    <div className={className}>
      <div
        onAnimationIteration={(e: React.AnimationEvent<HTMLElement>) => {
          const target = e.target as HTMLElement

          target.style.animationDuration = '.1s'

          const child1 = target.children[0] as HTMLElement
          const child2 = target.children[1] as HTMLElement

          child1.innerHTML = add_number(Number(child1.innerHTML)).toString()
          child2.innerHTML = add_number(Number(child2.innerHTML)).toString()
        }}

        style={{
          animationDelay: `${ani_delay}s`
        }}
        className={(!!my_val ? '' : start ? styles["slot-move"] : '') + " w-full h-full relative"}
      >
        <div
          className={
            " w-full h-full left-0 bottom-[100%] absolute flex items-center justify-center"
          }
        >
          {add_number(Number(text))}
        </div>
        <div
          className={
            " w-full h-full inset-0 absolute flex items-center justify-center"
          }
        >
          {my_val || text}
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
