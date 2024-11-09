import CommentSkeleton from "./CommentSkeleton";
import { useState } from "react";
import CommentItem from "./CommentItems";
import { yt_api_key } from "~/config/api";


type commentsType = {
  id: string;
  snippet: {
    authorChannelId: {
      value: string;
    };
    textDisplay: string;
    likeCount: number;
    authorProfileImageUrl: string;
    authorDisplayName: string;
    publishedAt: string;
  };
}[];

type ThreadsType = {
  comment_id: string;
  totalReplyCount: number;
  src: string;
  name: string;
  like_count: number;
  content: string;
  publish: string;
  channelId: string;
  user_id?: string;
};
const Threads = ({
  comment_id,
  totalReplyCount,
  src,
  name,
  like_count,
  content,
  publish,
  channelId,
  user_id,
}: ThreadsType) => {
  const [items = [], set_items] = useState<commentsType>([]);
  const [page_token, set_page_token] = useState("");
  const [loading, set_loading] = useState(false);

  const clickToFetchReply = () => {
    if (page_token === "over" || loading) return;

    set_loading(true);

    fetch(
      `https://www.googleapis.com/youtube/v3/comments?key=${yt_api_key}&textFormat=plainText&part=snippet&parentId=${comment_id}&maxResults=8&pageToken=${page_token}`
    )
      .then((r) => r.json())
      .then((r) => {
        set_loading(false);
        set_items([...items, ...r.items]);
        set_page_token(r.nextPageToken || "over");
      });
  };

  return (
    <CommentItem
      src={src}
      name={name}
      like_count={like_count}
      content={content}
      publish={publish}
      channel_id={channelId}
      user_id={user_id}
      comment_id={comment_id}
    >
      <>
        <ul className="ml-auto mr-0 w-[calc(100%-54px)] flex flex-col">
          {!!items.length && (
            <>
              {items.map(
                ({
                  id,
                  snippet: {
                    authorChannelId: { value },
                    textDisplay,
                    likeCount,
                    authorProfileImageUrl,
                    authorDisplayName,
                    publishedAt,
                  },
                }: {
                  id: string;
                  snippet: {
                    authorChannelId: {
                      value: string;
                    };
                    textDisplay: string;
                    likeCount: number;
                    authorProfileImageUrl: string;
                    authorDisplayName: string;
                    publishedAt: string;
                  };
                }) => (
                  <CommentItem
                    key={id}
                    publish={publishedAt}
                    src={authorProfileImageUrl}
                    name={authorDisplayName}
                    like_count={likeCount}
                    content={textDisplay}
                    channel_id={value}
                    comment_id={id}
                  />
                )
              )}
            </>
          )}
          {!!loading && <CommentSkeleton count={1} />}
        </ul>

        {!!totalReplyCount && page_token !== "over" && (
          <button
            onClick={clickToFetchReply}
            className="cursor-pointer text-[14px] cursor-pointer text-[--blue] rounded-tr-[0px] rounded-tl-[0px] border-t-[0px] ml-[54px] px-[12px] py-[6px] border-[1px] border-[rgba(150,150,150,1)] rounded-[--rounded] self-baselinex"
          >
            查看回覆 ({totalReplyCount - items.length})
          </button>
        )}
      </>
    </CommentItem>
  );
};

export default Threads

