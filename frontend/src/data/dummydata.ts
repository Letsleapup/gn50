export type SharedContent = {
  id: number;
  title: string;
  imgUrl: string;
  type: "walking" | "webtoon";
  createdAt: string;
};

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
    imgUrl: "https://picsum.photos/200",
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
    imgUrl: "https://picsum.photos/200",
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
    imgUrl: "https://picsum.photos/200",
    type: "webtoon",
    createdAt: "2024-03-05",
  },
  {
    id: 12,
    title: "과거의 강남",
    imgUrl: "https://picsum.photos/200",
    type: "webtoon",
    createdAt: "2024-03-04",
  },
];