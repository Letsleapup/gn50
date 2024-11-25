import axios from "axios";
import { BASE_URL } from "../const/const";
import { BannerResponse, SelectOptionsResponse } from "../@types/domain";
import { logger } from "../util/logger";

const getBannerApi = (url: string) => {
  return axios.get<BannerResponse>(`${BASE_URL}${url}`).then((res) => {
    const checkData = res.data;
    if (checkData.resultCode === "Y" && checkData.data.url.length > 0) {
      return `${BASE_URL}${checkData.data.url}`;
    }
  });
};

export const getSelectBannnerApi = (type: string) => {
  const bannerUrl =
    type === "walking" ? "/api/api_sp_banner.php" : "/api/api_wm_banner.php";
  return getBannerApi(bannerUrl);
};

const getOptionsApi = (url: string, idx: string) => {
  return axios
    .get<SelectOptionsResponse>(`${BASE_URL}${url}?`, { params: { idx } })
    .then((res) => {
      const checkData = res.data;
      logger.log("options1", checkData);
      if (checkData.resultCode === "Y" && checkData.data) {
        logger.log("options2", checkData.data);
        return checkData.data;
      }
    })
    .catch((error) => {
      console.error("Failed to fetch options:", error);
      return [];
    });
};

export const getSelectOptionsApi = (type: string) => {
  const optionsUrl =
    type === "walking" ? "/api/api_sp_list.php" : "/api/api_wm_list.php";
  return getOptionsApi(optionsUrl, "");
};

export const getDetailInfoApi = (type: string, idx: string) => {
  const optionsUrl =
    type === "walking" ? "/api/api_sp_select.php" : "/api/api_wm_select.php";
  return getOptionsApi(optionsUrl, idx);
};
