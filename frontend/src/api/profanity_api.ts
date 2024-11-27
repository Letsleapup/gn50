import { BASE_URL } from "../const/const";
import { logger } from "../util/logger";
import axios from "axios";

interface ProfanityResponse {
  resultCode: "Y" | "N";
}
export const profanityApi = {
  checkProfanity: (text: string) => {
    logger.info(`Profanity Check Text: ${text}`);
    return axios.get<ProfanityResponse>(`${BASE_URL}/api/api_bisogeo.php`, {
      params: { inp: text },
    });
  },
};
