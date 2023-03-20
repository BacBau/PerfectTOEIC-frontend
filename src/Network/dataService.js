import request from './request';
import config from '../config';

let dataService = {
  loginApp: params => {
    return request.post(params);
  },
  login: params => {
    let url = "user/authenticate";
    return request.post(params, url);
  },
  register: params => {
    let url = "user/register";
    return request.post(params, url);
  },
  loginWithGoogle: () => {
    let url = "oauth2/authorization/google";
    window.location.href = config.HOST + '/' + url;
  },
  loginWithFacebook: () => {
    let url = "oauth2/authorization/facebook";
    window.location.href = config.HOST + '/' + url;
  },
  logoutApi: params => {
    let url = "user/logout";
    return request.post(params, url);
  },
  currentUser: () => {
    let url = "user";
    return request.get(url);
  },
  listExam: () => {
    let url = "exam?page=1&size=100";
    return request.get(url);
  },
  listMiniTest: () => {
    let url = "minitest";
    return request.get(url);
  },
  listPart: params => {
    let url = "part?part="+ params + "&page=1&size=100";
    return request.get(url);
  },
  getExamDetail: params => {
    let url = "exam/" + params;
    return request.get(url);
  },
  getMiniExamDetail: params => {
    let url = "minitest/" + params;
    return request.get(url);
  },
  getPartDetail: params => {
    let url = "part/" + params;
    return request.get(url);
  },
  getTips: param => {
    let url = "api/posts/type/" + param;
    return request.get(url);
  },
  getTip: param => {
    let url = "api/post/" + param;
    return request.get(url);
  },
  getRecent: () => {
    let url = "api/recent-post"
    return request.get(url);
  },
  postContent: params => {
    let url = "api/post";
    return request.post(params, url);
  },
  deleteContent: params => {
    let url = "api/post/" + params;
    return request.delete(url);
  },
  putContent: params => {
    let url = "api/post";
    return request.put(params, url);
  },
  getInfoHome: () => {
    let url = "api/home/introduction";
    return request.get(url);
  },
  getSearch: params => {
    let url = "api/posts/search?keyword=" + params;
    return request.get(url);
  },
};

export default dataService;
