import axios from "axios";
import { logger } from "../util/logger";
import { BASE_URL } from "../const/const";

interface WalkingChatbotResponse {
  resultCode: "Y" | "N";
  cnt: number | null;
  data: {
    idx: number;
    title: string;
    url: string;
    chatbot_file1: string;
    chatbot_file2: string;
    chatbot_welcome_msg: string;
    chatbot_q1: string;
    chatbot_q2: string;
    chatbot_q3: string;
    chatbot_q4: string;
  };
}

interface WebtoonChatbotResponse {
  resultCode: "Y" | "N";
  cnt: number | null;
  data: {
    idx: number;
    backinfo_title: string;
    backinfo_file1: string;
    chatbot_file1: string;
    chatbot_file2: string;
    chatbot_welcome_msg: string;
    chatbot_q1: string;
    chatbot_q2: string;
    chatbot_q3: string;
    chatbot_q4: string;
  };
}
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
export const chatbotLoadingApi = {
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

export const chatbotApi = {
  // 산책/걷기 챗봇 폼 데이터 가져오기
  getSpChatbotForm: async (idx: number) => {
    try {
      const response = await axios.get<WalkingChatbotResponse>(
        `${BASE_URL}/api/api_sp_chatbot_form.php?idx=${idx}`
      );
      if (response.data.resultCode === "Y") {
        const {
          title,
          url,
          chatbot_file1,
          chatbot_file2,
          chatbot_welcome_msg,
          chatbot_q1,
          chatbot_q2,
          chatbot_q3,
          chatbot_q4,
        } = response.data.data;
        return {
          title,
          imgUrl: `${BASE_URL}${url}`,
          chatbotFiles: [chatbot_file1, chatbot_file2]
            .filter((file): file is string => file !== undefined)
            .map((file) => `${BASE_URL}${file}`),
          welcomeMessage: chatbot_welcome_msg,
          questions: [chatbot_q1, chatbot_q2, chatbot_q3, chatbot_q4],
        };
      }
      throw new Error("데이터 없음");
    } catch (error) {
      return handleApiError(error, "산책 챗봇 폼 데이터 가져오기 실패");
    }
  },

  // 웹툰 챗봇 폼 데이터 가져오기
  getWmChatbotForm: async (idx: number) => {
    try {
      const response = await axios.get<WebtoonChatbotResponse>(
        `${BASE_URL}/api/api_wm_chatbot_form.php?idx=${idx}`
      );
      if (response.data.resultCode === "Y") {
        const {
          backinfo_title,
          backinfo_file1,
          chatbot_file1,
          chatbot_file2,
          chatbot_welcome_msg,
          chatbot_q1,
          chatbot_q2,
          chatbot_q3,
          chatbot_q4,
        } = response.data.data;
        return {
          title: backinfo_title,
          imgUrl: `${BASE_URL}${backinfo_file1}`,
          chatbotFiles: [chatbot_file1, chatbot_file2]
            .filter((file): file is string => file !== undefined)
            .map((file) => `${BASE_URL}${file}`),
          welcomeMessage: chatbot_welcome_msg,
          questions: [chatbot_q1, chatbot_q2, chatbot_q3, chatbot_q4],
        };
      }
      throw new Error("데이터 없음");
    } catch (error) {
      return handleApiError(error, "웹툰 챗봇 폼 데이터 가져오기 실패");
    }
  },
};
