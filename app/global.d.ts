export {};

declare global {
  interface Window {
    collect_debug?: boolean
    comment_debug?: boolean
    get_comment_debug?: boolean
  }
}
