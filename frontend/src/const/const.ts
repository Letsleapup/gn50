import { ActionButton, BannerContentType } from "../@types/domain";

//메인페이지
export const MainBannerUrl = "/asset/2x/main_img01@2x.png";
export const RobotUrl = "/asset/2x/card_chat_img01@2x.png";
export const MainBannerRobotUrl = "/asset/2x/main_chat_img01@2x.png";
export const BASE_URL = "https://gn50m.aixstudio.kr"; // 배너 데이터

export const bannerContent: BannerContentType = {
  walking: {
    title: "내가 걷고 싶은 강남의\n모습을 만들어 보세요!",
    description: "걷고 싶은 강남구의 장소를 선택하세요.",
    bgColor: "bg-[#2942C4]",
    robotUrl: "/asset/sub_chat1.png",
    imgUrl: "/asset/sub_img1.svg",
  },
  webtoon: {
    title: "강남의 과거·현재·미래를\n웹툰으로 그려 보세요!",
    description: "그리고 싶은 웹툰의 배경을 선택하세요.",
    bgColor: "bg-[#F79D00]",
    robotUrl: "/asset/sub_chat2.png",
    imgUrl: "/asset/sub_img2.svg",
  },
  gallery: {
    title:
      "다른 사람들이 만든 걷고 싶은\n강남의 모습&웹툰을 확인할 수 있습니다.",
    description: "",
    bgColor: "bg-[#00BAA8]",
    robotUrl: "/asset/sub_img3.png",
    imgUrl: "",
  },
};

export const API_URLS = {
  walking: {
    result: "/api/api_img_ai3.php",
    edit: "/api/api_sp_edit_senario.php",
    complete: "/api/api_sp_complete.php",
    gallery: "/api/api_sp_gallery_list.php",
  },
  webtoon: {
    result: "/api/api_img_ai2.php",
    edit: "/api/api_wm_edit_senario.php",
    complete: "/api/api_wm_complete.php",
    gallery: "/api/api_wm_gallery_list.php",
  },
};

export const actionButtons: ActionButton[] = [
  {
    id: 1,
    title: ["나만의 걷고 싶은 강남이미지", "상상더하기 체험"],
    path: "/select/walking",
    bgColor: "bg-[#2942C4]",
    imgUrl: "/asset/main_btn_img01.svg",
  },
  {
    id: 2,
    title: ["강남의 과거·현재·미래", "웹툰 생성 체험"],
    path: "/select/webtoon",
    bgColor: "bg-[#F79D00]",
    imgUrl: "/asset/main_btn_img02.svg",
  },
];
export const ICON_URLS = {
  PEN: "/asset/ic_pen.svg",
  SEND: "/asset/ic_send.svg",
  UPLOAD: "/asset/ic_upload.svg",
  MENU: "/asset/ic_menu.svg",
  EDIT: "/asset/ic_edit.svg",
};
