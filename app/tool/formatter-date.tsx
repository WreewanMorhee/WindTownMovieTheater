export const formmater_date = (s: string) => {
  const [date, time] = s.split('T')
  const [y, m, d] = date.split('-')
  const cur_year = new Date().getFullYear()
  const cur_month = new Date().getMonth() + 1
  const cur_day = new Date().getDate()
  const cur_hour = new Date().getHours()
  const cur_minute = new Date().getMinutes()
  const s_hour = time.split(':')[0]
  const s_minute = time.split(':')[1]

  // return s

  if (
    Number(y) === Number(cur_year) &&
    Number(m) === Number(cur_month) &&
    Number(cur_day) - Number(d) <= 7
  ) {
    return !!(Number(cur_day) - Number(d))
      ? `${Number(cur_day) - Number(d)} 天前`
      : Number(cur_hour) - Number(s_hour) > 1
      ? `${Number(cur_hour) - Number(s_hour)} 小時前` 
      : Number(cur_hour) - Number(s_hour) > 0 && Number(cur_hour) - Number(s_hour) < 2 && Number(cur_minute) >= Number(s_minute) 
      ? `${Number(cur_hour) - Number(s_hour)} 小時前` 
      :`${(Number(cur_minute) + Number(cur_hour) * 60) - (Number(s_minute) + Number(s_hour) * 60)} 分鐘前` 
  }

  return date
}
