import axios from 'axios';
import { BASE_URL, MainBannerUrl } from "../const/const";
import { logger } from '../util/logger';
import { BannerResponse, GalleryResponse } from '../@types/domain';


export const getBannerUrlApi = () => {
  return axios
    .get<BannerResponse>(`${BASE_URL}/api/api_main_banner.php`)
    .then((res) => {
      const checkData = res.data
      if (checkData.resultCode === 'Y' && checkData.data.url.length > 0) {
        return `${BASE_URL}${checkData.data.url}`;
      } else {
        return MainBannerUrl;
      }
    })
    .catch((error) => {
      logger.error('Failed to fetch banner URL:', error);
      return MainBannerUrl;
    });
};


export const getGalleryInMainPageApi = (url: string) => {
  logger.info(`Gallery URL: ${url}`);
  return axios
    .get<GalleryResponse>(url)
    .then((res) => {
      const checkData = res.data
      if (checkData.resultCode === 'Y' && checkData.data) {
        return checkData.data
      } else {
        return []
      }
    })
}

