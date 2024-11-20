import axios from 'axios';
import { MainBannerUrl } from '../data/dummydata';
import { logger } from '../util/logger';

export const getBannerUrlApi = () => {
  return axios
    .get('https://gn50m.aixstudio.kr/api/api_main_banner.php')
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


export const getWalkingGalleryApi = () => {
  return axios
    .get('https://gn50m.aixstudio.kr/api/api_mid_banner.php')
    .then((res) => {
      const checkData = res.data
      if (checkData.resultCode === 'Y' && checkData.data) {
        return checkData.data
      } else {
        return []
      }
    })
}