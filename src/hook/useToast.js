import { observable } from "mobx";
import { useEffect } from "react";

const toasts = observable([]);
export const useToasts = () => {
  useEffect(() => {
    console.log("toasts", toasts);
  }, [toasts]);
  const addToast = (children, severity = "success", timeout = 2000) => {
    toasts.push({
      children,
      severity
    });
    setTimeout(() => {
      toasts.shift();
    }, timeout);
  };
  const clearToast = () => {
    toasts.clear();
  };
  return [toasts, addToast, clearToast];
};
