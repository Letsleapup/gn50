import axios from "axios";
import { logger } from "../util/logger";
import { BASE_URL } from "../const/const";

interface LoadingResponse {
  resultCode: "Y" | "N";
  cnt: number;
  data: {
    loading_file1: string;
    loading_q1: string;
    loading_q2: string;
    loading_q3: string;
    loading_q4: string;
  };
}

// API 에러 처리 함수
const handleApiError = (error: any, message: string) => {
  logger.error(`${message}:`, error);
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(`${message}: ${errorMessage}`);
  }
  throw error;
};

// API 함수들
export const chatbotApi = {
  // 산책/걷기 로딩 상태 체크
  checkSpLoading: async () => {
    try {
      const response = await axios.get<LoadingResponse>(
        `${BASE_URL}/api/api_sp_loading.php`
      );
      if (response.data.resultCode === "Y") {
        const {
          loading_file1,
          loading_q1,
          loading_q2,
          loading_q3,
          loading_q4,
        } = response.data.data;
        return {
          loadingFile: loading_file1,
          messages: [loading_q1, loading_q2, loading_q3, loading_q4],
        };
      }
      throw new Error("데이터 없음");
    } catch (error) {
      return handleApiError(error, "산책 로딩 상태 확인 실패");
    }
  },

  // 웹툰 로딩 상태 체크
  checkWmLoading: async () => {
    try {
      const response = await axios.get<LoadingResponse>(
        `${BASE_URL}/api/api_wm_loading.php`
      );
      if (response.data.resultCode === "Y") {
        const {
          loading_file1,
          loading_q1,
          loading_q2,
          loading_q3,
          loading_q4,
        } = response.data.data;
        return {
          loadingFile: loading_file1,
          messages: [loading_q1, loading_q2, loading_q3, loading_q4],
        };
      }
      throw new Error("데이터 없음");
    } catch (error) {
      return handleApiError(error, "웹툰 로딩 상태 확인 실패");
    }
  },
};
