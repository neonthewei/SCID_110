// 簡化的中文到羅馬拼音轉換函數
const toPinyin = (name: string) => {
  const pinyinMap: { [key: string]: string } = {
    魏: "Wei",
    丹: "Dan",
    葳: "Wei",
    鄭: "Cheng",
    雅: "Ya",
    云: "Yun",
    許: "Hsu",
    哲: "Che",
    嘉: "Chia",
    余: "Yu",
    美: "Mei",
    欣: "Hsin",
    施: "Shih",
    念: "Nien",
    貞: "Chen",
    楊: "Yang",
    文: "Wen",
    儀: "Yi",
    林: "Lin",
    希: "Hsi",
    宸: "Chen",
    蕭: "Hsiao",
    卉: "Hui",
    芯: "Hsin",
    王: "Wang",
    闥: "Ta",
    蒙: "Meng",
    可: "Ke",
    安: "An",
    曾: "Tseng",
    柏: "Po",
    偉: "Wei",
    黃: "Huang",
    皓: "Hao",
    予: "Yu",
    陳: "Chen",
    宗: "Tsung",
    楠: "Nan",
    郭: "Kuo",
    宬: "Kung",
    竹: "Chu",
    筠: "Yun",
    成: "Cheng",
    品: "Pin",
    宜: "Yi",
    謝: "Hsieh",
    函: "Han",
    穎: "Ying",
    啓: "Chi",
    恩: "En",
    劉: "Liu",
    睿: "Jui",
    珊: "Shan",
    瑜: "Yu",
    樺: "Hua",
    蘇: "Su",
    秦: "Chin",
    萱: "Hsuan",
    葉: "Yeh",
    妤: "Yu",
    趙: "Chao",
    寧: "Ning",
    宥: "Yu",
    璋: "Chang",
    育: "Yu",
    楷: "Kai",
    冠: "Kuan",
    宇: "Yu",
    芸: "Yun",
    秀: "Hsiu",
    吳: "Wu",
    莫: "Mo",
    凡: "Fan",
    蔡: "Tsai",
    靜: "Ching",
    李: "Li",
    語: "Yu",
    彤: "Tung",
    戴: "Tai",
    抒: "Shu",
    丁: "Ting",
    芷: "Chih",
    晴: "Ching",
    詠: "Yung",
    龍: "Lung",
    何: "Ho",
    之: "Chih",
    翔: "Hsiang",
    秉: "Ping",
    良: "Liang",
    昕: "Hsin",
    虹: "Hung",
    勻: "Yun",
    龔: "Kung",
    佳: "Chia",
    茵: "Yin",
    幸: "Hsing",
    妏: "Wen",
    張: "Chang",
    維: "Wei",
    范: "Fan",
    頌: "Sung",
    胤: "Yin",
    峻: "Chun",
    梁: "Liang",
    元: "Yuan",
    方: "Fang",
    怡: "Yi",
    夏: "Hsia",
    聿: "Yu",
    璐: "Lu",
  };

  return name
    .split("")
    .map((char) => pinyinMap[char] || char)
    .join("-");
};

// 定義作品類型
export type WorkCategory = "舒適巢" | "溫工藝" | "熱對話" | "冷火花";

// 定義作品介面
export interface Work {
  id: string;
  order?: number;
  title: { main: string; sub: string };
  description: string;
  longDescription: string;
  category: WorkCategory;
  images: {
    main: string;
    preview: string;
    details: Array<{ image: string }>;
  };
}

// 定義設計師介面
export interface Designer {
  id: string;
  name: { zh: string; pinyin: string };
  image: string;
  works: Work[];
  social?: {
    email?: string;
    instagram?: string;
    behance?: string;
  };
}

// 導入設計師資料
import a110130001 from "./all_json/a110130001.json";
import a110130002 from "./all_json/a110130002.json";
import a110130003 from "./all_json/a110130003.json";
import a110130004 from "./all_json/a110130004.json";
import a110130006 from "./all_json/a110130006.json";
import a110130008 from "./all_json/a110130008.json";
import a110130011 from "./all_json/a110130011.json";
import a110130012 from "./all_json/a110130012.json";
import a110130013 from "./all_json/a110130013.json";
import a110130014 from "./all_json/a110130014.json";
import a110130015 from "./all_json/a110130015.json";
import a110130017 from "./all_json/a110130017.json";
import a110130018 from "./all_json/a110130018.json";
import a110130019 from "./all_json/a110130019.json";
import a110130021 from "./all_json/a110130021.json";
import a110130023 from "./all_json/a110130023.json";
import a110130027 from "./all_json/a110130027.json";
import a110130029 from "./all_json/a110130029.json";
import a110130030 from "./all_json/a110130030 .json";
import a110130035 from "./all_json/a110130035.json";
import a110130041 from "./all_json/a110130041.json";
import a110130042 from "./all_json/a110130042.json";
import a110130043 from "./all_json/a110130043.json";
import a110130044 from "./all_json/a110130044.json";
import a110130048 from "./all_json/a110130048.json";
import a110130049 from "./all_json/a110130049.json";
import a110130055 from "./all_json/a110130055.json";
import a110130056 from "./all_json/a110130056.json";
import a110130057 from "./all_json/a110130057.json";
import a110130058 from "./all_json/a110130058.json";
import a110130062 from "./all_json/a110130062.json";
import a110130063 from "./all_json/a110130063.json";
import a109130009 from "./all_json/a109130009.json";
import a109130013 from "./all_json/a109130013.json";
import a109130015 from "./all_json/a109130015.json";
import a109130020 from "./all_json/a109130020.json";
import a109130035 from "./all_json/a109130035.json";
import a109130045 from "./all_json/a109130045.json";
import a109130049 from "./all_json/a109130049.json";
import a109130055 from "./all_json/a109130055.json";
import a109130068 from "./all_json/a109130068.json";
import a108130009 from "./all_json/a108130009.json";
import a108130056 from "./all_json/a108130056.json";
import a108130060 from "./all_json/a108130060.json";
import a108130063 from "./all_json/a108130063.json";
import a108130066 from "./all_json/a108130066.json";
import a108130202 from "./all_json/a108130202.json";
import a110130010 from "./all_json/a110130010.json";

// 轉換 JSON 檔案為符合 Designer 介面的格式
const transformDesignerData = (jsonData: any): Designer => {
  return {
    id: jsonData.id,
    name: {
      zh: jsonData.name.zh,
      pinyin: jsonData.name.pinyin,
    },
    image: jsonData.image,
    works: jsonData.works.map((work: any) => ({
      id: work.id,
      order: work.order,
      title: {
        main: work.title.main,
        sub: work.title.sub,
      },
      description: work.description,
      longDescription: work.longDescription,
      category: work.category as WorkCategory,
      images: {
        main: work.images.main,
        preview: work.images.preview,
        details: work.images.details,
      },
    })),
    social: jsonData.social,
  };
};

// 設計師資料庫
export const designers: Designer[] = [
  transformDesignerData(a110130001),
  transformDesignerData(a110130002),
  transformDesignerData(a110130003),
  transformDesignerData(a110130004),
  transformDesignerData(a110130006),
  transformDesignerData(a110130008),
  transformDesignerData(a110130011),
  transformDesignerData(a110130012),
  transformDesignerData(a110130013),
  transformDesignerData(a110130014),
  transformDesignerData(a110130015),
  transformDesignerData(a110130017),
  transformDesignerData(a110130018),
  transformDesignerData(a110130019),
  transformDesignerData(a110130021),
  transformDesignerData(a110130023),
  transformDesignerData(a110130027),
  transformDesignerData(a110130029),
  transformDesignerData(a110130030),
  transformDesignerData(a110130035),
  transformDesignerData(a110130041),
  transformDesignerData(a110130042),
  transformDesignerData(a110130043),
  transformDesignerData(a110130044),
  transformDesignerData(a110130048),
  transformDesignerData(a110130049),
  transformDesignerData(a110130055),
  transformDesignerData(a110130056),
  transformDesignerData(a110130057),
  transformDesignerData(a110130058),
  transformDesignerData(a110130062),
  transformDesignerData(a110130063),
  transformDesignerData(a109130009),
  transformDesignerData(a109130013),
  transformDesignerData(a109130015),
  transformDesignerData(a109130020),
  transformDesignerData(a109130035),
  transformDesignerData(a109130045),
  transformDesignerData(a109130049),
  transformDesignerData(a109130055),
  transformDesignerData(a109130068),
  transformDesignerData(a108130009),
  transformDesignerData(a108130056),
  transformDesignerData(a108130060),
  transformDesignerData(a108130063),
  transformDesignerData(a108130066),
  transformDesignerData(a108130202),
  transformDesignerData(a110130010),
];

// 輔助函數：根據 ID 獲取設計師資料
export function getDesignerById(id: string): Designer | undefined {
  return designers.find((designer) => designer.id === id);
}

// 輔助函數：根據作品 ID 獲取作品資料
export function getWorkById(workId: string): Work | undefined {
  for (const designer of designers) {
    const work = designer.works.find((w) => w.id === workId);
    if (work) return work;
  }
  return undefined;
}

// 輔助函數：根據作品 ID 獲取設計師資料
export function getDesignerByWorkId(workId: string): Designer | undefined {
  return designers.find((designer) =>
    designer.works.some((work) => work.id === workId)
  );
}

// 輔助函數：根據類別獲取所有作品
export function getWorksByCategory(category: WorkCategory): Work[] {
  return designers.flatMap((designer) =>
    designer.works.filter((work) => work.category === category)
  );
}

// 輔助函數：獲取所有作品
export function getAllWorks(): Work[] {
  return designers.flatMap((designer) => designer.works);
}

// 輔助函數：根據 slug 獲取設計師資料
export function getDesignerBySlug(slug: string): Designer | undefined {
  return designers.find((designer) => designer.id === slug);
}
