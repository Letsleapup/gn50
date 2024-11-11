import { useNavigate } from "react-router-dom";
import {
  MainBannerRobotUrl,
  MainBannerUrl,
  RobotUrl,
  actionButtons,
  webtoonContents,
} from "../../data/dummydata";
import Banner from "../../components/MainBanner/MainBanner";
import WebtoonGallery from "../../components/Gallery/WebtoonGallery";
import { WalkingGallery } from "../../components/Gallery/WalkingGallery";
import { useState, useEffect } from "react";
import axios from "axios";
import { SharedContent } from "../../@types/domain";

// Swiper 필수 CSS
import "swiper/swiper-bundle.css";
import ButtonSection from "../../components/MainButton/ButtonSection";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [bannerUrl, setBannerUrl] = useState<string>();
  const [webtoonList, setWebtoonList] = useState<SharedContent[]>([]);

  //메인배너이미지 API호출
  useEffect(() => {
    const getBannerUrlApi = async () =>
      await axios.get("http://mgn50.aixstudio.kr/api/api_main_banner.php");
    getBannerUrlApi()
      .then((res) =>
        setBannerUrl(`http://mgn50.aixstudio.kr/${res.data.banner1[0].url}`)
      )
      .catch((_rej) => setBannerUrl(MainBannerUrl));
  }, []);

  //웹툰 컨텐츠 가져오기
  useEffect(() => {
    const fetchWebtoonContents = async () => {
      try {
        console.log("Fetching webtoon contents...");
        const response = await axios.get<SharedContent[]>("/api/webtoons");

        if (response.data?.length > 0) {
          console.log("Using API data, count:", response.data.length);
          setWebtoonList(response.data);
        } else {
          console.log(
            "Using dummy webtoon data, count:",
            webtoonContents.length
          );
          setWebtoonList(webtoonContents);
        }
      } catch (error) {
        console.error("API error, using dummy data:", error);
        setWebtoonList(webtoonContents);
      }
    };

    fetchWebtoonContents();
  }, []);

  return (
    <div className="min-h-screen w-min-360 w-max-1920 flex flex-col">
      <div>
        {/* 배너 섹션 -롤링 스와이프 */}
        <Banner mainbannerUrl={bannerUrl ? bannerUrl : MainBannerUrl} robotUrl={MainBannerRobotUrl} />

        {/* 버튼 섹션 */}
        <ButtonSection actionButtons={actionButtons} onButtonClick={navigate} />

        {/* 갤러리 섹션 */}

        <div>
          {/* Walking 갤러리 */}
          <WalkingGallery robotUrl={RobotUrl} />

          {/* Webtoon 갤러리 */}
          <WebtoonGallery
            title="웹툰 생성 체험"
            path="/shared/webtoon"
            contents={webtoonList}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
