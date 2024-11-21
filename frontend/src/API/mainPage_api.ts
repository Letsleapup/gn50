import axios from 'axios';
import { BASE_URL, MainBannerUrl } from "../const/const";
import { logger } from '../util/logger';

export const getBannerUrlApi = () => {
  return axios
    .get(`${BASE_URL}/api/api_main_banner.php`)
    .then((res) => {
      const checkData = res.data
      if (checkData.resultCode === 'Y' && checkData.data && checkData.data.url.length > 0) {
        return `https://gn50m.aixstudio.kr${checkData.data.url}`;
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
  console.log(url)
  return axios
    .get(url)
    .then((res) => {
      const checkData = res.data
      if (checkData.resultCode === 'Y' && checkData.data) {
        return checkData.data
      } else {
        return []
      }
    })
}

