import { ErrorType, AppError } from '../types';
import { AxiosError } from 'axios';

/**
 * 错误处理类
 */
export class ErrorHandler {
  /**
   * 处理API错误
   */
  static handleAPIError(error: any): AppError {
    if (error.response) {
      const status = error.response.status;
      
      if (status >= 400 && status < 500) {
        return {
          type: ErrorType.API_ERROR,
          message: error.response.data?.message || '请求参数错误',
          code: status,
          retryable: false,
        };
      }
      
      if (status >= 500) {
        return {
          type: ErrorType.API_ERROR,
          message: '服务器暂时不可用',
          code: status,
          retryable: true,
        };
      }
    }

    return {
      type: ErrorType.API_ERROR,
      message: error.message || 'API请求失败',
      retryable: true,
    };
  }

  /**
   * 处理网络错误
   */
  static handleNetworkError(error: any): AppError {
    return {
      type: ErrorType.NETWORK_ERROR,
      message: '网络连接失败，请检查您的网络设置',
      retryable: true,
    };
  }

  /**
   * 处理解析错误
   */
  static handleParseError(error: any): AppError {
    return {
      type: ErrorType.PARSE_ERROR,
      message: '数据格式错误，请刷新页面',
      retryable: false,
    };
  }

  /**
   * 获取用户友好的错误消息
   */
  static getUserFriendlyMessage(error: AppError): string {
    switch (error.type) {
      case ErrorType.NETWORK_ERROR:
        return '网络连接失败，请检查您的网络设置';
      case ErrorType.API_ERROR:
        if (error.code && error.code >= 500) {
          return '服务器暂时不可用，请稍后重试';
        }
        return error.message || 'API请求失败';
      case ErrorType.PARSE_ERROR:
        return '数据格式错误，请刷新页面';
      case ErrorType.VALIDATION_ERROR:
        return error.message || '数据验证失败';
      default:
        return '发生未知错误，请稍后重试';
    }
  }

  /**
   * 判断错误是否可重试
   */
  static shouldRetry(error: AppError): boolean {
    return error.retryable;
  }

  /**
   * 统一错误处理入口
   */
  static handle(error: any): AppError {
    // 如果已经是AppError，直接返回
    if (error.type && error.message !== undefined && error.retryable !== undefined) {
      return error as AppError;
    }

    // Axios错误
    if (error.isAxiosError || error.response) {
      if (!error.response && error.request) {
        return this.handleNetworkError(error);
      }
      return this.handleAPIError(error);
    }

    // JSON解析错误
    if (error instanceof SyntaxError) {
      return this.handleParseError(error);
    }

    // 其他错误
    return {
      type: ErrorType.API_ERROR,
      message: error.message || '发生未知错误',
      retryable: false,
    };
  }
}
