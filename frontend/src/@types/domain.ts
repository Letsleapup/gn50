// @types/domain.ts
export type BoardType = "walking" | "webtoon" | "gallery";

export interface ActionButton {
  id: number;
  title: string[];
  path: string;
  bgColor: string;
  imgUrl: string;
}
export interface SharedContent {
  id: number;
  title: string;
  imgUrl: string;
  type: BoardType;
  createdAt: string;
}

export interface BannerContent {
  title: string;
  description: string;
  bgColor: string;
  robotUrl: string;
  imgUrl: string;
}

export interface BannerContentType {
  walking: BannerContent;
  webtoon: BannerContent;
  gallery: BannerContent;
}

export interface SelectOption {
  id: string;
  title: string;
  imgUrl: string;
  style?: string;
  backdrop?: string;
  description?: string;
  viewCount: number;
  hashtags?: string[];
}

export interface SelectOptionsType {
  walking: SelectOption[];
  webtoon: SelectOption[];
}

export interface Option {
  id: string;
  title: string;
  imgUrl: string;
  backdrop?: string;
  description?: string;
  viewCount: number;
  hashtags?: string[];
}

export type Nullable<T> = null | T;
