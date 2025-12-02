import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * 错误边界组件
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-surface rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              出错了
            </h1>
            <p className="text-text-secondary mb-6">
              应用遇到了一个错误，请刷新页面重试
            </p>
            {this.state.error && (
              <details className="text-left mb-6 p-4 bg-background rounded-sm">
                <summary className="cursor-pointer text-sm text-text-secondary mb-2">
                  错误详情
                </summary>
                <pre className="text-xs text-error overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="px-6 py-2 bg-primary text-white rounded-sm font-medium hover:bg-primary/90 transition-colors duration-fast"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
