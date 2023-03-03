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
  listPart: params => {
    let url = "part?part="+ params + "&page=1&size=100";
    return request.get(url);
  },
  getExamDetail: params => {
    let url = "exam/" + params;
    return request.get(url);
  },
  getPartDetail: params => {
    let url = "part/" + params;
    return request.get(url);
  }
};

export default dataService;
