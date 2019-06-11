import axios from 'axios'

let base = 'http://localhost:8080/dxs';
export const postRequest = (url, data, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: data,
    params: params,
    transformRequest: [function (data) {
      data = JSON.stringify(data);
      return data
    }],
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, data, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: data,
    params: params,
    transformRequest: [function (data) {
      data = JSON.stringify(data);
      return data;
    }],
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
export const putRequest2 = (url, data, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: data,
    params: params,
    transformRequest: [function (data) {
      data = JSON.stringify(data);
      return data;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
}
export const deleteRequest = (url,params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    params: params,
  });
}
export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
