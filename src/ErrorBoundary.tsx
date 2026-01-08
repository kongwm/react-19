// src/components/ErrorBoundary.tsx

import React, { type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    if (process.env.NODE_ENV === 'development') {
      return { hasError: false };
    }
    return { hasError: true };
  }

  navigator = (path: string) => {
    window.location.href = path;
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary 捕获到错误：', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <button
            type="button"
            onClick={() => this.navigator('/')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.navigator('/');
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              font: 'inherit',
            }}
          >
            Something went wrong.
          </button>
        )
      );
    }

    return this.props.children;
  }
}
