/**
 * 重试管理类 - 实现指数退避算法
 */
export class RetryManager {
  private maxRetries: number;
  private baseDelay: number;

  constructor(maxRetries: number = 3, baseDelay: number = 1000) {
    this.maxRetries = maxRetries;
    this.baseDelay = baseDelay;
  }

  /**
   * 执行带重试的操作
   * @param operation 要执行的异步操作
   * @param retryable 是否可重试
   * @returns 操作结果
   */
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    retryable: boolean = true
  ): Promise<T> {
    if (!retryable) {
      return operation();
    }

    let lastError: any;
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        // 如果是最后一次尝试，直接抛出错误
        if (attempt === this.maxRetries) {
          throw error;
        }

        // 计算延迟时间：指数退避 (1s, 2s, 4s)
        const delay = this.baseDelay * Math.pow(2, attempt);
        
        console.warn(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        
        // 等待后重试
        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  /**
   * 延迟函数
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 计算下一次重试的延迟时间
   */
  getRetryDelay(attempt: number): number {
    return this.baseDelay * Math.pow(2, attempt);
  }
}

// 导出默认实例
export const retryManager = new RetryManager(
  Number(import.meta.env.VITE_MAX_RETRIES) || 3,
  1000
);
