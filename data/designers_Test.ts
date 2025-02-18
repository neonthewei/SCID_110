interface Designer {
    id: string;
    name: string;
    image: string;
    works: Work[];
    workCount: number;
}

interface Work {
    title: string;
    subtitle: string;
    description: string;
    category: string;
    images: {
        main: string;
        details: string[];
    };
}

export const designers: Designer[] = [
    {
        id: "A110130001",
        name: "魏丹葳",
        image: "/designers/A110130001/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "重｜花 re:cHUĀn",
                subtitle: "單元編織系列燈具",
                description: "將同一個最小單位做多種合併嘗試，透過顏色與造型的穿插創造出一系列具有穿花意象的結構燈具組。",
                category: "溫工藝",
                images: {
                    main: "/works/A110130001/main.jpg",
                    details: [
                        "/works/A110130001/detail1.jpg",
                        "/works/A110130001/detail2.jpg",
                        "/works/A110130001/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130002",
        name: "鄭雅云",
        image: "/designers/A110130002/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Rolling Rescue",
                subtitle: "兒童手眼平衡遊戲",
                description: "兒童傾斜圓盤使小球滾動，避開障礙物順利滾到動物口中",
                category: "舒適巢",
                images: {
                    main: "/works/A110130002/main.jpg",
                    details: [
                        "/works/A110130002/detail1.jpg",
                        "/works/A110130002/detail2.jpg",
                        "/works/A110130002/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130003",
        name: "許哲嘉",
        image: "/designers/A110130003/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Dynamic Joinery Luminaries",
                subtitle: "活動式榫接燈具",
                description: "以光固化軟料作為鳩尾榫的材質，使零件與零件的連接有了活性，進而使榫接工藝作品的造型有不同的可能。",
                category: "溫工藝",
                images: {
                    main: "/works/A110130003/main.jpg",
                    details: [
                        "/works/A110130003/detail1.jpg",
                        "/works/A110130003/detail2.jpg",
                        "/works/A110130003/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130004",
        name: "余美欣",
        image: "/designers/A110130004/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "COLONO",
                subtitle: "顏色音樂軌道車車",
                description: "利用彩虹的顏色代表著音符，讓小朋友自由拼接出屬於自己的軌道音樂！",
                category: "舒適巢",
                images: {
                    main: "/works/A110130004/main.jpg",
                    details: [
                        "/works/A110130004/detail1.jpg",
                        "/works/A110130004/detail2.jpg",
                        "/works/A110130004/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130006",
        name: "施念貞",
        image: "/designers/A110130006/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "nan",
                subtitle: "nan",
                description: "nan",
                category: "舒適巢",
                images: {
                    main: "/works/A110130006/main.jpg",
                    details: [
                        "/works/A110130006/detail1.jpg",
                        "/works/A110130006/detail2.jpg",
                        "/works/A110130006/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130008",
        name: "楊文儀",
        image: "/designers/A110130008/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "UUUstool",
                subtitle: "羊毛氈凳子組",
                description: "融合多種造型語彙，包括球體、條狀結構與鐵網，此系列包含三張高低不一的凳子，整體框架以倒U型為主要結構，U型的底部稍微擴大，既增添了穩定性，也作為造型語言的一部分。",
                category: "溫工藝",
                images: {
                    main: "/works/A110130008/main.jpg",
                    details: [
                        "/works/A110130008/detail1.jpg",
                        "/works/A110130008/detail2.jpg",
                        "/works/A110130008/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130010",
        name: "林希宸",
        image: "/designers/A110130010/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "nan",
                subtitle: "nan",
                description: "nan",
                category: "冷火花",
                images: {
                    main: "/works/A110130010/main.jpg",
                    details: [
                        "/works/A110130010/detail1.jpg",
                        "/works/A110130010/detail2.jpg",
                        "/works/A110130010/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130011",
        name: "蕭卉芯",
        image: "/designers/A110130011/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "FUROSHIKI+",
                subtitle: "風呂敷式筆電保護包",
                description: "FUROSHIKI+為一風呂敷式筆電保護包。保留風呂敷的包裹流程和造型特性，回應傳統文化之美同時因應當代需求。",
                category: "熱對話",
                images: {
                    main: "/works/A110130011/main.jpg",
                    details: [
                        "/works/A110130011/detail1.jpg",
                        "/works/A110130011/detail2.jpg",
                        "/works/A110130011/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130012",
        name: "王闥蒙",
        image: "/designers/A110130012/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "過伍關展陸樣",
                subtitle: "家庭互動大富翁",
                description: "與以往的大富翁不同，透過抽牌拼接出一圈拼圖道路，每種道路的任務性質不同，透過問題與任務，與父母互動拉近家庭情感，搭配上四座愛心建築，讓遊戲體驗更有氣氛。",
                category: "熱對話",
                images: {
                    main: "/works/A110130012/main.jpg",
                    details: [
                        "/works/A110130012/detail1.jpg",
                        "/works/A110130012/detail2.jpg",
                        "/works/A110130012/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130013",
        name: "王可安",
        image: "/designers/A110130013/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Nukumo ",
                subtitle: "布料工藝燈具",
                description: "皺摺紋理不僅承載了傳統工藝的溫度，也像是時間在布料上的刻畫，在手工縫製與光影的交互作用下，透過光的投射形成流動般的視覺效果，讓靜態的材質擁有動態的生命力。",
                category: "溫工藝",
                images: {
                    main: "/works/A110130013/main.jpg",
                    details: [
                        "/works/A110130013/detail1.jpg",
                        "/works/A110130013/detail2.jpg",
                        "/works/A110130013/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130014",
        name: "曾柏偉",
        image: "/designers/A110130014/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Petro",
                subtitle: " 城市共行寵物載具",
                description: "城市共行寵物載具提升帶寵物出行的便利性，讓寵物主人在城市交通環境中能夠輕鬆地帶著寵物進行中短距離旅行和戶外活動。",
                category: "冷火花",
                images: {
                    main: "/works/A110130014/main.jpg",
                    details: [
                        "/works/A110130014/detail1.jpg",
                        "/works/A110130014/detail2.jpg",
                        "/works/A110130014/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130015",
        name: "黃皓予",
        image: "/designers/A110130015/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "MOTOLIFT",
                subtitle: "都市跑旅",
                description: "MOTOLIFT 為都市生活帶來便利，透過精巧的電能與機構設計，將節省的空間轉化為可供使用者靈活運用的實用空間。無論是日常生活中的瑣事，抑或休閒出遊，MOTOLIFT 都能提供卓越的功能性與便捷性，讓每一刻都充滿可能。",
                category: "冷火花",
                images: {
                    main: "/works/A110130015/main.jpg",
                    details: [
                        "/works/A110130015/detail1.jpg",
                        "/works/A110130015/detail2.jpg",
                        "/works/A110130015/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130017",
        name: "陳宗楠",
        image: "/designers/A110130017/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Petalori",
                subtitle: "花瓣椅子",
                description: "以線與帆布纏繞出連續的pattern 布面鋪於結構上",
                category: "舒適巢",
                images: {
                    main: "/works/A110130017/main.jpg",
                    details: [
                        "/works/A110130017/detail1.jpg",
                        "/works/A110130017/detail2.jpg",
                        "/works/A110130017/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130018",
        name: "郭宗宬",
        image: "/designers/A110130018/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "FlexiGo",
                subtitle: "輕型移動載具",
                description: "透過輕量化骨架，在輕便簡易的同時還可以安全乘載使用者",
                category: "冷火花",
                images: {
                    main: "/works/A110130018/main.jpg",
                    details: [
                        "/works/A110130018/detail1.jpg",
                        "/works/A110130018/detail2.jpg",
                        "/works/A110130018/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130019",
        name: "陳竹筠",
        image: "/designers/A110130019/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "S-Track ",
                subtitle: "折疊式沙灘急救擔架",
                description: "兼具手提與沙灘車拖行功能，輕便可摺疊，氣球越野胎適應沙地救援需求，提供快速、安全的救援轉運解決方案",
                category: "冷火花",
                images: {
                    main: "/works/A110130019/main.jpg",
                    details: [
                        "/works/A110130019/detail1.jpg",
                        "/works/A110130019/detail2.jpg",
                        "/works/A110130019/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130021",
        name: "成品宜",
        image: "/designers/A110130021/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "磚專",
                subtitle: "複合媒材花磚家具",
                description: "運用柔軟的媒材，如毛線、織物、氈材等，重新詮釋花磚，打破傳統陶瓷呈現的硬質形象。",
                category: "溫工藝",
                images: {
                    main: "/works/A110130021/main.jpg",
                    details: [
                        "/works/A110130021/detail1.jpg",
                        "/works/A110130021/detail2.jpg",
                        "/works/A110130021/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130023",
        name: "謝函穎",
        image: "/designers/A110130023/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "GENESIS",
                subtitle: "年長者電輔三輪車",
                description: "利用低跨，低座高及手把改變騎乘三角，並利用電輔進行低強度運動的優勢，結合三輪，設計一台專屬於年長者的自行車",
                category: "冷火花",
                images: {
                    main: "/works/A110130023/main.jpg",
                    details: [
                        "/works/A110130023/detail1.jpg",
                        "/works/A110130023/detail2.jpg",
                        "/works/A110130023/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130027",
        name: "郭啓恩",
        image: "/designers/A110130027/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "DUALCON",
                subtitle: "雙模式年長代步車",
                description: "一款結合助行器(自主行動)與代步車(電動輔助)的行動載具，增加功能的同時將操作流程最大簡化，針對不同場合供使用者切換模式使用。",
                category: "冷火花",
                images: {
                    main: "/works/A110130027/main.jpg",
                    details: [
                        "/works/A110130027/detail1.jpg",
                        "/works/A110130027/detail2.jpg",
                        "/works/A110130027/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130029",
        name: "劉睿珊",
        image: "/designers/A110130029/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Furry Greenie",
                subtitle: "自然主題單人沙發椅",
                description: "以不同面料創造出大自然感覺的單人沙發",
                category: "舒適巢",
                images: {
                    main: "/works/A110130029/main.jpg",
                    details: [
                        "/works/A110130029/detail1.jpg",
                        "/works/A110130029/detail2.jpg",
                        "/works/A110130029/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130030",
        name: "林瑜樺",
        image: "/designers/A110130030/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "TerraAura ",
                subtitle: "新型態微型電動中耕機",
                description: "補足原先中耕機的安全隱患，並創造出於傳統不同的外型",
                category: "冷火花",
                images: {
                    main: "/works/A110130030/main.jpg",
                    details: [
                        "/works/A110130030/detail1.jpg",
                        "/works/A110130030/detail2.jpg",
                        "/works/A110130030/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130035",
        name: "蘇秦萱",
        image: "/designers/A110130035/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "MeWeve ",
                subtitle: "不鏽鋼編織傢俱系列",
                description: "將傳統的竹編巧思與現代金屬材料結合，賦予金屬材質全新的生命。讓傳統與新穎交織，呈現出自然與工藝之間的突破。",
                category: "溫工藝",
                images: {
                    main: "/works/A110130035/main.jpg",
                    details: [
                        "/works/A110130035/detail1.jpg",
                        "/works/A110130035/detail2.jpg",
                        "/works/A110130035/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130041",
        name: "葉芯妤",
        image: "/designers/A110130041/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Tippy ",
                subtitle: "兒童兩用蹺蹺椅",
                description: "將蹺蹺板透過手把與椅腳轉換成兒童長椅，提供兒童居家遊樂空間。",
                category: "舒適巢",
                images: {
                    main: "/works/A110130041/main.jpg",
                    details: [
                        "/works/A110130041/detail1.jpg",
                        "/works/A110130041/detail2.jpg",
                        "/works/A110130041/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130042",
        name: "趙雅寧",
        image: "/designers/A110130042/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "自由界線-屏風",
                subtitle: "辦公家具",
                description: "屏風以自然元素為靈感，透過柔和、有機的線條與青蘋果綠的色調，營造平靜、清新且溫暖的氛圍。如同原子間的鍵結形成分子、細胞彼此連結構成人體，人與人之間的情感交織成群體。希望藉此喚起對人際關係的反思，為未來的生活與環境注入更多美好與希望。",
                category: "冷火花",
                images: {
                    main: "/works/A110130042/main.jpg",
                    details: [
                        "/works/A110130042/detail1.jpg",
                        "/works/A110130042/detail2.jpg",
                        "/works/A110130042/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130043",
        name: "余宥璋",
        image: "/designers/A110130043/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "陸分",
                subtitle: "鋼筋&水泥家具",
                description: "將平常被埋沒在水泥裡鋼筋顯露出來，利用鋼筋獨特材質外觀與出眾的支撐力，展現這張椅子的力與美",
                category: "溫工藝",
                images: {
                    main: "/works/A110130043/main.jpg",
                    details: [
                        "/works/A110130043/detail1.jpg",
                        "/works/A110130043/detail2.jpg",
                        "/works/A110130043/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130044",
        name: "陳育楷",
        image: "/designers/A110130044/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "「脂·美」",
                subtitle: "「脂·美」 系列家具",
                description: "此作品聚焦於肥胖的意象,重新定義脂肪層的堆疊為一種美的象徵。通過使用堆疊的皮革,作品模擬了豐滿的形體,這不僅挑戰了傳統審美",
                category: "舒適巢",
                images: {
                    main: "/works/A110130044/main.jpg",
                    details: [
                        "/works/A110130044/detail1.jpg",
                        "/works/A110130044/detail2.jpg",
                        "/works/A110130044/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130048",
        name: "林冠宇",
        image: "/designers/A110130048/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "NODE-Bike Helmet Sharing System",
                subtitle: "共享單車安全帽系統",
                description: "對肥胖的負面看法,還將其轉變為一種豐盈之美。作品傳達出對多樣化美感的尊重,強調肉體的厚重感也能是力量與美的具現。",
                category: "熱對話",
                images: {
                    main: "/works/A110130048/main.jpg",
                    details: [
                        "/works/A110130048/detail1.jpg",
                        "/works/A110130048/detail2.jpg",
                        "/works/A110130048/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130049",
        name: "林芸秀",
        image: "/designers/A110130049/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "鏈結",
                subtitle: "可調節社交距離公共家具",
                description: "nan",
                category: "舒適巢",
                images: {
                    main: "/works/A110130049/main.jpg",
                    details: [
                        "/works/A110130049/detail1.jpg",
                        "/works/A110130049/detail2.jpg",
                        "/works/A110130049/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130053",
        name: "吳莫凡",
        image: "/designers/A110130053/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Undula",
                subtitle: "nan",
                description: "瀾憩是一款沙發躺椅，融合自然意象與現代設計，透過獨特的紋理展現如海浪般的流暢曲線。這款躺椅以舒適性與美感為核心，打造平靜安逸的放鬆氛圍，讓使用者在日常生活中感受如置身海洋般的寧靜與愜意。",
                category: "nan",
                images: {
                    main: "/works/A110130053/main.jpg",
                    details: [
                        "/works/A110130053/detail1.jpg",
                        "/works/A110130053/detail2.jpg",
                        "/works/A110130053/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130055",
        name: "蔡宜靜",
        image: "/designers/A110130055/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Loopa",
                subtitle: "絲瓜洛塑型實驗",
                description: "絲瓜洛塑型實驗強調絲瓜洛的可塑性以及運用纖維可透光的特性與燈光結合。",
                category: "溫工藝",
                images: {
                    main: "/works/A110130055/main.jpg",
                    details: [
                        "/works/A110130055/detail1.jpg",
                        "/works/A110130055/detail2.jpg",
                        "/works/A110130055/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130056",
        name: "李語彤",
        image: "/designers/A110130056/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Dotties",
                subtitle: "繪本互動音樂玩具",
                description: "    Dotties是一套音樂玩具，簡單造型樂器加上繪本，音階配合故事角色，讓孩童輕鬆有趣的學習音樂。是最棒的音樂啟蒙玩具教材！",
                category: "舒適巢",
                images: {
                    main: "/works/A110130056/main.jpg",
                    details: [
                        "/works/A110130056/detail1.jpg",
                        "/works/A110130056/detail2.jpg",
                        "/works/A110130056/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130057",
        name: "戴抒瑜",
        image: "/designers/A110130057/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "社交光鐘 Social Time",
                subtitle: "未來社交健康維持家飾",
                description: "探索虛擬社群與現實健康的平衡，透過家飾型態與使用情境，提醒觀者對實體互動的價值重新認識 ",
                category: "熱對話",
                images: {
                    main: "/works/A110130057/main.jpg",
                    details: [
                        "/works/A110130057/detail1.jpg",
                        "/works/A110130057/detail2.jpg",
                        "/works/A110130057/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130058",
        name: "丁芷晴",
        image: "/designers/A110130058/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "澡享",
                subtitle: "洗澡玩具",
                description: "提升洗澡趣味性",
                category: "舒適巢",
                images: {
                    main: "/works/A110130058/main.jpg",
                    details: [
                        "/works/A110130058/detail1.jpg",
                        "/works/A110130058/detail2.jpg",
                        "/works/A110130058/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130062",
        name: "陳詠芯",
        image: "/designers/A110130062/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Zooly",
                subtitle: "AI兒童環保遊樂組",
                description: "兒童環保遊樂組以可持續材料製作，結合NFC與AI技術，通過AR讓遊玩過程更生動有趣，同時培養孩子的環保意識，傳遞資源再利用的重要概念。",
                category: "舒適巢",
                images: {
                    main: "/works/A110130062/main.jpg",
                    details: [
                        "/works/A110130062/detail1.jpg",
                        "/works/A110130062/detail2.jpg",
                        "/works/A110130062/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A110130063",
        name: "陳文龍",
        image: "/designers/A110130063/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "QD Head Armor",
                subtitle: "快速部署安全頭盔",
                description: "在安全頭盔加入變形結構，並在需要使用時快速打開，使安全頭盔能成為緊急設施",
                category: "冷火花",
                images: {
                    main: "/works/A110130063/main.jpg",
                    details: [
                        "/works/A110130063/detail1.jpg",
                        "/works/A110130063/detail2.jpg",
                        "/works/A110130063/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A109130068",
        name: "何之翔",
        image: "/designers/A109130068/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Charybdis",
                subtitle: "海洋垃圾收集器",
                description: "結合洋流追蹤與自主收集，整合沿岸處理，實現海洋垃圾減量與生態保護。",
                category: "熱對話",
                images: {
                    main: "/works/A109130068/main.jpg",
                    details: [
                        "/works/A109130068/detail1.jpg",
                        "/works/A109130068/detail2.jpg",
                        "/works/A109130068/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A109130009",
        name: "謝秉良",
        image: "/designers/A109130009/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "TwinAxis Cam",
                subtitle: "可拆握把相機",
                description: "提高了相機的客製化設計，可以方便地轉化為不同的使用場景。",
                category: "冷火花",
                images: {
                    main: "/works/A109130009/main.jpg",
                    details: [
                        "/works/A109130009/detail1.jpg",
                        "/works/A109130009/detail2.jpg",
                        "/works/A109130009/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A109130013",
        name: "謝宇昕",
        image: "/designers/A109130013/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Perpluvia ",
                subtitle: "都市快穿雨衣",
                description: "時尚的快穿式兩件式雨衣",
                category: "冷火花",
                images: {
                    main: "/works/A109130013/main.jpg",
                    details: [
                        "/works/A109130013/detail1.jpg",
                        "/works/A109130013/detail2.jpg",
                        "/works/A109130013/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A109130015",
        name: "王虹勻",
        image: "/designers/A109130015/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Dim Series - Furniture",
                subtitle: "陰翳禮讚家具",
                description: "詮釋陰翳禮讚之系列家具",
                category: "舒適巢",
                images: {
                    main: "/works/A109130015/main.jpg",
                    details: [
                        "/works/A109130015/detail1.jpg",
                        "/works/A109130015/detail2.jpg",
                        "/works/A109130015/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A109130020",
        name: "龔佳茵",
        image: "/designers/A109130020/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "LuminAX",
                subtitle: "居家拳擊器材解構",
                description: "解構拳擊器材，讓器材可以融入居家，也能維持訓練功能",
                category: "舒適巢",
                images: {
                    main: "/works/A109130020/main.jpg",
                    details: [
                        "/works/A109130020/detail1.jpg",
                        "/works/A109130020/detail2.jpg",
                        "/works/A109130020/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A109130035",
        name: "蔡幸妏",
        image: "/designers/A109130035/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "幸 · 祈福包",
                subtitle: "中國結編織包",
                description: "以中國結衍生出的含義編織一系列不同場合所背的包款",
                category: "熱對話",
                images: {
                    main: "/works/A109130035/main.jpg",
                    details: [
                        "/works/A109130035/detail1.jpg",
                        "/works/A109130035/detail2.jpg",
                        "/works/A109130035/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A109130045",
        name: "張哲維",
        image: "/designers/A109130045/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "都市觀察計畫＿三角錐",
                subtitle: "家具",
                description: "在舊市容中被作為佔地劃分的工具，出現在街頭。設想在新的城市中，能否賦予它新的功用，繼續的存在、使用。",
                category: "熱對話",
                images: {
                    main: "/works/A109130045/main.jpg",
                    details: [
                        "/works/A109130045/detail1.jpg",
                        "/works/A109130045/detail2.jpg",
                        "/works/A109130045/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A109130049",
        name: "范頌恩",
        image: "/designers/A109130049/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "GF360-T",
                subtitle: "園藝火焰除草工具組",
                description: "透過噴火槍的結構設計，可以使火焰的精確度提高，也可以改變或焰的形狀。此產品希望透過改變噴槍的結構設計，設計出針對園藝這類需要精細控制的火焰除草工具。",
                category: "冷火花",
                images: {
                    main: "/works/A109130049/main.jpg",
                    details: [
                        "/works/A109130049/detail1.jpg",
                        "/works/A109130049/detail2.jpg",
                        "/works/A109130049/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A109130055 ",
        name: "許芯瑜",
        image: "/designers/A109130055/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "TOTE Cart",
                subtitle: "兒童載物滑板車",
                description: "增加孩童戶外活動時的自主能力，透過滑板車隨心裝載自己需要的玩具及工具",
                category: "舒適巢",
                images: {
                    main: "/works/A109130055/main.jpg",
                    details: [
                        "/works/A109130055/detail1.jpg",
                        "/works/A109130055/detail2.jpg",
                        "/works/A109130055/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A108130009",
        name: "陳胤羽",
        image: "/designers/A108130009/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "ハイボロン HAIBOLONG",
                subtitle: "嵌接皮包",
                description: "利用不同的切割方式讓皮革之間相互嵌接，不需任何車縫且可穩固的接合，展現獨特的紋路和圖樣。以波浪、波紋的嵌接紋路作為取名的發想，以「海波浪」的台語音譯為日文和英文作為系列主題。",
                category: "溫工藝",
                images: {
                    main: "/works/A108130009/main.jpg",
                    details: [
                        "/works/A108130009/detail1.jpg",
                        "/works/A108130009/detail2.jpg",
                        "/works/A108130009/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A108130056",
        name: "林峻維",
        image: "/designers/A108130056/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Dadan!",
                subtitle: "AI生圖加速攝影溝通流程",
                description: "透過生成式 AI 可以介入前期的提案階段，生成大量、快速生成視覺模擬圖，讓客戶根據具體效果進行風格方向的調整。這種方法不僅能幫助客戶快速梳理模糊的想法，確保與預期結果保持一致，還能有效減少拍攝當天的調整時間，提升溝通效率。",
                category: "冷火花",
                images: {
                    main: "/works/A108130056/main.jpg",
                    details: [
                        "/works/A108130056/detail1.jpg",
                        "/works/A108130056/detail2.jpg",
                        "/works/A108130056/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A108130060",
        name: "梁丁元",
        image: "/designers/A108130060/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "海廢 · 家 MARINE POLLUTION",
                subtitle: "海廢海缸造景",
                description: "利用珊瑚四處蔓延的生長特性，讓它生長在海洋廢棄物上，並藉由珊瑚與海廢的衝突性，希望提高人們對環境問題的意識。",
                category: "熱對話",
                images: {
                    main: "/works/A108130060/main.jpg",
                    details: [
                        "/works/A108130060/detail1.jpg",
                        "/works/A108130060/detail2.jpg",
                        "/works/A108130060/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A108130063",
        name: "方恩銘",
        image: "/designers/A108130063/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "VERSA ",
                subtitle: "多型態助行杖",
                description: "助行杖有多種組合的可能，在不同的使用過程中有著同一機構改變來適應。",
                category: "熱對話",
                images: {
                    main: "/works/A108130063/main.jpg",
                    details: [
                        "/works/A108130063/detail1.jpg",
                        "/works/A108130063/detail2.jpg",
                        "/works/A108130063/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A108130066 ",
        name: "方怡文",
        image: "/designers/A108130066/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "Coins with glow",
                subtitle: "映·幣",
                description: "用錢做設計",
                category: "熱對話",
                images: {
                    main: "/works/A108130066/main.jpg",
                    details: [
                        "/works/A108130066/detail1.jpg",
                        "/works/A108130066/detail2.jpg",
                        "/works/A108130066/detail3.jpg"
                    ]
                }
            }
        ]
    },
    {
        id: "A108130202",
        name: "夏聿璐",
        image: "/designers/A108130202/profile.jpg",
        workCount: 1,
        works: [
            {
                title: "MUFFA-tata",
                subtitle: "模具椅子",
                description: "透過油壓模具壓出尖的和圓的，坐墊用明亮顯眼的顏色，營造出蛋糕夜出來的感覺。",
                category: "溫工藝",
                images: {
                    main: "/works/A108130202/main.jpg",
                    details: [
                        "/works/A108130202/detail1.jpg",
                        "/works/A108130202/detail2.jpg",
                        "/works/A108130202/detail3.jpg"
                    ]
                }
            }
        ]
    },
];
