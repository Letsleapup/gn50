import {
  SharedContent,
  BannerContentType,
  ActionButton,
} from "../@types/domain";

//메인페이지
export const MainBannerUrl = "/asset/2x/main_img01@2x.png";
export const RobotUrl = "/asset/2x/card_chat_img01@2x.png";
export const MainBannerRobotUrl = "/asset/2x/main_chat_img01@2x.png";

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
    imgUrl: "/asset/test/도산공원.webp",
    type: "walking",
    createdAt: "2024-03-15",
    scenario:
      "화창한 봄날에 안창호 선생님과 함께 도산공원을 걷는 모습을 그려보았습니다. 상상하신 모습을 바탕으로 Walkable City로 발전하는 강남구의 모습을 기대해 주세요.",
  },
  {
    id: 2,
    title: "한티근린공원",
    imgUrl: "/asset/test/한티근린공원.webp",
    type: "walking",
    createdAt: "2024-03-14",
    scenario:
      "한티근린공원의 울창한 숲길을 가족과 함께 산책하는 모습입니다. 도심 속 자연을 느끼며 건강한 생활을 즐기는 강남구 주민들의 일상을 담아보았습니다.",
  },
  {
    id: 3,
    title: "미래의 강남",
    imgUrl: "/asset/test/미래.webp",
    type: "webtoon",
    createdAt: "2024-03-13",
    scenario:
      "2040년 강남의 모습을 상상해보았습니다. 친환경 교통수단과 첨단 기술이 조화를 이루는 스마트 시티의 모습, 하늘을 가로지르는 UAM과 지하도로를 통해 더욱 효율적으로 변화할 미래 강남의 전경을 그려보았습니다.",
  },
  {
    id: 4,
    title: "현재의 강남",
    imgUrl: "/asset/webtoonimg4.png",
    type: "webtoon",
    createdAt: "2024-03-07",
    scenario:
      "강남의 낮과 밤을 대비하여 표현해보았습니다. 열정적인 비즈니스의 현장에서 화려한 문화생활까지, 24시간 살아숨쉬는 강남의 모습을 담았습니다.",
  },

  {
    id: 5,
    title: "선정릉",
    imgUrl: "/asset/test/선정릉.webp",
    type: "walking",
    createdAt: "2024-03-11",
    scenario:
      "조선시대의 역사가 숨쉬는 선정릉에서 현대적 감성을 더해 그려보았습니다. 도심 속 문화유산을 통해 과거와 현재가 공존하는 강남구의 독특한 정체성을 느낄 수 있습니다.",
  },
  {
    id: 6,
    title: "역삼공원",
    imgUrl: "/asset/test/역삼공원.webp",
    type: "walking",
    createdAt: "2024-03-10",
    scenario:
      "퇴근 후 직장인들이 역삼공원에서 여유를 즐기는 모습을 담았습니다. 바쁜 일상 속 작은 쉼터가 되어주는 도심 속 공원에서 휴식을 취하는 시민들의 모습을 표현해보았습니다.",
  },
  {
    id: 7,
    title: "현재의 강남",
    imgUrl: "/asset/test/현재.webp",
    type: "webtoon",
    createdAt: "2024-03-09",
    scenario:
      "활기 넘치는 현재 강남의 일상을 그려보았습니다. 첨단 오피스와 문화시설이 어우러진 거리, 다양한 사람들의 라이프스타일이 공존하는 강남의 현재를 웹툰으로 표현했습니다.",
  },
  {
    id: 8,
    title: "양재천 산책로",
    imgUrl: "/asset/test/양재천 산책로.webp",

    type: "walking",
    createdAt: "2024-03-08",
    scenario:
      "사계절 아름다운 양재천의 산책로를 걷는 시민들의 모습을 담아보았습니다. 도시와 자연이 조화롭게 어우러진 친환경 강남구의 모습을 느낄 수 있습니다.",
  },
  {
    id: 9,
    title: "과거의 강남",
    imgUrl: "https://via.placeholder.com/384",
    type: "webtoon",
    createdAt: "2024-03-12",
    scenario:
      "1970년대 강남 개발 초기의 모습을 담아보았습니다. 논밭이었던 땅이 도시로 변모해가는 과정, 그 시대를 살았던 사람들의 희망찬 발걸음을 웹툰으로 표현해보았습니다.",
  },
  {
    id: 10,
    title: "청담 공원",
    imgUrl: "https://via.placeholder.com/384",
    type: "walking",
    createdAt: "2024-03-06",
    scenario:
      "청담동의 세련된 거리와 공원이 조화를 이루는 모습을 표현해보았습니다. 트렌디한 문화와 자연이 어우러진 청담동만의 특별한 분위기를 담아냈습니다.",
  },
  {
    id: 11,
    title: "미래의 강남",
    imgUrl: "https://via.placeholder.com/384",
    type: "webtoon",
    createdAt: "2024-03-05",
    scenario:
      "2040년, 친환경 스마트시티로 진화한 강남의 모습입니다. 옥상 정원과 태양광 발전, 자율주행 차량이 일상이 된 미래 도시를 상상하여 그려보았습니다.",
  },
  {
    id: 12,
    title: "과거의 강남",
    imgUrl: "https://via.placeholder.com/384",
    type: "webtoon",
    createdAt: "2024-03-04",
    scenario:
      "1980년대 강남 개발이 한창이던 시기의 모습입니다. 아파트 단지가 들어서고 새로운 도시가 형성되어가는 과정에서 강남 발전의 역동적인 순간을 담아보았습니다.",
  },
];

// 배너 데이터
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

//loading welcome_message
export const starterMessage = [
  ["입력하신 내용을 저장하고 있어요"],
  ["저장한 내용을 분석중이에요"],
  ["분석한 내용을 기반으로 이미지를", "만들고 있어요"],
  ["보여드리기전에 고칠 부분이 있나", "분석중이에요"],
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
  modalsuggest?: string;
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
    imgUrl: "/asset/select-webtoon-img1.png",
    style: "gray",
    backdrop: "1960~1999",
    description:
      "1960~1990년대 강남은 급격한 발전을 통해 대한민국의 경제적 중심지로 떠올랐습니다.",
    modalsuggest:
      "과거의 강남은 어떤 모습이었을까요? 여러분이 알려주신 내용으로 과거의 강남을 4컷의 웹툰으로 보여드립니다.",
    hashtags: ["#retro", "#cartoon", "#blackandwhite"],
  },
  {
    id: "webtoon-2",
    title: "현재의 강남",
    imgUrl: "/asset/select-webtoon-img2.png",
    style: "modern",
    backdrop: "2000~2025",
    description:
      "현재 강남은 대한민국의 경제적 중심지를 넘어, 아시아의 경제적 상징이자 문화의 트렌드를 선도하는 도시입니다.",
    modalsuggest:
      "현재의 강남은 어떤 모습은 어떨까요? 여러분이 알려주신 내용으로 현재의 강남을 4컷의 웹툰으로 보여드립니다.",
    hashtags: ["#trendy", "#photorealistic", "#colorful"],
  },
  {
    id: "webtoon-3",
    title: "미래의 강남",
    imgUrl: "/asset/select-webtoon-img3.png",
    style: "colorfull, megacity",
    backdrop: "2026~2040",
    description:
      "앞으로의 강남은 전세계가 주목하는 Walkable & Workable & Smart Green City로 성장할 것입니다.",
    modalsuggest:
      "미래의 강남은 어떤 모습으로 발전했을까요? 여러분이 알려주신 내용으로 발전된 미래의 강남을 4컷의 웹툰으로 보여드립니다.",
    hashtags: ["#futuristic", "#illustration", "#neon"],
  },
];

export const walkingOptions: SelectOption[] = [
  {
    id: "walking-1",
    title: "도산공원",
    imgUrl: "/asset/thumb01.png",
    description:
      "도산 안창호 선생의 애국정신이 살아있는 역사적인 공원으로, 아름다운 산책로와 조경이 어우러진 도심 속 휴식공간",
  },
  {
    id: "walking-2",
    title: "양재 시민의 숲",
    imgUrl: "/asset/thumb02.png",
    description:
      "울창한 메타세쿼이아 숲길과 자연학습장이 있는 도심 속 자연휴양림",
  },
  {
    id: "walking-3",
    title: "양재천",
    imgUrl: "/asset/thumb03.png",
    description:
      "계절마다 다른 풍경을 자랑하는 산책로와 자전거도로가 잘 정비된 도심 속 생태하천",
  },
  {
    id: "walking-4",
    title: "선릉과 정릉",
    imgUrl: "/asset/thumb04.png",
    description:
      "조선시대 왕릉의 고즈넉함과 울창한 숲이 공존하는 UNESCO 세계문화유산",
  },
  {
    id: "walking-5",
    title: "대치유수지 생태공원",
    imgUrl: "/asset/thumb05.png",
    description:
      "도심 속 자연생태계를 그대로 보존한 습지공원으로, 다양한 식물과 조류를 관찰할 수 있는 생태학습장",
  },
  {
    id: "walking-6",
    title: "한티근린공원",
    imgUrl: "/asset/thumb06.png",
    description:
      "한티역 인근에 위치한 도심 속 녹지공원으로, 운동시설과 산책로가 잘 조성된 주민 휴식공간",
  },
  {
    id: "walking-7",
    title: "개포근린공원",
    imgUrl: "/asset/thumb07.png",
    description:
      "개포동의 중심에 자리 잡은 녹지공원으로, 운동시설과 산책로가 조화롭게 어우러진 주민 쉼터",
  },
  {
    id: "walking-8",
    title: "청담공원",
    imgUrl: "/asset/thumb08.png",
    description:
      "한강변에 위치한 현대적 감각의 공원으로, 예술적 조형물과 아름다운 조경이 돋보이는 휴식공간",
  },
  {
    id: "walking-9",
    title: "세곡동 문화공원",
    imgUrl: "/asset/thumb09.png",
    description:
      "문화시설과 녹지가 어우러진 복합문화공간으로, 다양한 문화행사와 여가활동이 가능한 주민 소통공간",
  },
  {
    id: "walking-10",
    title: "강남세곡체육공원",
    imgUrl: "/asset/thumb10.png",
    description:
      "다양한 체육시설과 산책로를 갖춘 복합체육공원으로, 건강한 여가생활을 즐길 수 있는 체육문화공간",
  },
  {
    id: "walking-11",
    title: "율현공원",
    imgUrl: "/asset/thumb11.png",
    description: "강남구의 율현공원입니다.",
  },
  {
    id: "walking-12",
    title: "대모산자연공원",
    imgUrl: "/asset/thumb12.png",
    description: "강남구의 대모산자연공원입니다.",
  },
  {
    id: "walking-13",
    title: "세곡지구근린공원",
    imgUrl: "/asset/thumb13.png",
    description: "강남구의 세곡지구근린공원입니다.",
  },
  {
    id: "walking-14",
    title: "수서중앙공원",
    imgUrl: "/asset/thumb14.png",
    description: "강남구의 수서중앙공원입니다.",
  },
  {
    id: "walking-15",
    title: "양재천근린공원",
    imgUrl: "/asset/thumb15.png",
    description: "강남구의 양재천근린공원입니다.",
  },
  {
    id: "walking-16",
    title: "삼성중앙공원",
    imgUrl: "/asset/thumb16.png",
    description: "강남구의 삼성중앙공원입니다.",
  },
  {
    id: "walking-17",
    title: "일원마을공원",
    imgUrl: "/asset/thumb17.png",
    description: "강남구의 일원마을공원입니다.",
  },
  {
    id: "walking-18",
    title: "일원배수지체육공원",
    imgUrl: "/asset/thumb18.png",
    description: "강남구의 일원배수지체육공원입니다.",
  },
  {
    id: "walking-19",
    title: "일원에코공원",
    imgUrl: "/asset/thumb19.png",
    description: "강남구의 일원에코공원입니다.",
  },
  {
    id: "walking-20",
    title: "도곡근린공원",
    imgUrl: "/asset/thumb20.png",
    description: "강남구의 도곡근린공원입니다.",
  },
  {
    id: "walking-21",
    title: "장군봉근린공원",
    imgUrl: "/asset/thumb21.png",
    description: "강남구의 장군봉근린공원입니다.",
  },
  {
    id: "walking-22",
    title: "탄천근린공원",
    imgUrl: "/asset/thumb22.png",
    description: "강남구의 탄천근린공원입니다.",
  },
  {
    id: "walking-23",
    title: "학동공원",
    imgUrl: "/asset/thumb23.png",
    description: "강남구의 학동공원입니다.",
  },
  {
    id: "walking-24",
    title: "압구정배수지공원",
    imgUrl: "/asset/thumb24.png",
    description: "강남구의 압구정배수지공원입니다.",
  },
  {
    id: "walking-25",
    title: "삼성에코공원",
    imgUrl: "/asset/thumb25.png",
    description: "강남구의 삼성에코공원입니다.",
  },
  {
    id: "walking-26",
    title: "역삼공원",
    imgUrl: "/asset/thumb26.png",
    description: "강남구의 역삼공원입니다.",
  },
  {
    id: "walking-27",
    title: "봉은공원",
    imgUrl: "/asset/thumb27.png",
    description: "강남구의 봉은공원입니다.",
  },
  {
    id: "walking-28",
    title: "구룡산 도시자연공원",
    imgUrl: "/asset/thumb28.png",
    description: "강남구의 구룡산 도시자연공원입니다.",
  },
  {
    id: "walking-29",
    title: "가로수길",
    imgUrl: "/asset/thumb29.png",
    description: "강남구의 가로수길입니다.",
  },
  {
    id: "walking-30",
    title: "신사공원",
    imgUrl: "/asset/thumb30.png",
    description: "강남구의 신사공원입니다.",
  },
];

export const selectOptions: SelectOptionsType = {
  walking: walkingOptions,
  webtoon: webtoonOptions,
};
