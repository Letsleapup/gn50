import axios from "axios";
import { logger } from "../util/logger";
import { SharedContent } from "../@types/domain";

interface GalleryResponse {
  resultCode: "Y" | "N";
  cnt: number | null;
  data: Array<{
    idx: string;
    title: string;
    url: string;
  }>;
}
const BASE_URL = "https://gn50m.aixstudio.kr";

export const getWalkingGalleryApi = async (): Promise<SharedContent[]> => {
  try {
    const response = await axios.get<GalleryResponse>(
      `${BASE_URL}/api/api_sp_gallery_list.php`
    );
    const checkData = response.data;
    logger.log("Walking gallery response:", checkData);

    if (
      checkData.data &&
      Array.isArray(checkData.data) &&
      checkData.data.length > 0
    ) {
      return checkData.data.map((item) => ({
        id: parseFloat(item.idx),
        title: item.title,
        imgUrl: `${BASE_URL}${item.url}`,
        type: "walking",
      }));
    }
    logger.log("No gallery data found");
    return [];
  } catch (error) {
    logger.error("Failed to fetch walking gallery:", error);
    return [];
  }
};

export const getWebtoonGalleryApi = async (): Promise<SharedContent[]> => {
  try {
    const response = await axios.get<GalleryResponse>(
      `${BASE_URL}/api/api_wm_gallery_list.php`
    );
    const checkData = response.data;
    logger.log("Webtoon gallery response:", checkData);

    if (
      checkData.data &&
      Array.isArray(checkData.data) &&
      checkData.data.length > 0
    ) {
      logger.log("Processing webtoon data:", checkData.data);
      return checkData.data.map((item) => ({
        id: parseFloat(item.idx),
        title: item.title,
        imgUrl: `${BASE_URL}${item.url}`,
        type: "webtoon",
      }));
    }
    logger.log("No webtoon data found"); // 데이터가 없을 때 로그
    return [];
  } catch (error) {
    logger.error("Failed to fetch webtoon gallery:", error);
    return [];
  }
};

// 갤러리 타입에 따라 적절한 API 호출
export const getGalleryByType = (type: "walking" | "webtoon") => {
  return type === "walking" ? getWalkingGalleryApi() : getWebtoonGalleryApi();
};
