import { useNavigate } from "react-router-dom";
import {
  MainBannerRobotUrl,
  MainBannerUrl,
  RobotUrl,
  BASE_URL,
  actionButtons,
} from "../../const/const";
import Banner from "../../components/MainBanner/MainBanner";
import WebtoonGallery from "../../components/Gallery/WebtoonGallery";
import { WalkingGallery } from "../../components/Gallery/WalkingGallery";
import { useState, useEffect } from "react";
import { GalleryData } from "../../@types/domain";

// Swiper 필수 CSS
import "swiper/swiper-bundle.css";
import ButtonSection from "../../components/MainButton/ButtonSection";
import {
  getBannerUrlApi,
  getGalleryInMainPageApi,
} from "../../api/mainPage_api";
import { toArray } from "../../util/toArray";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [bannerUrl, setBannerUrl] = useState<string>();
  const [webtoonGalleryList, setWebtoonGalleryList] = useState<GalleryData[]>(
    []
  );
  const [walkingGalleryList, setWalkingGalleryList] = useState<GalleryData[]>(
    []
  );

  //메인배너이미지 API호출
  useEffect(() => {
    let isSubscribed = true;

    getBannerUrlApi()
      .then((res) => {
        if (isSubscribed) {
          setBannerUrl(res);
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setBannerUrl(MainBannerUrl);
        }
      });

    getGalleryInMainPageApi(`${BASE_URL}/api/api_mid_banner.php`)
      .then((res) => {
        if (isSubscribed) {
          setWalkingGalleryList(toArray(res));
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setWalkingGalleryList([]);
        }
      });

    getGalleryInMainPageApi(`${BASE_URL}/api/api_bottom_banner.php`)
      .then((res) => {
        if (isSubscribed) {
          setWebtoonGalleryList(toArray(res));
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setWebtoonGalleryList([]);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <div className="min-h-screen w-min-360 w-max-1920 flex flex-col">
      <div>
        {/* 배너 섹션 -롤링 스와이프 */}
        <Banner
          mainbannerUrl={bannerUrl ? MainBannerUrl : bannerUrl}
          robotUrl={MainBannerRobotUrl}
        />

        {/* 버튼 섹션 */}
        <ButtonSection actionButtons={actionButtons} onButtonClick={navigate} />

        {/* 갤러리 섹션 */}

        <div>
          {/* Walking 갤러리 */}
          <WalkingGallery robotUrl={RobotUrl} content={walkingGalleryList} />

          {/* Webtoon 갤러리 */}
          <WebtoonGallery
            title="웹툰 생성 체험"
            path="/shared/webtoon"
            contents={webtoonGalleryList}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
