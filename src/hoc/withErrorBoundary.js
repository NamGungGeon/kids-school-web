import React from "react";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const withBoundary = WrappedComponent => {
  const Component = props => {
    return (
      <ErrorBoundary>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
  return Component;
};
export default withBoundary;
