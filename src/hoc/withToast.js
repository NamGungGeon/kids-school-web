import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Alert from "@material-ui/lab/Alert";
import { useToasts } from "../hook/useToast";

const withToast = WrappedComponent => {
  const Component = props => {
    const [toasts] = useToasts();
    return (
      <>
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            zIndex: "9999"
          }}
        >
          {toasts &&
            toasts.map(toast => {
              return (
                <Alert
                  key={toast.id}
                  elevation={6}
                  severity={toast.severity}
                  style={{ margin: "8px" }}
                >
                  {toast.children}
                </Alert>
              );
            })}
        </div>
        <WrappedComponent {...props} />
      </>
    );
  };
  return observer(Component);
};

export default withToast;
