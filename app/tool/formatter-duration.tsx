
export const formmater_duration = (s: string) => {

    return s.replace('PT', '').replace('H', '時').replace('M', '分').replace('S', '秒')

}