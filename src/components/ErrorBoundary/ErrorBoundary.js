import React from "react";
import { createLog } from "../../http";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (localStorage.getItem("trackable") === "disallow") return;
    if (window.location.href.includes("localhost")) return;

    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    console.error(error);
    const version = process.env.REACT_APP_VERSION;
    const summary = `${
      window.location.href
    } (v ${version})\n${error.toString()}\n${error.message}`;
    const { componentStack } = errorInfo;
    console.error("ERROR", summary, componentStack);

    createLog(summary, componentStack).catch(e => {
      console.error(e);
    });
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return (
        <div>
          <h1>죄송합니다. 치명적인 오류가 발생했습니다.</h1>
          <a href={`/?=refresh=${Math.random().toString(36)}`}>홈으로 이동</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
