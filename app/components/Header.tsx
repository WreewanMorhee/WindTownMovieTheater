import { Link, useLocation, useNavigate, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import useEnterKeyPress from "~/hooks/useEnterKeyPress";
import { google_login, user_willingness_check } from "../tool/google-login";
import LoginElf from "./LoginElf";
import { is_in_app_browser } from "~/tool/is-in-app-browser";
import { app_alert } from "~/tool/app-alert";
import { useTea } from "~/drinktea/tea";

const Header = ({
  avatar_src,
  user_id,
}: {
  avatar_src: string;
  user_id: string;
}) => {
  const { pathname } = useLocation();
  const { keyword = "" } = useParams();
  const [focus, set_focus] = useState<boolean>(false);
  const [movie_or_tv, set_movie_or_tv] = useState<string>("search-movie");
  const navigate = useNavigate();

  const [text, set_text] = useState<string>(keyword);
  useEffect(() => {
    if (!!keyword) {
      set_text(keyword);
    }
  }, [keyword]);

  useEnterKeyPress((event) => {
    if (focus) {
      navigate(`/${movie_or_tv}/${text}`);

      event.preventDefault();
      const target = event.target as HTMLInputElement;
      if (target) {
        target.blur();
      }
    }
  });


  const [scroll_down] = useTea.scroll_down()

  const is_main_page = pathname === "/";
  const is_to_see_list_page = pathname === '/member/to-see-list'

  return (
    <header
      className={
        "h-[--header-height] shadow bg-[--bg] sticky fone:top-[0px] desk:top-[0] left-[0] z-10 flex items-center justify-between p-[--comp-padding] fone:flex-wrap desk:flex-row" +
        (is_main_page ? " main" : "") + 
        ((scroll_down && is_to_see_list_page) ? ' hide' : '')
      }
    >
      {/* Logo */}
      <div className="relative w-[40px] h-[40px] space-x-2">
        <Link to="/">
          <img
            src="/assets/logo.webp"
            alt="Logo"
            className="absolute w-[60px] h-[60px] left-[-15px] top-[-11px] min-w-[60px] object-cover"
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="ml-[8px] mx-4 w-[50%] fone-none">
        <input
          onFocus={() => set_focus(true)}
          onBlur={() => set_focus(false)}
          onChange={(e) => set_text(e.target.value)}
          type="text"
          placeholder="今天想找什麼電影呢？"
          value={text}
          enterKeyHint="search"
          className="w-full py-[--comp-little-padding] px-[--comp-padding] rounded-[--rounded] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[--yellow]"
        />
      </div>

      {/* Member/Profile Section */}
      <div className="ml-[8px] mr-auto flex items-center space-x-4">
        <CateBtn
          my_cate={"search-movie"}
          set_movie_or_tv={set_movie_or_tv}
          text={text}
        >
          電影
        </CateBtn>
        <CateBtn
          my_cate={"search-tv"}
          set_movie_or_tv={set_movie_or_tv}
          text={text}
        >
          影集
        </CateBtn>
      </div>

      <div
        className="ml-auto mr-[0px] cursor-pointer"
        onClick={
          !!user_id
            ? () => {
                navigate(`/member/to-see-list`);
              }
            : async () => {
              const user_want_to = await user_willingness_check()
              if (!user_want_to) return 
              google_login()
            }
        }
      >
        <img
          src={avatar_src || "/assets/member.webp"}
          alt="Profile"
          className="w-[30px] h-[30px] bg-[--bg] rounded-full"
        />
      </div>

      <div className="w-full mt-[16px] desk-none">
        <input
          onFocus={() => set_focus(true)}
          onBlur={() => set_focus(false)}
          onChange={(e) => set_text(e.target.value)}
          type="text"
          placeholder="今天想找什麼電影呢？"
          value={text}
          enterKeyHint="search"
          className="w-full py-[--comp-little-padding] px-[--comp-padding] rounded-[--rounded] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[--yellow]"
        />
      </div>


    </header>
  );
};

const CateBtn = ({
  my_cate,
  set_movie_or_tv,
  text,
  children,
}: {
  my_cate: string;
  set_movie_or_tv: (value: string) => void;
  text: string;
  children: string;
}) => {
  const { cate, keyword = "" } = useParams();
  const navigate = useNavigate();

  const active_css = " text-[#ffffff] bg-[--bg] border border-[--teal] ";
  const common_css = " bg-[--btn-bg] border border-[transparent] ";
  const general_css = " text-white py-[--comp-little-padding]  px-[--comp-padding] rounded-[--rounded] ";

  const { pathname } = useLocation();

  const make_optimistic = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.className = general_css + active_css;

    const sibling =
      (e.currentTarget.nextSibling as HTMLElement)?.dataset.tag === "cate-btn"
        ? (e.currentTarget.nextSibling as HTMLElement)
        : (e.currentTarget.previousSibling as HTMLElement)?.dataset.tag ===
          "cate-btn"
        ? (e.currentTarget.previousSibling as HTMLElement)
        : null;
    if (sibling) {
      sibling.className = general_css + common_css;
    }
  };

  return (
    <button
      onClick={(e) => {
        set_movie_or_tv(my_cate);

        if (!!text || !!keyword) {
          // make_optimistic(e)
          navigate(`/${my_cate}/${text || keyword}`);
        }
      }}
      data-tag="cate-btn"
      className={general_css + (cate === my_cate ? active_css : common_css)}
    >
      {children}
    </button>
  );
};

export default Header;
