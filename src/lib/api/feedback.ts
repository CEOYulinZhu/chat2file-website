/**
 * 反馈 API 服务
 * 负责与后端反馈接口的通信
 */

import { API_CONFIG } from '../config/api';

export interface FeedbackData {
  name: string;
  email: string;
  suggestion: string;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  code: number;
}

export class FeedbackApiError extends Error {
  constructor(
    message: string,
    public code: number,
    public success: boolean = false
  ) {
    super(message);
    this.name = 'FeedbackApiError';
  }
}

/**
 * 反馈 API 服务类
 */
export class FeedbackApiService {
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(
    baseUrl: string = API_CONFIG.BASE_URL, 
    timeout: number = API_CONFIG.TIMEOUT.DEFAULT
  ) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * 提交用户反馈
   * @param data 反馈数据
   * @returns Promise<FeedbackResponse>
   */
  async submitFeedback(data: FeedbackData): Promise<FeedbackResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.FEEDBACK}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result: FeedbackResponse = await response.json();

      if (!result.success) {
        throw new FeedbackApiError(result.message, result.code, result.success);
      }

      return result;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof FeedbackApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new FeedbackApiError('请求超时，请稍后重试', API_CONFIG.STATUS_CODES.TIMEOUT);
        }
        
        if (error.message.includes('Failed to fetch')) {
          throw new FeedbackApiError('网络连接失败，请检查网络连接', 0);
        }
      }

      throw new FeedbackApiError('未知错误，请稍后重试', API_CONFIG.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 健康检查
   * @returns Promise<boolean>
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.HEALTH}`, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// 默认实例
export const feedbackApi = new FeedbackApiService();
