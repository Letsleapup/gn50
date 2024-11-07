import { useNavigate } from "react-router-dom";
import { MainBannerUrl, RobotUrl, sharedContents } from "../../data/dummydata";
import Banner from "../../components/MainBanner/MainBanner";
import WebtoonGallery from "../../components/Gallery/WebtoonGallery";
import "./MainPage.css";

// Swiper 필수 CSS
import "swiper/swiper-bundle.css";
import { WalkingGallery } from "../../components/Gallery/WalkingGallery";
import { useEffect, useState } from "react";
import axios from "axios";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [bannerUrl, setBannerUrl] = useState<string>()
  useEffect(() => {
    const getBannerUrlApi = async () => await axios.get("http://mgn50.aixstudio.kr/api/api_main_banner.php")
    getBannerUrlApi()
    .then(res =>  setBannerUrl(`http://mgn50.aixstudio.kr/${res.data.banner1[0].url}`))
    .catch(_rej => setBannerUrl(MainBannerUrl) )
  },[])

  // 버튼 섹션 데이터
  const actionButtons = [
    {
      id: 1,
      title: "나만의 걷고 싶은 강남이미지\n상상더하기 체험",
      path: "/select/walking",
      bgColor: "bg-[#2942C4] hover:bg-gray-400",
      imgUrl: "/asset/main_btn_img01.svg",
    },
    {
      id: 2,
      title: "강남의 과거·현재·미래\n웹툰 생성 체험",
      path: "/select/webtoon",
      bgColor: "bg-[#F79D00] hover:bg-gray-400",
      imgUrl: "/asset/main_btn_img02.svg",
    },
  ];

  // walking 컨텐츠 필터링
  //TODO: 해당 데이터를 받아서 보일 수 있게 gallery 꾸미기
  // const walkingContents = sharedContents
  //   .filter((content) => content.type === "walking")
  //   .slice(0, 3);

  // webtoon 컨텐츠 필터링
  const webtoonContents = sharedContents
    .filter((content) => content.type === "webtoon")
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        {/* 배너 섹션 -롤링 스와이프 */}
        {bannerUrl &&<Banner mainbannerUrl={bannerUrl} robotUrl={RobotUrl} /> } 
        {/* 버튼 섹션 */}
        <div className="flex h-[20rem] gap-[2.25rem] lg:mx-[3.75rem]">
          {actionButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => {
                navigate(button.path);
              }}
              className={`flex flex-1 items-center justify-between relative overflow-hidden rounded-[2.5rem] ${button.bgColor} `}
            >
              <div className="flex flex-col items-start gap-[4.25rem] lg:ml-[5rem] ml-[1rem] z-10">
                <div className="flex flex-col items-start lg:text-[2.25rem] text-[2rem] tracking-[-0.05625rem] font-bold text-white whitespace-pre-line">
                  {button.title.split("\n").map((line, index) => (
                    <span key={index} className="whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </div>
                <img
                  src="/asset/arrow_up_r.svg"
                  alt="arrow_up"
                  className="w-[2.25rem] h-[2.25rem]"
                />
              </div>
              <img
                src={button.imgUrl}
                alt="button"
                className="absolute lg:right-[-0.01rem] lg:top-[-3.7rem] lg:w-[27.5625rem] lg:h-[27.5625rem] overflow-hidden top-[7.5rem] right-[-2rem] w-[15rem] h-[15rem]"
              />
            </button>
          ))}
        </div>

        {/* 갤러리 섹션 */}

        <div>
          {/* Walking 갤러리 */}
          <WalkingGallery robotUrl={RobotUrl} />

          {/* Webtoon 갤러리 */}
          <WebtoonGallery
            title="웹툰 생성 체험"
            path="/shared/webtoon"
            contents={webtoonContents}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
