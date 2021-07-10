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
            zIndex: "100"
          }}
        >
          {toasts &&
            toasts.map(toast => {
              return (
                <Alert elevation={6} severity={toast.severity}>
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
