import { useInView } from "react-intersection-observer";
import CommentSkeleton from "./CommentSkeleton";
import { useEffect, useRef, useState } from "react";
import { yt_api_key } from "~/config/api";
import { useTea } from "~/drinktea/tea";
import { useParams } from "@remix-run/react";
import { ThreadList } from "~/interface/thread";
import Threads from "./Thread";
import { post_error } from "~/api/post-error";



const CommentsList = () => {
  const video_id = "c-geFLgi6EU";
  //  pSyxpqo75HM
  const {id: vid = ''} = useParams()

  const [items = [], set_items] = useTea.comment_list_data[vid].list()
  const [fetched, set_fetched] = useTea.comment_list_data[vid].fetched()
  const [page_token, set_page_token] = useState("");
  const [user_id] = useTea.user_id();

  const fetch_flag = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const get_more_comment = () => {
    fetch_flag.current = true;
    fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${yt_api_key}&textFormat=plainText&part=snippet&videoId=${video_id}&maxResults=24&pageToken=${page_token}&order=relevance`
    )
      .then((r) => r.json())
      .then((r) => {
        fetch_flag.current = false;
        set_items((prev = []) => [...prev, ...r.items]);
        set_page_token(r.nextPageToken || "over");
      });
  }
  useEffect(() => {
    if (inView && !fetch_flag.current && page_token !== "over") {
      get_more_comment()
    }
  }, [inView]);


  const get_firebase_comment = () => {
    fetch(`/get-comment?uid=${user_id}&vid=${vid}&debug=${window?.get_comment_debug ? '1' : ''}`)
      .then((r) => r.json())
      .then((r) => {

        if (r[Object.keys(r)[0]].user_id && r[Object.keys(r)[0]].snippet) {
          const firebase_id_list = Object.keys(r)
          if (firebase_id_list.length) {
            const comment_list: ThreadList[] = Object.values(r).map((data, index) => ({
              ...(data as ThreadList),
              id: firebase_id_list[index]
            }));
            set_items((prev = []) => [...comment_list, ...prev]);
          }
          set_fetched(true)
        }

        if (r.code) {
          post_error({error: {
            ...r
          }, location: 'get-comment'})
        }

       


      }).catch((error) => {
        post_error({error, location: 'get-comment'})
        set_items((prev = []) => [...prev]);
      })
  }
  useEffect(() => {
    if (fetched) return
    get_firebase_comment()
  }, []);




  return (
    <ul key={items.length} className="mt-[16px] w-full flex flex-col">
      {!!items.length && items.map(
        (
          {
            user_id,
            id,
            snippet: {
              topLevelComment: {
                snippet: {
                  authorChannelId: { value },
                  textDisplay,
                  likeCount,
                  authorProfileImageUrl,
                  authorDisplayName,
                  publishedAt,
                },
              },
              totalReplyCount,
            },
          },
        ) => (
            <Threads
              key={id}
              comment_id={id}
              publish={publishedAt}
              src={authorProfileImageUrl}
              name={authorDisplayName}
              like_count={likeCount}
              content={textDisplay}
              totalReplyCount={totalReplyCount}
              channelId={value}
              user_id={user_id}
            />
          )
      )}

      {page_token === "over" ? (
        <div className="w-full flex justify-center">
          <div className="text-[#BFBFBF] font-bold justify-center flex items-center text-[24px] w-auto mt-[32px]">
            {!!items.length
              ? "天啊！你滑完所有留言了誒～"
              : "痾...還沒有留言誒拍謝.."}
          </div>
        </div>
      ) : (
        <CommentSkeleton fetch_ref={ref} />
      )}
    </ul>
  );
};



export default CommentsList;
