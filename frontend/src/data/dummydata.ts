import {
  SharedContent,
  BannerContentType,
  ActionButton,
} from "../@types/domain";

//메인페이지

export const MainBannerUrl = "/asset/2x/main_img01@2x.png";
export const RobotUrl = "/asset/2x/card_chat_img01@2x.png";

// 버튼 섹션 데이터
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

//갤러리 shareboardpage를 위한 더미
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
    robotUrl: "./asset/sub_chat1.png",
    imgUrl: "./asset/sub_img1.svg",
  },
  webtoon: {
    title: "강남의 과거·현재·미래를\n웹툰으로 그려 보세요!",
    description: "그리고 싶은 웹툰의 배경을 선택하세요.",
    bgColor: "bg-[#F79D00]",
    robotUrl: "./asset/sub_chat2.png",
    imgUrl: "/asset/sub_img2.svg",
  },
  gallery: {
    title:
      "다른 사람들이 만든 걷고 싶은\n강남의 모습&웹툰을 확인할 수 있습니다.",
    description: "",
    bgColor: "bg-[#00BAA8]",
    robotUrl: "",
    imgUrl: "/asset/sub_img3.png",
  },
};

//loading welcome_message
export const starterMessage = [
  "입력하신 내용을 저장하고 있어요",
  "저장한 내용을 분석중이에요",
  "분석한 내용을 기반으로 이미지를 만들고 있어요",
  "보여드리기전에 고칠 부분이 있나 분석중이에요",
];

// 웹툰과 워킹 데이터 분리
export const walkingContents: SharedContent[] = sharedContents.filter(
  (content) => content.type === "walking"
);

export const webtoonContents: SharedContent[] = sharedContents.filter(
  (content) => content.type === "webtoon"
);

// SelectPage Dummy
export type SelectOption = {
  id: string;
  title: string;
  imgUrl: string;
  style?: string;
  backdrop?: string;
  description?: string;
  hashtags?: string[];
};

export interface SelectOptionsType {
  walking: SelectOption[];
  webtoon: SelectOption[];
}

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

export const webtoonOptions: SelectOption[] = [
  {
    id: "webtoon-1",
    title: "과거의 강남",
    imgUrl: "./asset/thumb11.png",
    style: "gray",
    backdrop: "1960~1999",
    description:
      "1960~1990년대 강남은 급격한 발전을 통해 대한민국의 경제적 중심지로 떠올랐습니다.",
    hashtags: ["#retro", "#cartoon", "#blackandwhite"],
  },
  {
    id: "webtoon-2",
    title: "현재의 강남",
    imgUrl: "./asset/thumb12.png",
    style: "modern",
    backdrop: "2000~2025",
    description:
      "현재 강남은 대한민국의 경제적 중심지를 넘어,아시아의 경제적 상징이자 문화의 트렌드를 선도하는 도시입니다.",
    hashtags: ["#trendy", "#photorealistic", "#colorful"],
  },
  {
    id: "webtoon-3",
    title: "미래의 강남",
    imgUrl: "./asset/thumb13.png",
    style: "colorfull, megacity",
    backdrop: "2025~2040",
    description:
      "앞으로의 강남은 전세계가 주목하는 Walkable & Workable & Smart Green City로 성장할 것입니다.",
    hashtags: ["#futuristic", "#illustration", "#neon"],
  },
];

export const walkingOptions: SelectOption[] = [
  {
    id: "walking-1",
    title: "도산공원",
    imgUrl: "./asset/thumb01.png",
    description: "강남구의 도산공원입니다.",
  },
  {
    id: "walking-2",
    title: "양재 시민의 숲",
    imgUrl: "./asset/thumb02.png",
    description: "강남구의 양재 시민의 숲입니다.",
  },
  {
    id: "walking-3",
    title: "대치유수지 생태공원",
    imgUrl: "./asset/thumb03.png",
    description: "강남구의 대치유수지 생태공원입니다.",
  },
  {
    id: "walking-4",
    title: "선릉과 정릉",
    imgUrl: "./asset/thumb04.png",
    description: "강남구의 선릉과 정릉입니다.",
  },
  {
    id: "walking-5",
    title: "양재천",
    imgUrl: "./asset/thumb05.png",
    description: "강남구의 양재천입니다.",
  },
  {
    id: "walking-6",
    title: "한티근린공원",
    imgUrl: "./asset/thumb06.png",
    description: "강남구의 한티근린공원입니다.",
  },
  {
    id: "walking-7",
    title: "개포근린공원",
    imgUrl: "./asset/thumb07.png",
    description: "강남구의 개포근린공원입니다.",
  },
  {
    id: "walking-8",
    title: "청담공원",
    imgUrl: "./asset/thumb08.png",
    description: "강남구의 청담공원입니다.",
  },
  {
    id: "walking-9",
    title: "세곡동 문화공원",
    imgUrl: "./asset/thumb09.png",
    description: "강남구의 세곡동 문화공원입니다.",
  },
  {
    id: "walking-10",
    title: "강남세곡체육공원",
    imgUrl: "./asset/thumb10.png",
    description: "강남구의 강남세곡체육공원입니다.",
  },
  {
    id: "walking-11",
    title: "율현공원",
    imgUrl: "./asset/thumb11.png",
    description: "강남구의 율현공원입니다.",
  },
  {
    id: "walking-12",
    title: "대모산자연공원",
    imgUrl: "./asset/thumb12.png",
    description: "강남구의 대모산자연공원입니다.",
  },
  {
    id: "walking-13",
    title: "세곡지구근린공원",
    imgUrl: "./asset/thumb13.png",
    description: "강남구의 세곡지구근린공원입니다.",
  },
  {
    id: "walking-14",
    title: "수서중앙공원",
    imgUrl: "./asset/thumb14.png",
    description: "강남구의 수서중앙공원입니다.",
  },
  {
    id: "walking-15",
    title: "양재천근린공원",
    imgUrl: "./asset/thumb15.png",
    description: "강남구의 양재천근린공원입니다.",
  },
  {
    id: "walking-16",
    title: "삼성중앙공원",
    imgUrl: "./asset/thumb16.png",
    description: "강남구의 삼성중앙공원입니다.",
  },
  {
    id: "walking-17",
    title: "일원마을공원",
    imgUrl: "./asset/thumb17.png",
    description: "강남구의 일원마을공원입니다.",
  },
  {
    id: "walking-18",
    title: "일원배수지체육공원",
    imgUrl: "./asset/thumb18.png",
    description: "강남구의 일원배수지체육공원입니다.",
  },
  {
    id: "walking-19",
    title: "일원에코공원",
    imgUrl: "./asset/thumb19.png",
    description: "강남구의 일원에코공원입니다.",
  },
  {
    id: "walking-20",
    title: "도곡근린공원",
    imgUrl: "./asset/thumb20.png",
    description: "강남구의 도곡근린공원입니다.",
  },
  {
    id: "walking-21",
    title: "장군봉근린공원",
    imgUrl: "./asset/thumb21.png",
    description: "강남구의 장군봉근린공원입니다.",
  },
  {
    id: "walking-22",
    title: "탄천근린공원",
    imgUrl: "./asset/thumb22.png",
    description: "강남구의 탄천근린공원입니다.",
  },
  {
    id: "walking-23",
    title: "학동공원",
    imgUrl: "./asset/thumb23.png",
    description: "강남구의 학동공원입니다.",
  },
  {
    id: "walking-24",
    title: "압구정배수지공원",
    imgUrl: "./asset/thumb24.png",
    description: "강남구의 압구정배수지공원입니다.",
  },
  {
    id: "walking-25",
    title: "삼성에코공원",
    imgUrl: "./asset/thumb25.png",
    description: "강남구의 삼성에코공원입니다.",
  },
  {
    id: "walking-26",
    title: "역삼공원",
    imgUrl: "./asset/thumb26.png",
    description: "강남구의 역삼공원입니다.",
  },
  {
    id: "walking-27",
    title: "봉은공원",
    imgUrl: "./asset/thumb27.png",
    description: "강남구의 봉은공원입니다.",
  },
  {
    id: "walking-28",
    title: "구룡산 도시자연공원",
    imgUrl: "./asset/thumb28.png",
    description: "강남구의 구룡산 도시자연공원입니다.",
  },
  {
    id: "walking-29",
    title: "가로수길",
    imgUrl: "./asset/thumb29.png",
    description: "강남구의 가로수길입니다.",
  },
  {
    id: "walking-30",
    title: "신사공원",
    imgUrl: "./asset/thumb30.png",
    description: "강남구의 신사공원입니다.",
  },
];

export const selectOptions: SelectOptionsType = {
  walking: walkingOptions,
  webtoon: webtoonOptions,
};
