export const country_list: {
  ISO: string;
  country_name: string;
  zh_tw_name: string;
  path: string;
}[] = [

  { ISO: "TW", country_name: "Taiwan", zh_tw_name: "台灣", path: "taiwan" },

  { ISO: "JP", country_name: "Japan", zh_tw_name: "日本", path: "japan" },

  {
    ISO: "KR",
    country_name: "Korea, Republic of",
    zh_tw_name: "韓國",
    path: "republic-of-korea",
  },

  {
    ISO: "US",
    // country_name: "United States of America",
    country_name: "America",
    zh_tw_name: "美國",
    path: "america",
  },

  { ISO: "CA", country_name: "Canada", zh_tw_name: "加拿大", path: "canada" },
  { ISO: "DE", country_name: "Germany", zh_tw_name: "德國", path: "germany" },
  { ISO: "FR", country_name: "France", zh_tw_name: "法國", path: "france" },
  {
    ISO: "GB",
    // country_name: "United Kingdom of Great Britain and Northern Ireland",
    // zh_tw_name: "大不列顛及北愛爾蘭聯合王國",

    country_name: "UK",
    zh_tw_name: "英國",
    path: "uk",
  },

  { ISO: "ES", country_name: "Spain", zh_tw_name: "西班牙", path: "spain" },
  {
    ISO: "PT",
    country_name: "Portugal",
    zh_tw_name: "葡萄牙",
    path: "portugal",
  },
  { ISO: "PL", country_name: "Poland", zh_tw_name: "波蘭", path: "poland" },



  { ISO: "UA", country_name: "Ukraine", zh_tw_name: "烏克蘭", path: "ukraine" },
  {
    ISO: "RU",
    country_name: "Russian Federation",
    zh_tw_name: "俄羅斯",
    path: "russian-federation",
  },


  { ISO: "SE", country_name: "Sweden", zh_tw_name: "瑞典", path: "sweden" },
  { ISO: "FI", country_name: "Finland", zh_tw_name: "芬蘭", path: "finland" },
  { ISO: "NO", country_name: "Norway", zh_tw_name: "挪威", path: "norway" },

  {
    ISO: "SG",
    country_name: "Singapore",
    zh_tw_name: "新加坡",
    path: "singapore",
  },
  { ISO: "TH", country_name: "Thailand", zh_tw_name: "泰國", path: "thailand" },
  { ISO: "VN", country_name: "Viet Nam", zh_tw_name: "越南", path: "viet-nam" },

  {
    ISO: "PH",
    country_name: "Philippines",
    zh_tw_name: "菲律賓",
    path: "philippines",
  },



  {
    ISO: "AR",
    country_name: "Argentina",
    zh_tw_name: "阿根廷",
    path: "argentina",
  },

  { ISO: "AT", country_name: "Austria", zh_tw_name: "奧地利", path: "austria" },
  {
    ISO: "AU",
    country_name: "Australia",
    zh_tw_name: "澳洲",
    path: "australia",
  },



  { ISO: "BR", country_name: "Brazil", zh_tw_name: "巴西", path: "brazil" },





  { ISO: "CU", country_name: "Cuba", zh_tw_name: "古巴", path: "cuba" },


  {
    ISO: "ID",
    country_name: "Indonesia",
    zh_tw_name: "印尼",
    path: "indonesia",
  },
  { ISO: "IE", country_name: "Ireland", zh_tw_name: "愛爾蘭", path: "ireland" },
  { ISO: "IL", country_name: "Israel", zh_tw_name: "以色列", path: "israel" },

  { ISO: "IN", country_name: "India", zh_tw_name: "印度", path: "india" },



  { ISO: "IS", country_name: "Iceland", zh_tw_name: "冰島", path: "iceland" },
  { ISO: "IT", country_name: "Italy", zh_tw_name: "義大利", path: "italy" },



  {
    ISO: "VE",
    country_name: "Venezuela, Bolivarian Republic of",
    zh_tw_name: "委內瑞拉玻利瓦爾共和國",
    path: "venezuela,-bolivarian-republic-of",
  },

  { ISO: "MX", country_name: "Mexico", zh_tw_name: "墨西哥", path: "mexico" },
  {
    ISO: "MY",
    country_name: "Malaysia",
    zh_tw_name: "馬來西亞",
    path: "malaysia",
  },





  {
    ISO: "PR",
    country_name: "Puerto Rico",
    zh_tw_name: "波多黎各",
    path: "puerto-rico",
  },



  // { ISO: "TR", country_name: "Türkiye", zh_tw_name: "土耳其", path: "türkiye" },









  // {
  //   ISO: "NL",
  //   country_name: "Netherlands, Kingdom of the",
  //   zh_tw_name: "荷蘭",
  //   path: "kingdom-of-the-netherlands",
  // },
  // { ISO: "CZ", country_name: "Czechia", zh_tw_name: "捷克", path: "czechia" },
  // {
  //   ISO: "CH",
  //   country_name: "Switzerland",
  //   zh_tw_name: "瑞士",
  //   path: "switzerland",
  // },

];

export const form_country_path = (c: string) =>
  c.toLowerCase().split(" ").join("-");
