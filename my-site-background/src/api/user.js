import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

export function getInfoApi() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

export function changeLoginPwd(data) {
  return request({
    url: '/api/admin',
    method: 'put',
    data
  })
}
export function getCaptchaApi() {
  return request({
    url: '/res/captcha',
    method: 'get'
  })
}
