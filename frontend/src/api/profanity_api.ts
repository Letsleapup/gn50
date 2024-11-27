import { BASE_URL } from "../const/const";
import { logger } from "../util/logger";
import axios from "axios";

interface ProfanityResponse {
  resultCode: "Y" | "N";
}
export const profanityApi = {
  checkProfanity: async (text: string) => {
    try {
      logger.info(`Profanity Check Text: ${text}`);
      const response = await axios.get<ProfanityResponse>(
        `${BASE_URL}/api/api_bisogeo.php`,
        {
          params: { inp: text },
        }
      );
      return response.data.resultCode === "Y";
    } catch (error) {
      logger.error("Profanity Check Error:", error);
      return true;
    }
  },
};
