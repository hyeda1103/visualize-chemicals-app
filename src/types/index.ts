export interface ChemicalData {
  index: number;
  distribution: string;
  usage: string;
  company: string;
  productName: string;
  에틸벤젠: string;
  운데칸: string;
  스티렌: string;
  노나날: string;
  클로로포름: string;
  데카날: string;
  트리클로로에틸렌: string;
  헥사클로로부타디엔: string;
  디클로로메탄: string;
  "1,2-디클로로에탄": string;
  벤젠: string;
  브로모디클로로메탄: string;
  톨루엔: "0.12";
  "1,4-디클로로벤젠": string;
  "(p-, m-, o-)자일렌": string;
  나프탈렌: string;
  헥산: string;
  "(1S)-(-)-알파-피넨": string;
  테트라클로로에틸렌: string;
  "(-)-베타-피넨": string;
  "2-프로판올": string;
  "2-에틸톨루엔": string;
  "2-부타논": string;
  "3-에틸톨루엔": string;
  에틸아세테이트: string;
  "4-에틸톨루엔": string;
  이소옥탄: string;
  "1,2,3-트리메틸벤젠": string;
  "4-메틸-2-펜타논": string;
  "1,2,4-트리메틸벤젠": string;
  옥탄: string;
  "1,3,5-트리메틸벤젠": string;
  "1,1,2-트리클로로에탄": string;
  "1,2-디클로로프로판": string;
  "1,3-디클로로프로판": string;
  사염화탄소: string;
  부틸아세테이트: string;
  "2,4-디메틸펜탄": string;
  클로로벤젠: string;
  "1,2,4,5-테트라메틸벤젠": string;
  노난: string;
  도데칸: string;
  쿠멘: string;
  트리데칸: string;
  프로필벤젠: string;
  테트라데칸: string;
  데칸: string;
  "n-펜타데칸": string;
  "sec-부틸벤젠": string;
  "n-헥사데칸": string;
  "(R)-(+)-리모넨": string;
  에탄올: string;
  "p-시멘": string;
  아세톤: string;
  "1,2,3-트리클로로벤젠": string;
  "1-프로판올": string;
  "n-부틸벤젠": string;
  헵탄: string;
  "1,2-디클로로벤젠": string;
  "1-부탄올": string;
};

export type KeyOfChemicalData = keyof ChemicalData;

export enum Usage {
  DISPOSABLE = '일회용',
  REUSABLE = '다회용'
}

export enum Distribution {
  DOMESTIC = '국내유통',
  OVERSEA = '해외직구'
}

export interface Option {
  value: string;
  label: string;
}

export interface StringObj {
  [index: string]: string | number;
};

export interface ResultPerProduct {
  chemicalName: string;
  target: string | number;
  mean: string;
  median: string;
  SD: string;
  min: string;
  max: string;
}

export interface ResultPerUsage {
  chemicalName: string,
  number: {
    disposable: number,
    reusable: number
  },
  percentage: {
    disposable: string,
    reusable: string,
  },
  mean: {
    disposable: string,
    reusable: string
  },
  median: {
    disposable: string,
    reusable: string
  },
  SD: {
    disposable: string,
    reusable: string
  },
  min: {
    disposable: string,
    reusable: string
  },
  max: {
    disposable: string,
    reusable: string
  },
};

export interface ResultPerDistribution {
  chemicalName: string,
  number: {
    domestic: number,
    oversea: number
  },
  percentage: {
    domestic: string,
    oversea: string,
  },
  mean: {
    domestic: string,
    oversea: string
  },
  median: {
    domestic: string,
    oversea: string
  },
  SD: {
    domestic: string,
    oversea: string
  },
  min: {
    domestic: string,
    oversea: string
  },
  max: {
    domestic: string,
    oversea: string
  },
};
