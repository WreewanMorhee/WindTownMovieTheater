export interface ThreadList {
    user_id?: string;
    id: string;
    snippet: {
      topLevelComment: {
        snippet: {
          authorChannelId: { value: string };
          textDisplay: string;
          likeCount: number;
          authorProfileImageUrl: string;
          authorDisplayName: string;
          publishedAt: string;
        };
      };
      totalReplyCount: number;
    };
  }