import request from '@/utils/request'
export function addMessage(data) {
    return request({
        url: '/api/message',
        method: 'post',
        data
    })
}
export function getMessages(params) {
    return request({
        url: '/api/message',
        method: 'get',
        params
    })
}
export function deleteMessage(id) {
    return request({
        url: `/api/message/${id}`,
        method: 'delete',
    })
}