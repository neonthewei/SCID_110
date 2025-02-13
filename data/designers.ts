// 簡化的中文到羅馬拼音轉換函數
const toPinyin = (name: string) => {
  const pinyinMap: { [key: string]: string } = {
    魏: "Wei", 丹: "Dan", 葳: "Wei", 鄭: "Cheng", 雅: "Ya",
    云: "Yun", 許: "Hsu", 哲: "Che", 嘉: "Chia", 余: "Yu",
    美: "Mei", 欣: "Hsin", 施: "Shih", 念: "Nien", 貞: "Chen",
    楊: "Yang", 文: "Wen", 儀: "Yi", 林: "Lin", 希: "Hsi",
    宸: "Chen", 蕭: "Hsiao", 卉: "Hui", 芯: "Hsin", 王: "Wang",
    闥: "Ta", 蒙: "Meng", 可: "Ke", 安: "An", 曾: "Tseng",
    柏: "Po", 偉: "Wei", 黃: "Huang", 皓: "Hao", 予: "Yu",
    陳: "Chen", 宗: "Tsung", 楠: "Nan", 郭: "Kuo", 宬: "Kung",
    竹: "Chu", 筠: "Yun", 成: "Cheng", 品: "Pin", 宜: "Yi",
    謝: "Hsieh", 函: "Han", 穎: "Ying", 啓: "Chi", 恩: "En",
    劉: "Liu", 睿: "Jui", 珊: "Shan", 瑜: "Yu", 樺: "Hua",
    蘇: "Su", 秦: "Chin", 萱: "Hsuan", 葉: "Yeh", 妤: "Yu",
    趙: "Chao", 寧: "Ning", 宥: "Yu", 璋: "Chang", 育: "Yu",
    楷: "Kai", 冠: "Kuan", 宇: "Yu", 芸: "Yun", 秀: "Hsiu",
    吳: "Wu", 莫: "Mo", 凡: "Fan", 蔡: "Tsai", 靜: "Ching",
    李: "Li", 語: "Yu", 彤: "Tung", 戴: "Tai", 抒: "Shu",
    丁: "Ting", 芷: "Chih", 晴: "Ching", 詠: "Yung", 龍: "Lung",
    何: "Ho", 之: "Chih", 翔: "Hsiang", 秉: "Ping", 良: "Liang",
    昕: "Hsin", 虹: "Hung", 勻: "Yun", 龔: "Kung", 佳: "Chia",
    茵: "Yin", 幸: "Hsing", 妏: "Wen", 張: "Chang", 維: "Wei",
    范: "Fan", 頌: "Sung", 胤: "Yin", 峻: "Chun", 梁: "Liang",
    元: "Yuan", 方: "Fang", 怡: "Yi", 夏: "Hsia", 聿: "Yu",
    璐: "Lu"
  }

  return name
    .split("")
    .map((char) => pinyinMap[char] || char)
    .join("-")
}

// 設計師中文名字列表
const chineseNames = [
  "魏丹葳", "鄭雅云", "許哲嘉", "余美欣", "施念貞",
  "楊文儀", "林希宸", "蕭卉芯", "王闥蒙", "王可安",
  "曾柏偉", "黃皓予", "陳宗楠", "郭宗宬", "陳竹筠",
  "成品宜", "謝函穎", "郭啓恩", "劉睿珊", "林瑜樺",
  "蘇秦萱", "葉芯妤", "趙雅寧", "余宥璋", "陳育楷",
  "林冠宇", "林芸秀", "吳莫凡", "蔡宜靜", "李語彤",
  "戴抒瑜", "丁芷晴", "陳詠芯", "陳文龍", "何之翔",
  "謝秉良", "謝宇昕", "王虹勻", "龔佳茵", "蔡幸妏",
  "張哲維", "范頌恩", "許芯瑜", "陳胤羽", "林峻維",
  "梁丁元", "方恩銘", "方怡文", "夏聿璐"
]

export interface Designer {
  id: number
  nameZh: string
  nameEn: string
  image: string
  bio?: string
  works?: Array<{
    id: string
    title: string
    image: string
  }>
}

// 生成設計師資料
export const designers: Designer[] = chineseNames.map((name, i) => ({
  id: i + 1,
  nameZh: name,
  nameEn: toPinyin(name),
  image: name === "魏丹葳" ? "/wei-dan-wei.jpg" : `/placeholder.svg?height=600&width=400&text=Designer${i + 1}`,
  bio: "這裡是設計師的個人簡介...",
  works: [
    {
      id: `work1-${i + 1}`,
      title: "作品 1",
      image: "/placeholder.svg"
    },
    {
      id: `work2-${i + 1}`,
      title: "作品 2",
      image: "/placeholder.svg"
    }
  ]
}))

// 根據 ID 獲取設計師資料的輔助函數
export function getDesignerById(id: number): Designer | undefined {
  return designers.find(designer => designer.id === id)
}

// 根據 slug 獲取設計師資料的輔助函數
export function getDesignerBySlug(slug: string): Designer | undefined {
  const id = parseInt(slug, 10)
  return getDesignerById(id)
} 