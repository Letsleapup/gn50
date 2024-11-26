import axios from "axios";
import { logger } from "../util/logger";
import { BASE_URL } from "../const/const";

// API 응답 타입 정의
interface ResultPageResponse {
  resultCode: "Y" | "N";
  cnt: number;
  data: {
    idx: number;
    image_title: string;
    image_file1: string;
    image_analysis_txt: string;
  };
}

interface EditScenarioRequest {
  idx: string;
  context: string;
}

interface CompleteRequest {
  idx: number | string;
  complete_yn: "Y" | "N";
}

interface ResultPageAiResponse {
  status: string;
  data: {
    idx: number;
    image_url: string;
    description: string;
    keywords: string  
  }
  translated_text: string;
  excute_time: string;
}

// API 에러 처리 함수
const handleApiError = (error: unknown, message: string) => {
  logger.error(`${message}:`, error);
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(`${message}: ${errorMessage}`);
  }
  throw error;
};

export const getResultPageApi = async (type: string, inp: string, idx: string) => {
  const resultPageUrl = type === 'walking' ? '/api/api_img_ai3.php' : '/api/api_img_ai2.php'
  try {
    const response = await axios.get<ResultPageAiResponse>(`${BASE_URL}${resultPageUrl}`,{params: {idx:idx, inp:inp}})
    console.log(response)
    if(response.data.status === 'success') {
      return response.data.data
    } else {
      return null
    }
  } catch (error) {
    return handleApiError(error, "결과 데이터 가져오기 실패");
  }
}

export const getResultWalkingAiapi = (inp: string, idx: string) => {
  return getResultPageApi('walking', inp, idx)
}

export const getResultWebtoonAiapi = (inp: string, idx: string) => {
  return getResultPageApi('webtoon', inp, idx)
}


// API 함수들
export const resultPageApi = {
  // OpenAI 결과 데이터 가져오기
  getResultData: async () => {
    try {
      const response = await axios.get<ResultPageResponse>(
        `${BASE_URL}/api/api_sp_rcv_openai.php`
      );
      if (response.data.resultCode === "Y") {
        return response.data.data;
      }
      throw new Error("데이터 없음");
    } catch (error) {
      return handleApiError(error, "결과 데이터 가져오기 실패");
    }
  },

  // 시나리오 수정하기
  editScenario: async (data: EditScenarioRequest) => {
    try {
      const response = await axios.get<ResultPageResponse>(
        `${BASE_URL}/api/api_sp_edit_senario.php`,
        {params: data}
      );
      if (response.data.resultCode === "Y") {
        return true;
      }
      return false;
    } catch (error) {
      return handleApiError(error, "시나리오 수정 실패");
    }
  },

  // 완료 상태 업데이트
  isUpdateComplete: async (data: CompleteRequest) => {
    try {
      const response = await axios.get<ResultPageResponse>(
        `${BASE_URL}/api/api_sp_complete.php`,
        {params: data}
      );
      if (response.data.resultCode === "Y") {
        return true;
      }
      return false;
    } catch (error) {
      return handleApiError(error, "완료 상태 업데이트 실패");
    }
  },
};

// 웹툰 API 함수들
export const webtoonResultPageApi = {
  // OpenAI 결과 데이터 가져오기
  getResultData: async () => {
    try {
      const response = await axios.get<ResultPageResponse>(
        `${BASE_URL}/api/api_wm_rcv_openai.php`
      );
      if (response.data.resultCode === "Y") {
        return response.data.data;
      }
      throw new Error("데이터 없음");
    } catch (error) {
      return handleApiError(error, "웹툰 결과 데이터 가져오기 실패");
    }
  },

  // 시나리오 수정하기
  editScenario: async (data: EditScenarioRequest) => {
    try {
      const response = await axios.post<ResultPageResponse>(
        `${BASE_URL}/api/api_wm_edit_senario.php`,
        data
      );
      if (response.data.resultCode === "Y") {
        return true;
      }
      return false;
    } catch (error) {
      return handleApiError(error, "웹툰 시나리오 수정 실패");
    }
  },

  // 완료 상태 업데이트
  updateComplete: async (data: CompleteRequest) => {
    try {
      const response = await axios.post<ResultPageResponse>(
        `${BASE_URL}/api/api_wm_complete.php`,
        data
      );
      if (response.data.resultCode === "Y") {
        return true;
      }
      return false;
    } catch (error) {
      return handleApiError(error, "웹툰 완료 상태 업데이트 실패");
    }
  },
};
