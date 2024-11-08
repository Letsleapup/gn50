import { useNavigate } from "react-router-dom";
import { MainBannerUrl, RobotUrl, sharedContents } from "../../data/dummydata";
import Banner from "../../components/MainBanner/MainBanner";
import WebtoonGallery from "../../components/Gallery/WebtoonGallery";

// Swiper 필수 CSS
import "swiper/swiper-bundle.css";
import { WalkingGallery } from "../../components/Gallery/WalkingGallery";
import { useEffect, useState } from "react";
import axios from "axios";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [bannerUrl, setBannerUrl] = useState<string>();
  useEffect(() => {
    const getBannerUrlApi = async () =>
      await axios.get("http://mgn50.aixstudio.kr/api/api_main_banner.php");
    getBannerUrlApi()
      .then((res) =>
        setBannerUrl(`http://mgn50.aixstudio.kr/${res.data.banner1[0].url}`)
      )
      .catch((_rej) => setBannerUrl(MainBannerUrl));
  }, []);

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

  // webtoon 컨텐츠 필터링
  const webtoonContents = sharedContents
    .filter((content) => content.type === "webtoon")
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        {/* 배너 섹션 -롤링 스와이프 */}
        {bannerUrl && <Banner mainbannerUrl={bannerUrl} robotUrl={RobotUrl} />}
        {/* 버튼 섹션 */}
        <div className="w-full max-w-[1920px] mx-auto px-[4.5%] sm:px-[4%] md:px-[3.5%] lg:px-[3%]">
          <div className="flex h-[15rem] md:h-[20rem] gap-[2.25rem]">
            {actionButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => {
                  navigate(button.path);
                }}
                className={`flex flex-1 relative overflow-hidden rounded-[2.5rem] ${button.bgColor} `}
              >
                <div className="lg:ml-[5rem] ml-[1rem] z-10 mt-[3.5rem]">
                  <div className="flex flex-col items-start lg:text-[2.25rem] text-[1.5rem] tracking-[-0.05625rem] font-bold text-white whitespace-pre-line">
                    {button.title.split("\n").map((line, index) => (
                      <span key={index} className="whitespace-nowrap">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
                <img
                  src="/asset/arrow_up_r.svg"
                  alt="arrow_up"
                  className="absolute bottom-[5.6%] left-[11%] w-[2.25rem] h-[2.25rem] z-10"
                />

                <img
                  src={button.imgUrl}
                  alt="button"
                  className="absolute lg:top-[-33%] lg:w-[27.5625rem] lg:h-[27.5625rem] overflow-hidden md:right-[-0.01rem] md:top-[2.5rem] md:w-[20rem] md:h-[20rem] top-[7.5rem] right-[-2rem] w-0 h-0"
                />
              </button>
            ))}
          </div>
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
