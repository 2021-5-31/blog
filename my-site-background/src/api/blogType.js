import request from '@/utils/request'

export function addBlogType(data) {
    return request({
        url: '/api/blogtype',
        method: 'post',
        data
    })
}
export function editBlogType(id, data) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'put',
        data
    })
}
export function deleteBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'delete',
    })
}
export function getBlogType() {
    return request({
        url: `/api/blogtype`,
        method: 'get',
    })
}
