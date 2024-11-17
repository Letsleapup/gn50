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
export interface SharedContent {
  id: number;
  title: string;
  imgUrl: string;
  type: BoardType;
  createdAt: string;
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

export interface SelectOption {
  id: string;
  title: string;
  imgUrl: string;
  style?: string;
  backdrop?: string;
  description?: string;
  modalsuggest?: string;
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
  modalsuggest?: string;
  viewCount: number;
  hashtags?: string[];
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
  modalStyle?: React.CSSProperties;
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
  imageUrl: string;
  title: string;
  scenario: string;
  contentId?: string;
  onEdit: (newScenario: string) => Promise<boolean>;
  onShare: () => Promise<boolean>;
  onRegenerate: () => void;
}
export interface GeneratedContentState {
  type: "webtoon" | "walking";
  imageUrl: string;
  title: string;
  scenario: string;
}
