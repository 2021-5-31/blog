import request from '@/utils/request'

export function setBanner(data) {
  return request({
    url: '/api/banner',
    method: 'post',
    data
  })
}
export function getBanner() {
    return request({
      url: '/api/banner',
      method: 'get',
    })
  }
