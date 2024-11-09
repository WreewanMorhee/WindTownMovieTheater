export interface VideoList {
    id: string
    contentDetails: {
      duration: string
    } 
    snippet: {
      channelTitle: string
      localized: { title: string }
      thumbnails: {
        high: { url: string }
      }
    }
    statistics: {
      commentCount: string
      likeCount: string
      viewCount: string
    }
}