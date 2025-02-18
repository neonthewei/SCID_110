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

// 定義作品類型
export type WorkCategory = "舒適巢" | "溫工藝" | "熱對話" | "冷火花"

// 定義作品介面
export interface Work {
  id: string
  title: {
    main: string
    sub: string
  }
  description: string
  category: WorkCategory
  images: {
    main: string
    details: string[]
  }
}

// 定義設計師介面
export interface Designer {
  id: string
  name: {
    zh: string
    pinyin: string
  }
  image: string
  works: Work[]
}

// 設計師資料庫
export const designers: Designer[] = [
  {
    id: "designer-1",
    name: {
      zh: "王小明",
      pinyin: "Wang Xiao Ming"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "warm-craft-1",
        title: {
          main: "重｜花",
          sub: "re:cHUĀn"
        },
        description: "將同一個最小單位做多種合併嘗試，透過顏色與造型的穿插創造出一系列具有穿花意象的結構燈具組。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "cold-spark-2",
        title: {
          main: "光影織度",
          sub: "Light & Shadow Weaving"
        },
        description: "運用光線在不同材質表面的反射與折射，創造出豐富的光影層次，呈現出獨特的視覺體驗。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-2",
    name: {
      zh: "李小華",
      pinyin: "Li Xiao Hua"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "comfort-nest-1",
        title: {
          main: "Rolling Rescue",
          sub: "兒童平衡遊戲"
        },
        description: "兒童傾斜圓盤使小球滾動，避開障礙物順利滾到動物口中",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "comfort-nest-2",
        title: {
          main: "UUUstool",
          sub: "羊毛氈凳子組"
        },
        description: "融合多種造型語彙，包括球體、條狀結構與鐵網，此系列包含三張高低不一的凳子，整體框架以倒U型為主要結構，U型的底部稍微擴大，既增添了穩定性，也作為造型語言的一部分。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "warm-craft-3",
        title: {
          main: "竹韻",
          sub: "Bamboo Rhythm"
        },
        description: "以傳統竹編工藝為基礎，結合現代設計語言，創造出具有韻律感的燈具系列，展現竹材的柔韌之美。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-3",
    name: {
      zh: "張小芳",
      pinyin: "Zhang Xiao Fang"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "hot-dialogue-1",
        title: {
          main: "COLONO",
          sub: "音樂軌道車"
        },
        description: "利用彩虹的顏色代表著音符，讓小朋友自由拼接出屬於自己的軌道音樂！",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "hot-dialogue-2",
        title: {
          main: "Echo Wall",
          sub: "互動音牆"
        },
        description: "透過觸摸感應技術，讓使用者能夠通過觸碰牆面創造出獨特的聲音組合，形成一面充滿互動性的音樂牆。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-4",
    name: {
      zh: "陳小雨",
      pinyin: "Chen Xiao Yu"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "cold-spark-1",
        title: {
          main: "Dynamic Joinery Luminaries",
          sub: "活動式榫接燈具"
        },
        description: "以光固化軟料作為鳩尾榫的材質，使零件與零件的連接有了活性，進而使榫接工藝作品的造型有不同的可能。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "comfort-nest-4",
        title: {
          main: "浮光",
          sub: "Floating Light"
        },
        description: "結合磁浮技術與光影設計，創造出一個懸浮的照明裝置，在空間中營造出夢幻的氛圍。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-5",
    name: {
      zh: "林雅婷",
      pinyin: "Lin Ya Ting"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "comfort-nest-5",
        title: {
          main: "綠意棲居",
          sub: "Green Living Space"
        },
        description: "結合植栽與家具設計，創造出一個能讓都市人親近自然的生活空間系統，包含模組化的植物架、工作桌與收納櫃。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "warm-craft-5",
        title: {
          main: "織光",
          sub: "Woven Light"
        },
        description: "運用傳統編織技法結合光纖材料，創造出會隨著晝夜變化呈現不同光影效果的編織燈飾。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-6",
    name: {
      zh: "黃志明",
      pinyin: "Huang Zhi Ming"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "hot-dialogue-6",
        title: {
          main: "聲景遊戲",
          sub: "Soundscape Play"
        },
        description: "設計一系列互動式聲音裝置，讓使用者透過肢體動作創造出不同的聲音組合，體驗聲音與空間的關係。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "cold-spark-6",
        title: {
          main: "光譜共鳴",
          sub: "Spectrum Resonance"
        },
        description: "透過特殊的光學材料與聲波感應器，創造出能夠將聲音轉化為動態光影的裝置。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-7",
    name: {
      zh: "張美玲",
      pinyin: "Zhang Mei Ling"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "warm-craft-7",
        title: {
          main: "陶光",
          sub: "Ceramic Light"
        },
        description: "結合陶藝與燈具設計，運用不同厚度的陶瓷材質來創造柔和的光影效果，展現材質的純粹之美。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "comfort-nest-7",
        title: {
          main: "靜心角落",
          sub: "Mindful Corner"
        },
        description: "設計一個模組化的休憩空間系統，能夠根據使用者需求快速組裝成不同的私密空間。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-8",
    name: {
      zh: "劉建宏",
      pinyin: "Liu Jian Hong"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "cold-spark-8",
        title: {
          main: "數位織布機",
          sub: "Digital Loom"
        },
        description: "結合傳統織布技術與數位控制系統，創造出能夠自動編織複雜圖案的現代織布機。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "hot-dialogue-8",
        title: {
          main: "織夢機",
          sub: "Dream Weaver"
        },
        description: "讓使用者通過觸控界面設計自己的織物圖案，並即時看到成品模擬效果。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-9",
    name: {
      zh: "陳俊宏",
      pinyin: "Chen Jun Hong"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "comfort-nest-9",
        title: {
          main: "變形金剛",
          sub: "Transformer Furniture"
        },
        description: "設計一系列可變形的家具，能夠根據不同時段的需求轉換成不同功能的傢俱。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "warm-craft-9",
        title: {
          main: "木韻",
          sub: "Wood Rhythm"
        },
        description: "運用不同木材的紋理與色澤，創造出具有音樂律動感的木製裝飾牆面。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-10",
    name: {
      zh: "楊雅筑",
      pinyin: "Yang Ya Zhu"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "hot-dialogue-10",
        title: {
          main: "情緒光譜",
          sub: "Emotion Spectrum"
        },
        description: "透過生物感測器捕捉使用者的情緒變化，轉換成動態的光影與音效，創造出互動式的情緒表達空間。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "cold-spark-10",
        title: {
          main: "生物韻律",
          sub: "Bio Rhythm"
        },
        description: "結合生物發光技術與環境感測器，創造出能夠對應環境變化而改變光度的生態裝置。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-11",
    name: {
      zh: "吳承翰",
      pinyin: "Wu Cheng Han"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "warm-craft-11",
        title: {
          main: "竹影",
          sub: "Bamboo Shadow"
        },
        description: "運用竹材特有的韌性與紋理，設計出一系列結合光影效果的屏風與隔間，創造出層次豐富的空間氛圍。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "comfort-nest-11",
        title: {
          main: "竹居",
          sub: "Bamboo Living"
        },
        description: "設計一套完整的竹製家具系統，從收納到休憩空間都能展現竹材的環保特性與自然美感。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-12",
    name: {
      zh: "李佳穎",
      pinyin: "Li Jia Ying"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "cold-spark-12",
        title: {
          main: "智慧織品",
          sub: "Smart Textile"
        },
        description: "開發一種能夠感應溫度變化並自動調節透氣度的智慧型織物，應用於日常服飾與家居用品。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "hot-dialogue-12",
        title: {
          main: "織物對話",
          sub: "Textile Dialogue"
        },
        description: "創造一個互動式織物展示系統，讓觀眾能夠透過觸摸不同織物來了解其特性與故事。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-13",
    name: {
      zh: "王思涵",
      pinyin: "Wang Si Han"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "comfort-nest-13",
        title: {
          main: "光合空間",
          sub: "Photosynthesis Space"
        },
        description: "設計一個結合植物生長與居家生活的智慧型溫室系統，讓都市人也能享受自給自足的樂趣。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "warm-craft-13",
        title: {
          main: "植物編織",
          sub: "Plant Weaving"
        },
        description: "結合植物生長特性與編織工藝，創造出會隨時間改變形態的生態藝術裝置。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  },
  {
    id: "designer-14",
    name: {
      zh: "陳威廷",
      pinyin: "Chen Wei Ting"
    },
    image: "/placeholder.svg?height=400&width=300",
    works: [
      {
        id: "hot-dialogue-14",
        title: {
          main: "聲音花園",
          sub: "Sound Garden"
        },
        description: "設計一個戶外互動裝置，讓人們能夠通過不同的觸摸方式產生自然的聲音，創造出充滿趣味的公共空間。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      },
      {
        id: "cold-spark-14",
        title: {
          main: "聲波造型",
          sub: "Sound Shaping"
        },
        description: "開發一種能將聲波視覺化的裝置，即時將聲音轉換成立體造型，展現聲音的視覺之美。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
          ]
        }
      }
    ]
  }
]

// 輔助函數：根據 ID 獲取設計師資料
export function getDesignerById(id: string): Designer | undefined {
  return designers.find(designer => designer.id === id)
}

// 輔助函數：根據作品 ID 獲取作品資料
export function getWorkById(workId: string): Work | undefined {
  for (const designer of designers) {
    const work = designer.works.find(w => w.id === workId)
    if (work) return work
  }
  return undefined
}

// 輔助函數：根據作品 ID 獲取設計師資料
export function getDesignerByWorkId(workId: string): Designer | undefined {
  return designers.find(designer => 
    designer.works.some(work => work.id === workId)
  )
}

// 輔助函數：根據類別獲取所有作品
export function getWorksByCategory(category: WorkCategory): Work[] {
  return designers.flatMap(designer => 
    designer.works.filter(work => work.category === category)
  )
}

// 輔助函數：獲取所有作品
export function getAllWorks(): Work[] {
  return designers.flatMap(designer => designer.works)
}

// 輔助函數：根據 slug 獲取設計師資料
export function getDesignerBySlug(slug: string): Designer | undefined {
  return designers.find(designer => designer.id === slug)
} 