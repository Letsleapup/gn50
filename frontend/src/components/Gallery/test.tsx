// import { FunctionComponent, useEffect, useState } from "react";
// import "./WalkingGallery.css";
// import { SharedContent } from "../../@types/domain";
// import { useNavigate } from "react-router-dom";
// import { sharedContents } from "../../data/dummydata";

// interface Props {
//   // TODO: api 완성 후, optionable 해제
//   content?: SharedContent[];
//   robotUrl: string;
// }

// export const WalkingGallery: FunctionComponent<Props> = ({
//   // content,
//   robotUrl,
// }) => {
//   const data = sharedContents; //dummydata -> 추후 props로 받을 content로 데이터 처리
//   const [testData, setTestData] = useState(data.slice(0, 3));
//   // const [isShown, setIsShown] = useState(false);
//   const [rotation, setRotation] = useState(0);
//   const [scroll, setScroll] = useState(0);
//   const [endIndex, setEndIndex] = useState(3);
//   const navigate = useNavigate();

//   const handleData = (step: number) => {
//     const nextEndIndex = endIndex + step;
//     const nextStartIndex = Math.max(nextEndIndex - 3, 0);
//     setEndIndex(nextEndIndex);
//     setTestData(data.slice(nextStartIndex, nextEndIndex));
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       setScroll(scrollPosition);
//       if (scrollPosition >= 500 && scrollPosition <= 1000) {
//         setRotation((scrollPosition - 630) / 2); // 630에서 시작하는 각도 조정
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="relative w-full aspect-[1.28/1] overflow-hidden flex items-center justify-center">
//       {/* 로봇 이미지 */}
//       <img
//         src={robotUrl}
//         alt="Robot"
//         className={`${rotation * 5 > 800 ? "absolute top-[9.5%] right-[15%] w-[20%] robot" : "opacity-0"}`}
//       />

//       {/* 텍스트 */}
//       <span className="absolute top-[14.67%] left-[18.75%] text-[350%] 2xl:text-[300%] xl:text-[275%] lg:text-[180%] md:text-[120%] sm:text-[100%] xs:text-[50%] font-bold">
//         다른 사람들은 <br />
//         걷고 싶은 강남을 <br />
//         어떻게 만들었을까요?
//       </span>

//       {/* 컨트롤 */}
//       <div>
//         <div
//           className="control-arrow absolute bg-gradient-to-br from-blue-500 to-green-400 rounded-full md:"
//           onClick={() => navigate("/shared/walking")}
//         >
//           <span className="text-white 32px xl: 32px lg:16px sm:8px xs:3px">더보기</span>
//           <img
//             src="/asset/arrow_rb_sm.svg"
//             alt="화살표"
//             className={"w-[12.17%] filter invert"}
//           />
//         </div>

//         <div className="absolute navigation-buttons flex space-x-4">
//           <button
//             className={`swiper-button-prev-custom ${endIndex <= 3 ? "hidden" : ""}`}
//             onClick={() => handleData(-3)}
//             disabled={endIndex <= 3}
//           >
//             <img
//               src="/asset/arrow_lg_sm.svg"
//               className="w-[1%] h-[1%]"
//               alt="Previous"
//             />
//           </button>
//           <button
//             className={`swiper-button-next-custom ${endIndex >= data.length ? "hidden" : ""}`}
//             onClick={() => handleData(3)}
//             disabled={endIndex >= data.length}
//           >
//             <img src="/asset/arrow_rg_sm.svg" className="w-[1%] h-[1%]" alt="Next" />
//           </button>
//         </div>
//       </div>

//       {/* 이미지 요소 */}
//       <img
//         src="/asset/bg_img01.svg"
//         alt="별1"
//         className="absolute w-[5.5%] z-50 top-[4.4%] right-[4.4%]"
//       />
//       <img
//         src="/asset/bg_img02.svg"
//         alt="별2"
//         className="absolute w-[5.5%] z-50 bottom-[18.4%] left-[4.4%]"
//       />
//       <img
//         src="/asset/bg_line01.svg"
//         alt="half-circle"
//         className="absolute w-[12.7%] top-[13%] right-[-1%] z-50 transition-transform duration-500"
//         // style={{
//         //   transform: `rotate(${rotation + 180}deg) translateX(${scroll / 100}px)`,
//         // }}
//       />
//       <img
//         src="/asset/bg_line01-1.svg"
//         alt="half-circle"
//         className="absolute w-[12.7%] bottom-[-3.6%] left-[0%] z-50 transition-transform duration-500"
//         // style={{
//         //   transform: `rotate(${rotation - 100}deg) translateX(${scroll / 100}px)`,
//         // }}
//       />

//       {/* 아이템 그리드 */}

//       <div className="flex space-x-8">
//         {testData.map((item, index) => (
//           <div
//             key={item.id}
//             className={`aspect-[1/1] flex flex-col items-center ${
//               index === 0
//                 ? `shared-content1 absolute ${scroll > 500 ? "item-fade" : "opacity-0"}`
//                 : index === 1
//                   ? `shared-content2 absolute ${scroll > 900 ? "item-fade" : "opacity-0"}`
//                   : `shared-content3 absolute ${scroll > 1200 ? "item-fade" : "opacity-0"}`
//             }`}
//           >
//             <div
//               className="relative w-full h-full flex justify-center items-center group"
//               onClick={() => navigate(`/shared/walking/${item.id}`)}
//             >
//               <div className="absolute item-img">
//                 <img src={item.imgUrl} alt={item.title} />
//               </div>
//               {/* Hover 시에만 나타나는 그라데이션 배경 */}
//               <div className="hover-cover absolute inset-0 bg-gradient-to-br from-blue-500 to-green-400 opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>

//               {/* Hover 시에만 나타나는 아이콘 */}
//               <img
//                 src="/asset/arrow_rb_sm.svg"
//                 alt="arrow-rb"
//                 className="relative w-[11.5%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 filter invert"
//               />
//             </div>
//             <span className="item-title">{item.title}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };