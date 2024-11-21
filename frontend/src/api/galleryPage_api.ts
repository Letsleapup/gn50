import axios from "axios";
import { logger } from "../util/logger";
import { GalleryData, SharedContent } from "../@types/domain";
import { BASE_URL } from "../const/const";

interface GalleryResponse {
  resultCode: "Y" | "N";
  cnt: number | null;
  data: GalleryData[];
}

interface ViewCountResponse {
  resultCode: "Y" | "N";
  idx: number | string;
  cnt: number;
}

// 갤러리 상세 조회 응답 데이터 타입
interface GalleryDetailData {
  idx: number | string;
  image_title: string;
  image_file: string;
  image_analysis_txt: string;
}

// API 응답 타입
interface GalleryDetailResponse {
  resultCode: "Y" | "N";
  cnt: number | null;
  data: GalleryDetailData[];
}
// 걷기 갤러리 상세 조회
export const WalkingGalleryDetailsApi = async (
  idx: string | number
): Promise<SharedContent | null> => {
  try {
    const response = await axios.get<GalleryDetailResponse>(
      `${BASE_URL}/api/api_sp_gallery_view.php`,
      { params: { idx } }
    );
    const checkData = response.data;
    logger.log("Walking gallery detail response:", checkData);

    if (checkData.resultCode === "Y" && checkData.data?.length > 0) {
      const item = checkData.data[0];
      return {
        id: typeof item.idx === "string" ? parseFloat(item.idx) : item.idx,
        title: item.image_title,
        imgUrl: `${BASE_URL}${item.image_file}`,
        type: "walking",
        scenario: item.image_analysis_txt,
      };
    }
    logger.log("No walking gallery detail found");
    return null;
  } catch (error) {
    logger.error("Failed to fetch walking gallery detail:", error);
    return null;
  }
};

// 웹툰 갤러리 상세 조회
export const WebtoonGalleryDetailsApi = async (
  idx: string | number
): Promise<SharedContent | null> => {
  try {
    const response = await axios.get<GalleryDetailResponse>(
      `${BASE_URL}/api/api_wm_gallery_view.php`,
      { params: { idx } }
    );
    const checkData = response.data;
    logger.log("Webtoon gallery detail response:", checkData);

    if (checkData.resultCode === "Y" && checkData.data?.length > 0) {
      const item = checkData.data[0];
      return {
        id: typeof item.idx === "string" ? parseFloat(item.idx) : item.idx,
        title: item.image_title,
        imgUrl: `${BASE_URL}${item.image_file}`,
        type: "webtoon",
        scenario: item.image_analysis_txt,
      };
    }
    logger.log("No webtoon gallery detail found");
    return null;
  } catch (error) {
    logger.error("Failed to fetch webtoon gallery detail:", error);
    return null;
  }
};

//갤러리-공유 리스트들
export const getWalkingGalleryApi = async (): Promise<SharedContent[]> => {
  try {
    const response = await axios.get<GalleryResponse>(
      `${BASE_URL}/api/api_sp_gallery_list.php`
    );
    const checkData = response.data;

    if (
      checkData.data &&
      Array.isArray(checkData.data) &&
      checkData.data.length > 0
    ) {
      return checkData.data.map((item) => ({
        id: typeof item.idx === "string" ? parseFloat(item.idx) : item.idx,
        title: item.title,
        imgUrl: `${BASE_URL}${item.url}`,
        type: "walking",
      }));
    }
    logger.log("No gallery data found");
    return [];
  } catch (error) {
    return [];
  }
};

export const getWebtoonGalleryApi = async (): Promise<SharedContent[]> => {
  try {
    const response = await axios.get<GalleryResponse>(
      `${BASE_URL}/api/api_wm_gallery_list.php`
    );
    const checkData = response.data;

    if (
      checkData.data &&
      Array.isArray(checkData.data) &&
      checkData.data.length > 0
    ) {
      return checkData.data.map((item) => ({
        id: typeof item.idx === "string" ? parseFloat(item.idx) : item.idx,
        title: item.title,
        imgUrl: `${BASE_URL}${item.url}`,
        type: "webtoon",
      }));
    }

    return [];
  } catch (error) {
    return [];
  }
};

// 갤러리 타입에 따라 적절한 API 호출
export const getGalleryByType = (type: "walking" | "webtoon") => {
  return type === "walking" ? getWalkingGalleryApi() : getWebtoonGalleryApi();
};

// 갤러리 클릭시 조회수 증가

export const ViewCountWalkingGalleryApi = async (
  idx: string | number
): Promise<number | null> => {
  try {
    const response = await axios.post<ViewCountResponse>(
      `${BASE_URL}/api/api_sp_view_cnt.php`,
      { idx },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );
    logger.log(`Updating view count for idx: ${idx}`);
    logger.log(`view count response:`, response.data);
    if (response.data.resultCode === "Y") {
      return response.data.cnt;
    }
    return null;
  } catch (error) {
    return null;
  }
};
export const ViewCountWebtoonGalleryApi = async (
  idx: string | number
): Promise<number | null> => {
  try {
    const response = await axios.post<ViewCountResponse>(
      `${BASE_URL}/api/api_wm_view_cnt.php`,
      { idx },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );
    logger.log(`Updating view count for idx: ${idx}`);
    logger.log(`view count response:`, response.data);
    if (response.data.resultCode === "Y") {
      return response.data.cnt;
    }
    return null;
  } catch (error) {
    return null;
  }
};
