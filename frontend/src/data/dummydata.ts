import { SharedContent, BannerContentType } from "../@types/domain";

export const sharedContents: SharedContent[] = [
  {
    id: 1,
    title: "도산공원",
    imgUrl: "https://picsum.photos/200",
    type: "walking",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    title: "한티근린공원",
    imgUrl: "https://picsum.photos/200",
    type: "walking",
    createdAt: "2024-03-14",
  },
  {
    id: 3,
    title: "미래의 강남",
    imgUrl: "https://picsum.photos/200",
    type: "webtoon",
    createdAt: "2024-03-13",
  },
  {
    id: 4,
    title: "과거의 강남",
    imgUrl: "https://picsum.photos/200",
    type: "webtoon",
    createdAt: "2024-03-12",
  },
  {
    id: 5,
    title: "선정릉",
    imgUrl: "https://picsum.photos/200",
    type: "walking",
    createdAt: "2024-03-11",
  },
  {
    id: 6,
    title: "역삼공원",
    imgUrl: "https://picsum.photos/200",
    type: "walking",
    createdAt: "2024-03-10",
  },
  {
    id: 7,
    title: "현재의 강남",
    imgUrl: "./asset/webtoonimg3.png",
    type: "webtoon",
    createdAt: "2024-03-09",
  },
  {
    id: 8,
    title: "청담 공원",
    imgUrl: "https://picsum.photos/200",
    type: "walking",
    createdAt: "2024-03-08",
  },
  {
    id: 9,
    title: "현재의 강남",
    imgUrl: "./asset/webtoonimg2.png",
    type: "webtoon",
    createdAt: "2024-03-07",
  },
  {
    id: 10,
    title: "양재천 산책로",
    imgUrl: "https://picsum.photos/200",
    type: "walking",
    createdAt: "2024-03-06",
  },
  {
    id: 11,
    title: "미래의 강남",
    imgUrl: "./asset/webtoonimg1.png",
    type: "webtoon",
    createdAt: "2024-03-05",
  },
  {
    id: 12,
    title: "과거의 강남",
    imgUrl: "./asset/webtoonimg4.png",
    type: "webtoon",
    createdAt: "2024-03-04",
  },
];

// 배너 데이터
export const bannerContent: BannerContentType = {
  walking: {
    title: "내가 걷고 싶은 강남의\n모습을 만들어 보세요!",
    description: "걷고 싶은 강남구의 장소를 선택하세요.",
    bgColor: "bg-[#2942C4]",
    imgUrl: "./asset/main_btn_img01.svg",
  },
  webtoon: {
    title: "강남의 과거·현재·미래를\n웹툰으로 그려 보세요!",
    description: "그리고 싶은 웹툰의 배경을 선택하세요.",
    bgColor: "bg-[#F79D00]",
    imgUrl: "./asset/main_btn_img02.svg",
  },
  gallery: {
    title: "다른 사람들이 만든\n작품을 구경해보세요!",
    description: "AI 컨텐츠 공모전!",
    bgColor: "bg-[#00BAA8]",
    imgUrl: "",
  },
};

//loading welcome_message
export const starterMessage = [
  "입력하신 내용을 저장하고 있어요",
  "저장한 내용을 분석중이에요",
  "분석한 내용을 기반으로 이미지를 만들고 있어요",
  "보여드리기전에 고칠 부분이 있나 분석중이에요",
];

export const MainBannerUrl = "/asset/main_img01@2x.png";
export const RobotUrl = "/asset/main_chat_img01@2x.png";

// SelectPage Dummy
export type SelectOption = {
  id: string;
  title: string;
  imgUrl: string;
  style?: string;
  backdrop?: string;
  description?: string;
};

export type SelectOptionsType = {
  walking: SelectOption[];
  webtoon: SelectOption[];
};

const gangnamParks = [
  "도산공원",
  "양재 시민의 숲",
  "대치유수지 생태공원",
  "선릉과 정릉",
  "양재천",
  "한티근린공원",
  "개포근린공원",
  "청담공원",
  "세곡동 문화공원",
  "강남세곡체육공원",
  "율현공원",
  "대모산자연공원",
  "세곡지구근린공원",
  "수서중앙공원",
  "양재천근린공원",
  "삼성중앙공원",
  "일원마을공원",
  "일원배수지체육공원",
  "일원에코공원",
  "도곡근린공원",
  "장군봉근린공원",
  "탄천근린공원",
  "학동공원",
  "압구정배수지공원",
  "삼성에코공원",
  "역삼공원",
  "봉은공원",
  "구룡산 도시자연공원",
  "가로수길",
  "신사공원",
];

// 웹툰 관련 질문 리스트
export const webtoonQuestions = [
  "웹툰의 장르를 알려주세요(예: 일상, 액션, 로맨스 등)",
  "웹툰의 주인공은 누구인가요?",
  "주인공은 어떤 행동을 하고 있나요?",
  "다른 알아야 할 점이 있나요?",
];

// 걷기 관련 질문 리스트
export const walkingQuestions = [
  "어떤 계절에 걷고 싶으신가요?",
  "걸을 때의 날씨는 어떤가요?",
  "누구와 함께 걷고 싶으세요?",
  "걸을 때의 기분을 알려주세요",
  "다른 알아야 할 점이 있나요?",
];

const generateWalkingOptions = (count: number): SelectOption[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `walking-${index + 1}`,
    title: `${gangnamParks[index]}`,
    imgUrl: `https://picsum.photos/id/${20 + index}/500/100`,
    style: "",
    backdrop: "",
    description: `강남구의 ${gangnamParks[index]}.`,
  }));
};
export const selectOptions: SelectOptionsType = {
  walking: generateWalkingOptions(30),
  webtoon: [
    {
      id: "1",
      title: "과거의 강남",
      imgUrl: "./1960sGN(from_gpt).webp",
      style: "gray",
      backdrop: "1960s~1995s",
      description: "과거의 강남은 어떤 모습이었을까요?",
    },
    {
      id: "2",
      title: "현재의 강남",
      imgUrl: "./2025sGN(from_gpt).webp",
      style: "modern",
      backdrop: "1996s~2025s",
      description: "현재의 강남은 어떤 모습이 매력적이나요?",
    },
    {
      id: "3",
      title: "미래의 강남",
      imgUrl: "./2040sGN(from_gpt).webp",
      style: "colorfull, megacity, ",
      backdrop: "2025s~2040s",
      description: "미래의 강남은 어떤 모습으로 발전했을까요?",
    },
  ],
};
