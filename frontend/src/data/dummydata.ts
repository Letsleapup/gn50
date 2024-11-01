import { SharedContent } from "../@types/domain";

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

//loading welcome_message
export const starterMessage = [
  "입력하신 내용을 저장하고 있어요",
  "저장한 내용을 분석중이에요",
  "분석한 내용을 기반으로 이미지를 만들고 있어요",
  "보여드리기전에 고칠 부분이 있나 분석중이에요",
];

export const BannerUrl = "/gn50/asset/main_img01@2x.png";
export const RobotUrl = "/gn50/asset/main_chat_img01@2x.png";

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

const generateWalkingOptions = (count: number): SelectOption[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `walking-${index + 1}`,
    title: `공원 ${index + 1}`,
    imgUrl: `https://picsum.photos/id/${100 + index}/500/100`,
    style: "",
    backdrop: "",
    description: `강남구의 공원 ${index + 1}.`,
  }));
};
export const selectOptions: SelectOptionsType = {
  walking: generateWalkingOptions(30),
  webtoon: [
    {
      id: "1",
      title: "과거의 강남",
      imgUrl: "https://picsum.photos/id/124/500/100",
      style: "gray",
      backdrop: "1960s~1995s",
      description: "과거의 강남은 어떤 모습이었을까요?",
    },
    {
      id: "2",
      title: "현재의 강남",
      imgUrl: "https://picsum.photos/id/125/500/100",
      style: "modern",
      backdrop: "1996s~2025s",
      description: "현재의 강남은 어떤 모습이 매력적이나요?",
    },
    {
      id: "3",
      title: "미래의 강남",
      imgUrl: "https://picsum.photos/id/126/500/100",
      style: "colorfull, megacity, ",
      backdrop: "2025s~2040s",
      description: "미래의 강남은 어떤 모습으로 발전했을까요?",
    },
  ],
};
