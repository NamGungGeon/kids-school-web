import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV === "DEBUG"
    ? "http://localhost:3003"
    : "https://kc-dev.cpsp.kr";

export const getAddresses = () => {
  return axios.request({
    url: `/addresses`,
    method: "GET"
  });
};

export const getSchoolsByAddress = (sidoName, sggName, options) => {
  return axios.request({
    url: `/schools/address/${sidoName}/${sggName}`,
    method: "GET",
    params: options
  });
};
export const getSchoolsByName = kinderName => {
  return axios.request({
    url: `/schools/`,
    method: "GET",
    params: {
      kinderName
    }
  });
};
