/**
 * API 配置文件
 * 管理 API 端点和相关配置
 */

export const API_CONFIG = {
  // 基础 URL（使用 HTTPS，去掉末尾斜杠以避免拼接出双斜杠）
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://115.190.37.151',

  // 超时设置
  TIMEOUT: {
    DEFAULT: 10000, // 10秒
    HEALTH_CHECK: 5000, // 5秒
  },

  // 端点
  ENDPOINTS: {
    // 代理到服务器端路由，避免浏览器 Mixed Content 问题
    FEEDBACK: '/api/proxy/feedback',
    HEALTH: '/health',
  },

  // 重试配置
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // 1秒
  },

  // HTTP 状态码
  STATUS_CODES: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,
    TIMEOUT: 408,
  },
} as const;

export type ApiConfig = typeof API_CONFIG;