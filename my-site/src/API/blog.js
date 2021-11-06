import ins from '@/API/axios';
export async function getBlogCategroy() {
  return await ins.get('/api/blogtype');
}
export async function getBlogs(page = 1, limit = 10, categoryId = -1) {
  return await ins.get('/api/blog', {
    params: {
      page, limit, categoryId
    }
  });
}
export async function getDetail(id) {
  return await ins.get(`/api/blog/${id}`)
}
export async function postComment(body) {
  return await ins.post('/api/comment',body)
}
export async function getComment(page=1,limit=10,blogid) {
  return await ins.get('/api/comment', {
    params: {
      page,
      limit,
      blogid,
    }
  })
}