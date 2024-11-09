export interface CommentItemType {
    src: string;
    name: string;
    like_count: number;
    content: string;
    publish: string;
    children?: React.ReactNode;
    channel_id: string;
    comment_id: string | 'hot-update';
    user_id?: string;
};