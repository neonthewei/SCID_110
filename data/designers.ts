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
    details: Array<{
      image: string
      caption: string
    }>
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
    image: "/face2/colorful1.jpg",
    works: [
      {
        id: "warm-craft-1",
        title: {
          main: "重｜花",
          sub: "re:cHUĀn"
        },
        description: "延續壓花玻璃的傳統工藝，將海棠花玻璃融入現代燈具設計，結合復古質感與當代美學。透過光線穿透壓花玻璃，營造柔和層次的光影效果，為空間增添溫暖氛圍，同時賦予經典圖騰新的設計語彙，讓傳統工藝在現代生活中展現獨特魅力。",
        category: "溫工藝",
        images: {
          main: "/2025011500076.jpg",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "壓花玻璃細節展示"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "燈具安裝示意圖"
            }
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
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "材質表面光影變化"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "裝置互動展示"
            }
          ]
        }
      },
      {
        id: "warm-craft-3",
        title: {
          main: "竹織燈影",
          sub: "Bamboo Light Weaving"
        },
        description: "結合傳統竹編工藝與現代照明設計，創造出層次豐富的光影效果。每一片竹片都經過精心編織，在光線照射下呈現出獨特的光影紋理。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "竹編工藝細節"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "燈光效果展示"
            }
          ]
        }
      },
      {
        id: "hot-dialogue-3",
        title: {
          main: "聲音織布機",
          sub: "Sound Weaving Loom"
        },
        description: "這是一個將聲音視覺化的互動裝置，透過感應器捕捉環境聲音，即時轉換成動態織紋投影，創造出聲音與視覺的對話空間。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "互動裝置運作展示"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "織紋投影效果"
            }
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
    image: "/face2/colorful2.jpg",
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
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "遊戲操作示範"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "產品結構說明"
            }
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
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "凳子組合展示"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "材質細節特寫"
            }
          ]
        }
      },
      {
        id: "cold-spark-3",
        title: {
          main: "光譜共鳴",
          sub: "Spectrum Resonance"
        },
        description: "透過特殊的光學材料與聲音感應技術，創造出能夠隨著音樂節奏變化的光影裝置，將聽覺體驗轉化為視覺饗宴。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "光影變化展示"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "互動效果示範"
            }
          ]
        }
      },
      {
        id: "warm-craft-4",
        title: {
          main: "陶光映影",
          sub: "Ceramic Light Mapping"
        },
        description: "運用傳統陶藝技法，製作出獨特的鏤空陶瓷燈具，光線穿過精心設計的孔洞，在牆面上投射出豐富的光影圖案。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "陶瓷工藝細節"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "光影效果展示"
            }
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
    image: "/face2/colorful3.jpg",
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
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "軌道拼接示範"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "音樂互動效果"
            }
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
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "音牆互動展示"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "聲音視覺化效果"
            }
          ]
        }
      },
      {
        id: "comfort-nest-5",
        title: {
          main: "織夢椅",
          sub: "Dream Weaving Chair"
        },
        description: "採用特殊編織技術，將傳統藤編工藝與現代家具設計結合，創造出既舒適又富有藝術感的休閒椅。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "編織工藝細節"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "椅子整體展示"
            }
          ]
        }
      },
      {
        id: "cold-spark-4",
        title: {
          main: "數位織影",
          sub: "Digital Shadow Weaving"
        },
        description: "結合數位投影與互動感應技術，創造出能與觀眾互動的光影裝置，讓人彷彿置身於流動的光織物中。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "互動效果展示"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "投影藝術呈現"
            }
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
    image: "/face2/colorful4.jpg",
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
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "榫接結構細節"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "燈具造型變化"
            }
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
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "磁浮裝置展示"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "光影效果呈現"
            }
          ]
        }
      },
      {
        id: "warm-craft-5-d4",
        title: {
          main: "溫度織錄",
          sub: "Temperature Weaving"
        },
        description: "運用感溫材料與傳統編織工藝，創造出能夠隨環境溫度變化而改變圖案的織品裝置，展現科技與工藝的完美結合。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "溫感變化展示"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "織品細節特寫"
            }
          ]
        }
      },
      {
        id: "hot-dialogue-4",
        title: {
          main: "聲光對話",
          sub: "Sound Light Dialogue"
        },
        description: "這是一個結合聲音與光影的互動裝置，能夠捕捉使用者的聲音，並將其轉化為動態的光影效果，創造出獨特的感官體驗。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "互動效果展示"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "聲音視覺化呈現"
            }
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
    image: "/face2/colorful5.jpg",
    works: [
      {
        id: "warm-craft-5-d5",
        title: {
          main: "竹韻",
          sub: "Bamboo Rhythm"
        },
        description: "結合傳統竹編工藝與現代音響設計，創造出獨特的自然聲學體驗。竹材的多孔結構與特殊編織方式，賦予音響溫潤的音質。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "竹編工藝細節"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "音響效果展示"
            }
          ]
        }
      },
      {
        id: "comfort-nest-5-d5",
        title: {
          main: "光織椅",
          sub: "Light Weaving Chair"
        },
        description: "採用特殊光纖織物，打造出會隨環境光線變化的座椅。在不同時段呈現出不同的視覺效果，為空間增添活力。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "織物細節"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "光效展示"
            }
          ]
        }
      }
    ]
  },
  {
    id: "designer-6",
    name: {
      zh: "陳俊宏",
      pinyin: "Chen Jun Hong"
    },
    image: "/face2/colorful6.jpg",
    works: [
      {
        id: "cold-spark-6",
        title: {
          main: "智慧花園",
          sub: "Smart Garden"
        },
        description: "結合IoT技術的智慧植物培育系統，透過感測器監測植物生長狀況，自動調節光照、溫度和濕度，實現智慧化的居家園藝。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "系統介面"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "植物生長展示"
            }
          ]
        }
      },
      {
        id: "hot-dialogue-6",
        title: {
          main: "聲光對話",
          sub: "Sound Light Dialogue"
        },
        description: "互動式聲光裝置，能夠捕捉使用者的聲音並轉換為動態光影，創造出獨特的感官體驗。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "互動展示"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "光效變化"
            }
          ]
        }
      }
    ]
  },
  {
    id: "designer-7",
    name: {
      zh: "黃詩涵",
      pinyin: "Huang Shi Han"
    },
    image: "/face2/colorful7.jpg",
    works: [
      {
        id: "comfort-nest-7",
        title: {
          main: "模組化收納櫃",
          sub: "Modular Storage"
        },
        description: "創新的模組化收納系統，可根據使用者需求自由組合，適應不同空間和收納需求。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "組裝示範"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "收納展示"
            }
          ]
        }
      },
      {
        id: "warm-craft-7",
        title: {
          main: "織影",
          sub: "Weaving Shadow"
        },
        description: "結合傳統編織工藝與現代投影技術，創造出動態變化的光影藝術裝置。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "編織細節"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "投影效果"
            }
          ]
        }
      }
    ]
  },
  {
    id: "designer-8",
    name: {
      zh: "王建明",
      pinyin: "Wang Jian Ming"
    },
    image: "/face2/colorful8.jpg",
    works: [
      {
        id: "cold-spark-8",
        title: {
          main: "環保能源椅",
          sub: "Eco Energy Chair"
        },
        description: "融合太陽能與人體動能發電技術的創新座椅，可將日常活動轉換為清潔能源。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "能源轉換系統"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "使用展示"
            }
          ]
        }
      },
      {
        id: "hot-dialogue-8",
        title: {
          main: "共享閱讀空間",
          sub: "Shared Reading Space"
        },
        description: "可變形的公共閱讀空間設計，促進社區交流與知識分享。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "空間配置"
            },
            {
              image: "/placeholder.svg?height=400&width=600",
              caption: "使用場景"
            }
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