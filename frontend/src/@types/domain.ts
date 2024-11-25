import { ReactNode } from "react";

// @types/domain.ts
export type BoardType = "walking" | "webtoon" | "gallery";

export interface ActionButton {
  id: number;
  title: string[];
  path: string;
  bgColor: string;
  imgUrl: string;
}

//갤러리 공유페이지 API관련
export interface GalleryData {
  idx: number | string;
  title: string;
  url: string;
}

export interface SharedContent {
  id: number;
  title: string;
  imgUrl: string;
  type: BoardType;
  createdAt?: string;
  scenario?: string;
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

// export interface SelectOption {
//   id: string;
//   title: string;
//   imgUrl: string;
//   style?: string;
//   backdrop?: string;
//   description?: string;
//   modalsuggest?: string;
//   viewCount: number;
//   hashtags?: string[];
// }

export interface SelectOptionsType {
  walking: SelectOption[];
  webtoon: SelectOption[];
}

export type Nullable<T> = null | T;

export interface ModalProps {
  isOpen: boolean;
  type: "walking" | "webtoon" | "edit" | "share" | "regenerate";
  btnName: string;
  btnImgUrl?: string;
  btnCancleName: string;
  onClose: () => void;
  onClick?: () => void;
  children?: ReactNode;
}

export const ICON_URLS = {
  PEN: "/asset/ic_pen.svg",
  SEND: "/asset/ic_send.svg",
  UPLOAD: "/asset/ic_upload.svg",
  MENU: "/asset/ic_menu.svg",
  EDIT: "/asset/ic_edit.svg",
} as const;

export interface ContentDisplayProps {
  type: BoardType;
  imgUrl: string;
  title: string;
  scenario: string;
  contentId?: string;
  onEdit: (newScenario: string, idx:string) => Promise<boolean>;
  onShare: () => Promise<boolean>;
  onRegenerate: () => void;
}
export interface GeneratedContentState {
  type: "webtoon" | "walking";
  imgUrl: string;
  title: string;
  scenario: string;
  idx?: number | string;
}

export interface CommonResponse<T> {
  resultCode: "Y" | "N";
  cnt: Nullable<number>;
  data: T[] | T;
}

//mainpage api

export interface BannerData {
  idx: string | number;
  url: string;
}

export interface BannerResponse extends CommonResponse<BannerData> {
  data: BannerData;
}

export type GalleryResponse = CommonResponse<GalleryData>;

export interface SelectOption extends Option {
  backinfo_year?: string;
  backinfo_guide_txt?: string; //모달 웹툰 가이드
  backinfo_title?: string;
  backinfo_intro_txt?: string;
  backinfo_hashtag?: string;
  backinfo_file1?: string; // 이미지 파일 경로
  park_main_txt?: string;
  modalsuggest?: string;
  viewCount?: number;
}

export interface Option {
  idx: number;
  title: string;
  url: string;
}
//selectpage api
export type SelectOptionsResponse = CommonResponse<SelectOption>;
