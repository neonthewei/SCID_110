// 簡化的中文到羅馬拼音轉換函數
const toPinyin = (name: string) => {
  const pinyinMap: { [key: string]: string } = {
    魏: "Wei", 丹: "Dan", 葳: "Wei", 鄭: "Cheng", 雅: "Ya", 云: "Yun", 許: "Hsu", 
    哲: "Che", 嘉: "Chia", 余: "Yu", 美: "Mei", 欣: "Hsin", 施: "Shih", 念: "Nien", 
    貞: "Chen", 楊: "Yang", 文: "Wen", 儀: "Yi", 林: "Lin", 希: "Hsi", 宸: "Chen", 
    蕭: "Hsiao", 卉: "Hui", 芯: "Hsin", 王: "Wang", 闥: "Ta", 蒙: "Meng", 可: "Ke", 
    安: "An", 曾: "Tseng", 柏: "Po", 偉: "Wei", 黃: "Huang", 皓: "Hao", 予: "Yu",
    陳: "Chen", 宗: "Tsung", 楠: "Nan", 郭: "Kuo", 宬: "Kung", 竹: "Chu", 筠: "Yun", 
    成: "Cheng", 品: "Pin", 宜: "Yi", 謝: "Hsieh", 函: "Han", 穎: "Ying", 啓: "Chi", 
    恩: "En", 劉: "Liu", 睿: "Jui", 珊: "Shan", 瑜: "Yu", 樺: "Hua", 蘇: "Su", 
    秦: "Chin", 萱: "Hsuan", 葉: "Yeh", 妤: "Yu", 趙: "Chao", 寧: "Ning", 宥: "Yu", 
    璋: "Chang", 育: "Yu", 楷: "Kai", 冠: "Kuan", 宇: "Yu", 芸: "Yun", 秀: "Hsiu",
    吳: "Wu", 莫: "Mo", 凡: "Fan", 蔡: "Tsai", 靜: "Ching", 李: "Li", 語: "Yu", 
    彤: "Tung", 戴: "Tai", 抒: "Shu", 丁: "Ting", 芷: "Chih", 晴: "Ching", 詠: "Yung", 
    龍: "Lung", 何: "Ho", 之: "Chih", 翔: "Hsiang", 秉: "Ping", 良: "Liang", 昕: "Hsin", 
    虹: "Hung", 勻: "Yun", 龔: "Kung", 佳: "Chia", 茵: "Yin", 幸: "Hsing", 妏: "Wen", 
    張: "Chang", 維: "Wei", 范: "Fan", 頌: "Sung", 胤: "Yin", 峻: "Chun", 梁: "Liang",
    元: "Yuan", 方: "Fang", 怡: "Yi", 夏: "Hsia", 聿: "Yu", 璐: "Lu"
  }

  return name.split("").map((char) => pinyinMap[char] || char).join("-")
}

// 設計師中文名字列表
const chineseNames = [
  "魏丹葳", "鄭雅云", "許哲嘉", "余美欣", "施念貞", "楊文儀", "林希宸", "蕭卉芯", 
  "王闥蒙", "王可安", "曾柏偉", "黃皓予", "陳宗楠", "郭宗宬", "陳竹筠", "成品宜", 
  "謝函穎", "郭啓恩", "劉睿珊", "林瑜樺", "蘇秦萱", "葉芯妤", "趙雅寧", "余宥璋", 
  "陳育楷", "林冠宇", "林芸秀", "吳莫凡", "蔡宜靜", "李語彤", "戴抒瑜", "丁芷晴", 
  "陳詠芯", "陳文龍", "何之翔", "謝秉良", "謝宇昕", "王虹勻", "龔佳茵", "蔡幸妏", 
  "張哲維", "范頌恩", "許芯瑜", "陳胤羽", "林峻維", "梁丁元", "方恩銘", "方怡文", "夏聿璐"
]

// 定義作品類型
export type WorkCategory = "舒適巢" | "溫工藝" | "熱對話" | "冷火花"

// 定義作品介面
export interface Work {
  id: string
  title: { main: string, sub: string }
  description: string
  longDescription: string
  category: WorkCategory
  images: {
    main: string
    details: Array<{ image: string }>
  }
}

// 定義設計師介面
export interface Designer {
  id: string
  name: { zh: string, pinyin: string }
  image: string
  works: Work[]
}

// 設計師資料庫
export const designers: Designer[] = [
  {
    id: "designer-1",
    name: { zh: "王小明", pinyin: "Wang Xiao Ming" },
    image: "/face2/colorful1.jpg",
    works: [
      {
        id: "warm-craft-1",
        title: { main: "重｜花", sub: "re:cHUĀn" },
        description: "延續壓花玻璃的傳統工藝，將海棠花玻璃融入現代燈具設計，結合復古質感與當代美學。透過光線穿透壓花玻璃，營造柔和層次的光影效果，為空間增添溫暖氛圍，同時賦予經典圖騰新的設計語彙，讓傳統工藝在現代生活中展現獨特魅力。",
        longDescription: "重｜花是一個將海棠花玻璃融入現代燈具設計的創新作品。這件作品通過將海棠花玻璃與現代燈具設計結合，創造出既保留了傳統工藝的質感，又融入了當代美學的設計理念。透過光線穿透壓花玻璃，營造出柔和層次的光影效果，為空間增添溫暖氛圍，同時賦予經典圖騰新的設計語彙。這件作品不僅展現了傳統工藝的精湛技術，也融入了現代科技元素，使靜態的編織品獲得了動態的表現力。重｜花邀請觀眾思考傳統與現代、靜態與動態之間的關係，體驗工藝與科技融合所帶來的獨特美感。",
        category: "溫工藝",
        images: {
          main: "/main4.webp",
          details: [
            { image: "/detail1.webp" },
            { image: "/detail2.webp" }
          ]
        }
      },
      {
        id: "cold-spark-2",
        title: { main: "光影織度", sub: "Light Texture" },
        description: "運用光線在不同材質表面的反射與折射，創造出豐富的光影層次，呈現出獨特的視覺體驗。",
        longDescription: "光影織度是一個運用光線在不同材質表面的反射與折射，創造出豐富的光影層次的創新作品。這件作品利用光線在不同材質表面的反射與折射，創造出豐富的光影層次，呈現出獨特的視覺體驗。觀眾可以通過觀察這件作品，感受到光線在不同材質表面反射與折射所產生的豐富光影效果。這件作品不僅探索了光線與視覺之間的關係，也為觀眾提供了一種新的感知和理解光影的方式，鼓勵人們用更多元的感官去體驗周圍的世界。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            { image: "/placeholder.svg?height=400&width=600" },
            { image: "/placeholder.svg?height=400&width=600" }
          ]
        }
      },
      {
        id: "warm-craft-3",
        title: { main: "竹織燈影", sub: "Bamboo Light Weaving" },
        description: "結合傳統竹編工藝與現代照明設計，創造出層次豐富的光影效果。每一片竹片都經過精心編織，在光線照射下呈現出獨特的光影紋理。",
        longDescription: "竹織燈影是一件結合傳統竹編工藝與現代照明設計的創新作品。這件作品通過將傳統竹編工藝與現代照明設計結合，創造出層次豐富的光影效果。每一片竹片都經過精心編織，在光線照射下呈現出獨特的光影紋理。這件作品不僅展現了傳統竹編工藝的精湛技術，也融入了現代科技元素，使靜態的竹片獲得了動態的表現力。竹織燈影邀請觀眾思考傳統與現代、靜態與動態之間的關係，體驗工藝與科技融合所帶來的獨特美感。",
        category: "溫工藝",
        images: {
          main: "/main5.webp",
          details: [
            { image: "/main5.webp" },
            { image: "/placeholder.svg?height=400&width=600" }
          ]
        }
      },
      {
        id: "hot-dialogue-3",
        title: { main: "聲音織布機", sub: "Sound Weaving Loom" },
        description: "延續壓花玻璃的傳統工藝，將海棠花玻璃融入現代燈具設計，結合復古質感與當代美學。透過光線穿透壓花玻璃，營造柔和層次的光影效果，為空間增添氛圍，賦予經典圖騰新的設計語彙。",
        longDescription: "台灣傳統的壓花玻璃已經停產，曾經隨處可見的這些玻璃，如今成為承載時代記憶的珍貴復古素材。它們不僅反映了台灣特有的美學與工藝，也見證了歲月流轉下的生活軌跡。\n\n本設計旨在重新賦予這些老舊材料新的生命，透過創新的拼接與轉化方式，將原本平面的壓花玻璃組合為立體結構，使其在現代空間中展現嶄新的應用價值。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            { image: "/placeholder.svg?height=400&width=600" },
            { image: "/placeholder.svg?height=400&width=600" }
          ]
        }
      }
    ]
  },
  {
    id: "designer-2",
    name: { zh: "李小華", pinyin: "Li Xiao Hua" },
    image: "/face2/colorful2.jpg",
    works: [
      {
        id: "comfort-nest-1",
        title: {
          main: "Rolling Rescue",
          sub: "兒童平衡遊戲"
        },
        description: "兒童傾斜圓盤使小球滾動，避開障礙物順利滾到動物口中",
        longDescription: "Rolling Rescue是一款專為兒童設計的平衡遊戲，旨在培養孩子的手眼協調能力、精細動作控制和空間感知能力。遊戲由一個可傾斜的圓形遊戲盤和一系列精心設計的障礙物組成，玩家需要通過傾斜遊戲盤來控制小球的滾動方向和速度，避開途中的障礙物，最終將小球引導至動物造型的目標區域。\n\n遊戲盤採用環保木材製作，表面經過精細打磨，確保手感舒適且安全。障礙物和動物造型採用鮮豔的色彩設計，吸引兒童的注意力並激發遊戲興趣。遊戲設有不同難度級別，適合不同年齡段的兒童，從簡單的直線路徑到複雜的迷宮設計，提供漸進式的挑戰。\n\nRolling Rescue不僅是一款有趣的遊戲，也是一個教育工具，它能夠幫助兒童發展問題解決能力、耐心和專注力。遊戲的互動性和挑戰性使孩子們在玩樂中學習，培養積極的學習態度和成就感。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "UUUstool是一個融合多種造型語彙的創新作品。這件作品由三張高低不一的凳子組成，每張凳子的整體框架以倒U型為主要結構，U型的底部稍微擴大。這種設計不僅增添了凳子的穩定性，也作為造型語言的一部分，為家居環境增添了獨特的美感。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "光譜共鳴是一個透過特殊的光學材料與聲音感應技術，創造出能夠隨著音樂節奏變化的光影裝置的創新作品。這件作品利用特殊的光學材料與聲音感應技術，創造出能夠隨著音樂節奏變化的光影裝置，將聽覺體驗轉化為視覺饗宴。觀眾可以通過觀察這件作品，感受到光影隨著音樂節奏變化的動態效果。這件作品不僅探索了光影與聽覺之間的關係，也為觀眾提供了一種新的感知和理解光影的方式，鼓勵人們用更多元的感官去體驗周圍的世界。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "陶光映影是一件運用傳統陶藝技法製作出的獨特鏤空陶瓷燈具的創新作品。這件作品通過運用傳統陶藝技法，製作出獨特的鏤空陶瓷燈具，光線穿過精心設計的孔洞，在牆面上投射出豐富的光影圖案。這件作品不僅展現了傳統陶藝的精湛技術，也融入了現代科技元素，使靜態的陶瓷獲得了動態的表現力。陶光映影邀請觀眾思考傳統與現代、靜態與動態之間的關係，體驗工藝與科技融合所帶來的獨特美感。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
            }
          ]
        }
      }
    ]
  },
  {
    id: "designer-3",
    name: { zh: "張小芳", pinyin: "Zhang Xiao Fang" },
    image: "/face2/colorful3.jpg",
    works: [
      {
        id: "hot-dialogue-1",
        title: {
          main: "COLONO",
          sub: "音樂軌道車"
        },
        description: "利用彩虹的顏色代表著音符，讓小朋友自由拼接出屬於自己的軌道音樂！",
        longDescription: "COLONO是一個利用彩虹的顏色代表著音符，讓小朋友自由拼接出屬於自己的軌道音樂的創新作品。這件作品利用彩虹的顏色代表著音符，讓小朋友自由拼接出屬於自己的軌道音樂！觀眾可以通過觀察這件作品，感受到彩虹的色彩與音樂之間的關係。這件作品不僅探索了色彩與音樂之間的關係，也為觀眾提供了一種新的感知和理解音樂的方式，鼓勵人們用更多元的感官去體驗周圍的世界。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "Echo Wall是一個透過觸摸感應技術，讓使用者能夠通過觸碰牆面創造出獨特的聲音組合，形成一面充滿互動性的音樂牆的創新作品。這面音樂牆配備了高精度的觸摸感應器，能夠實時捕捉觀眾的觸摸動作，並將這些動作轉化為獨特的聲音組合。觀眾可以通過觸摸音樂牆的不同位置，創造出不同的聲音效果。這件作品不僅探索了觸摸與聲音之間的關係，也為觀眾提供了一種新的感知和理解聲音的方式，鼓勵人們用更多元的感官去體驗周圍的世界。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "織夢椅是一件採用特殊編織技術，將傳統藤編工藝與現代家具設計結合，創造出既舒適又富有藝術感的休閒椅的創新作品。這件作品通過將傳統藤編工藝與現代家具設計結合，創造出既舒適又富有藝術感的休閒椅。椅子的編織結構經過精心設計，確保了椅子的舒適性和穩定性。同時，椅子的造型也富有藝術感，為家居環境增添了獨特的美感。這件作品不僅考慮了使用者的舒適性，也兼顧了藝術美感，創造出傳統與現代交融的獨特美感。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "數位織影是一個結合數位投影與互動感應技術，創造出能與觀眾互動的光影裝置的創新作品。這件作品利用數位投影與互動感應技術，創造出能與觀眾互動的光影裝置，讓人彷彿置身於流動的光織物中。觀眾可以通過觀察這件作品，感受到光影隨著數位投影而動態變化的效果。這件作品不僅探索了數位投影與視覺之間的關係，也為觀眾提供了一種新的感知和理解光影的方式，鼓勵人們用更多元的感官去體驗周圍的世界。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
            }
          ]
        }
      }
    ]
  },
  {
    id: "designer-4",
    name: { zh: "陳小雨", pinyin: "Chen Xiao Yu" },
    image: "/face2/colorful4.jpg",
    works: [
      {
        id: "cold-spark-1",
        title: {
          main: "Dynamic Joinery Luminaries",
          sub: "活動式榫接燈具"
        },
        description: "以光固化軟料作為鳩尾榫的材質，使零件與零件的連接有了活性，進而使榫接工藝作品的造型有不同的可能。",
        longDescription: "Dynamic Joinery Luminaries是一個以光固化軟料作為鳩尾榫的材質，使零件與零件的連接有了活性的創新作品。這件作品通過將光固化軟料作為鳩尾榫的材質，使零件與零件的連接有了活性，進而使榫接工藝作品的造型有不同的可能。這件作品不僅展現了榫接工藝的精湛技術，也融入了現代科技元素，使靜態的零件獲得了動態的表現力。Dynamic Joinery Luminaries邀請觀眾思考傳統與現代、靜態與動態之間的關係，體驗工藝與科技融合所帶來的獨特美感。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "浮光是一個結合磁浮技術與光影設計，創造出一個懸浮的照明裝置的創新作品。這件作品通過將磁浮技術與光影設計結合，創造出一個懸浮的照明裝置，在空間中營造出夢幻的氛圍。觀眾可以通過觀察這件作品，感受到光影隨著磁浮技術而動態變化的效果。這件作品不僅探索了磁浮與視覺之間的關係，也為觀眾提供了一種新的感知和理解光影的方式，鼓勵人們用更多元的感官去體驗周圍的世界。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "溫度織錄是一件運用感溫材料與傳統編織工藝，創造出能夠隨環境溫度變化而改變圖案的織品裝置的創新作品。這件作品通過運用感溫材料與傳統編織工藝，創造出能夠隨環境溫度變化而改變圖案的織品裝置，展現了科技與工藝的完美結合。這件作品不僅展現了傳統編織工藝的精湛技術，也融入了現代科技元素，使靜態的織品獲得了動態的表現力。溫度織錄邀請觀眾思考傳統與現代、靜態與動態之間的關係，體驗工藝與科技融合所帶來的獨特美感。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "聲光對話是一個結合聲音與光影的互動裝置的創新作品。這件作品能夠捕捉使用者的聲音，並將其轉化為動態的光影效果，創造出獨特的感官體驗。觀眾可以通過觀察這件作品，感受到聲音與光影隨著使用者的聲音而動態變化的效果。這件作品不僅探索了聲音與視覺之間的關係，也為觀眾提供了一種新的感知和理解聲音的方式，鼓勵人們用更多元的感官去體驗周圍的世界。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
            }
          ]
        }
      }
    ]
  },
  {
    id: "designer-5",
    name: { zh: "林雅婷", pinyin: "Lin Ya Ting" },
    image: "/face2/colorful5.jpg",
    works: [
      {
        id: "warm-craft-5-d5",
        title: {
          main: "竹韻",
          sub: "Bamboo Rhythm"
        },
        description: "結合傳統竹編工藝與現代音響設計，創造出獨特的自然聲學體驗。竹材的多孔結構與特殊編織方式，賦予音響溫潤的音質。",
        longDescription: "竹韻是一個結合傳統竹編工藝與現代音響設計，創造出獨特的自然聲學體驗的創新作品。這件作品通過將傳統竹編工藝與現代音響設計結合，創造出獨特的自然聲學體驗。竹材的多孔結構與特殊編織方式，賦予音響溫潤的音質。這件作品不僅展現了傳統竹編工藝的精湛技術，也融入了現代科技元素，使靜態的竹材獲得了動態的表現力。竹韻邀請觀眾思考傳統與現代、靜態與動態之間的關係，體驗工藝與科技融合所帶來的獨特美感。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "光織椅是一件採用特殊光纖織物，打造出會隨環境光線變化的座椅的創新作品。這件作品通過採用特殊光纖織物，打造出會隨環境光線變化的座椅，在不同時段呈現出不同的視覺效果，為空間增添活力。這件作品不僅考慮了使用者的舒適性，也考慮了環境因素，創造出傳統與現代交融的獨特美感。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
            }
          ]
        }
      }
    ]
  },
  {
    id: "designer-6",
    name: { zh: "陳俊宏", pinyin: "Chen Jun Hong" },
    image: "/face2/colorful6.jpg",
    works: [
      {
        id: "cold-spark-6",
        title: {
          main: "智慧花園",
          sub: "Smart Garden"
        },
        description: "結合IoT技術的智慧植物培育系統，透過感測器監測植物生長狀況，自動調節光照、溫度和濕度，實現智慧化的居家園藝。",
        longDescription: "智慧花園是一個結合IoT技術的智慧植物培育系統的創新作品。這件作品通過將IoT技術與智慧植物培育系統結合，創造出智慧化的居家園藝。系統內置了高精度的感測器，能夠實時監測植物生長狀況，包括光照、溫度和濕度等。這些數據經過分析後，系統會自動調節光照、溫度和濕度，為植物提供最佳的生長環境。這件作品不僅展現了IoT技術的應用，也為觀眾提供了一種新的感知和理解智慧家居的方式，鼓勵人們用更多元的感官去體驗周圍的世界。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "聲光對話是一個互動式聲光裝置的創新作品。這件作品能夠捕捉使用者的聲音並轉換為動態光影，創造出獨特的感官體驗。觀眾可以通過觀察這件作品，感受到聲音與光影隨著使用者的聲音而動態變化的效果。這件作品不僅探索了聲音與視覺之間的關係，也為觀眾提供了一種新的感知和理解聲音的方式，鼓勵人們用更多元的感官去體驗周圍的世界。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
            }
          ]
        }
      }
    ]
  },
  {
    id: "designer-7",
    name: { zh: "黃詩涵", pinyin: "Huang Shi Han" },
    image: "/face2/colorful7.jpg",
    works: [
      {
        id: "comfort-nest-7",
        title: {
          main: "模組化收納櫃",
          sub: "Modular Storage"
        },
        description: "創新的模組化收納系統，可根據使用者需求自由組合，適應不同空間和收納需求。",
        longDescription: "模組化收納櫃是一個創新的模組化收納系統的創新作品。這件作品通過將模組化收納系統與不同空間和收納需求結合，創造出創新的模組化收納系統。這件作品不僅考慮了使用者的需求，也考慮了不同空間和收納需求的適應性。觀眾可以通過觀察這件作品，感受到模組化收納系統的靈活性和適應性。這件作品不僅考慮了使用者的需求，也考慮了不同空間和收納需求的適應性，創造出傳統與現代交融的獨特美感。",
        category: "舒適巢",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "織影是一件結合傳統編織工藝與現代投影技術，創造出動態變化的光影藝術裝置的創新作品。這件作品通過將傳統編織工藝與現代投影技術結合，創造出動態變化的光影藝術裝置。觀眾可以通過觀察這件作品，感受到光影隨著編織工藝而動態變化的效果。這件作品不僅探索了傳統編織工藝與視覺之間的關係，也為觀眾提供了一種新的感知和理解光影的方式，鼓勵人們用更多元的感官去體驗周圍的世界。",
        category: "溫工藝",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
            }
          ]
        }
      }
    ]
  },
  {
    id: "designer-8",
    name: { zh: "王建明", pinyin: "Wang Jian Ming" },
    image: "/face2/colorful8.jpg",
    works: [
      {
        id: "cold-spark-8",
        title: {
          main: "環保能源椅",
          sub: "Eco Energy Chair"
        },
        description: "融合太陽能與人體動能發電技術的創新座椅，可將日常活動轉換為清潔能源。",
        longDescription: "環保能源椅是一個融合太陽能與人體動能發電技術的創新座椅的創新作品。這件作品通過將太陽能與人體動能發電技術結合，創造出融合太陽能與人體動能發電技術的創新座椅，可將日常活動轉換為清潔能源。這件作品不僅考慮了環保因素，也考慮了使用者的舒適性，創造出傳統與現代交融的獨特美感。",
        category: "冷火花",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
        longDescription: "共享閱讀空間是一個可變形的公共閱讀空間設計的創新作品。這件作品通過將可變形的公共閱讀空間設計與社區交流和知識分享結合，創造出可變形的公共閱讀空間設計，促進社區交流與知識分享。這件作品不僅考慮了使用者的需求，也考慮了社區交流和知識分享的因素，創造出傳統與現代交融的獨特美感。",
        category: "熱對話",
        images: {
          main: "/placeholder.svg?height=600&width=800",
          details: [
            {
              image: "/placeholder.svg?height=400&width=600"
            },
            {
              image: "/placeholder.svg?height=400&width=600"
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
  return designers.find(designer => designer.works.some(work => work.id === workId))
}

// 輔助函數：根據類別獲取所有作品
export function getWorksByCategory(category: WorkCategory): Work[] {
  return designers.flatMap(designer => designer.works.filter(work => work.category === category))
}

// 輔助函數：獲取所有作品
export function getAllWorks(): Work[] {
  return designers.flatMap(designer => designer.works)
}

// 輔助函數：根據 slug 獲取設計師資料
export function getDesignerBySlug(slug: string): Designer | undefined {
  return designers.find(designer => designer.id === slug)
} 