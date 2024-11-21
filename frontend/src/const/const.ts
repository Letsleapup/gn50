import { BannerContentType } from "../@types/domain";

//메인페이지
export const MainBannerUrl = "/asset/2x/main_img01@2x.png";
export const RobotUrl = "/asset/2x/card_chat_img01@2x.png";
export const MainBannerRobotUrl = "/asset/2x/main_chat_img01@2x.png";
export const BASE_URL = "https://gn50m.aixstudio.kr";// 배너 데이터

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
    title: "다른 사람들이 만든 걷고 싶은\n강남의 모습&웹툰을 확인할 수 있습니다.",
    description: "",
    bgColor: "bg-[#00BAA8]",
    robotUrl: "/asset/sub_img3.png",
    imgUrl: "",
  },
};

