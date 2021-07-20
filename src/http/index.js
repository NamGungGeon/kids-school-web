import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" && false
    ? "http://localhost:3003"
    : "https://kc-dev.cpsp.kr";

export const getAddresses = () => {
  return axios.request({
    url: `/addresses`,
    method: "GET",
  });
};

export const getSchoolsByAddress = (sidoName, sggName, options) => {
  return axios.request({
    url: `/schools/address/${sidoName}/${sggName}`,
    method: "GET",
    params: options,
  });
};
export const getNearSchools = (lat, lng) => {
  return axios.request({
    url: `/schools/near`,
    method: "GET",
    params: {
      lat,
      lng,
    },
  });
};
export const getSchoolsByName = (kinderName) => {
  return axios.request({
    url: `/schools/`,
    method: "GET",
    params: {
      kinderName,
    },
  });
};
export const getSchoolInfo = (kinderCode) => {
  return axios.request({
    url: `/schools/${kinderCode}`,
    method: "GET",
  });
};

export const getSchoolsByCodes = (codes) => {
  return axios.request({
    url: `/schools/codes`,
    method: "GET",
    params: {
      codes: codes.join(","),
    },
  });
};
export const getServiceAvailable = () => {
  return axios.request({
    url: `/`,
    method: "GET",
  });
};
export const createReport = (email, title, content) => {
  return axios.request({
    url: `/reports`,
    method: "POST",
    data: {
      email,
      title,
      content,
    },
  });
};
export const createLog = (summary, log) => {
  return axios.request({
    url: `/logs`,
    method: "POST",
    data: {
      summary,
      log,
    },
  });
};

//유치원
export const getKinderViolations = (kinderCode) => {
  return axios.request({
    url: `/schools/violations/kinder/${kinderCode}`,
    method: "GET",
  });
};
export const getChildrenViolations = () => {
  return axios.request({
    url: `/schools/violations/children/`,
    method: "GET",
  });
};
