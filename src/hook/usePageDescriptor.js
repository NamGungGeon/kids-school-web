import { useEffect, useState } from "react";
import { observable } from "mobx";

const defaultDescriptor = {
  title: "키즈스쿨",
  description: "유치원/어린이집 검색과 비교를 한번에!",
  imageUrl: "/logo.png"
};
const setMetaTags = ({
  title = defaultDescriptor.title,
  description = defaultDescriptor.description,
  imageUrl = defaultDescriptor.imageUrl
}) => {
  //set title
  document.querySelector("title").text = title;
  document
    .querySelector('meta[property="og:title"]')
    .setAttribute("content", `${title}`);
  //set description
  document
    .querySelector('meta[property="og:description"]')
    .setAttribute("content", description);
  //set images
  document
    .querySelector('meta[property="og:image"]')
    .setAttribute("content", imageUrl);
  //set url
  document
    .querySelector('meta[property="og:url"]')
    .setAttribute("content", window.location.href);
};
export const getMetaTags = () => {
  return {
    title: document.querySelector("title").text,
    description: document
      .querySelector('meta[property="og:title"]')
      .getAttribute("content"),
    imageUrl: document
      .querySelector('meta[property="og:title"]')
      .getAttribute("content")
  };
};

const pageDescriptor = observable({
  value: getMetaTags()
});
export const usePageDescriptor = newDescriptor => {
  useEffect(() => {
    if (newDescriptor) pageDescriptor.value = newDescriptor;
    return () => {
      pageDescriptor.value = defaultDescriptor;
    };
  }, []);
  useEffect(() => {
    console.log("onUpdated pageDescriptor.value");
    setMetaTags(pageDescriptor.value);
  }, [pageDescriptor.value]);
  return [
    pageDescriptor.value,
    descriptor => {
      pageDescriptor.value = descriptor;
    }
  ];
};
