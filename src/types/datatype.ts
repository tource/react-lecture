// arr 데이터 기본형
export interface IArr {
  name: string;
  link: string;
}
[];

export interface IFromUrl {
  memo: string;
  good: string;
  favorite: string;
}

export interface IQueryData {
  name?: string;
  age?: string;
}

export interface IActiveLink {
  color: string;
  fontWeight: string;
}

// 라인 차트 데이터 모양
interface DataPoint {
  x: string;
  y: number;
}
export interface Series {
  id: string;
  color: string;
  data: DataPoint[];
}
