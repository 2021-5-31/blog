import request from '@/utils/request'
export function addComment(data) {
    return request({
        url: '/api/comment',
        method: 'post',
        data
    })
}
export function getComments(params) {
    return request({
        url: '/api/comment',
        method: 'get',
        params
    })
}
export function deleteComment(id) {
    return request({
        url: `/api/comment/${id}`,
        method: 'delete',
    })
}