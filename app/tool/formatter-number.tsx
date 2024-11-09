export const formmater_number = (s: string) => {
    if (!s) return ''
    if (s.length <= 4) return s
    if (s.length > 4 && s.length <= 8) return `${s.slice(0, s.length - 4)} 萬`
    if (s.length > 8 && s.length <= 12) return `${s.slice(0, s.length - 8)}.${s.slice(s.length - 8, s.length - 7)} 億`
    if (s.length > 12 && s.length <= 16) return `${s.slice(0, s.length - 12)}.${s.slice(s.length - 12, s.length - 11)} 兆`
    if (s.length > 16 && s.length <= 20) return `${s.slice(0, s.length - 16)}.${s.slice(s.length - 16, s.length - 15)} 京`
}