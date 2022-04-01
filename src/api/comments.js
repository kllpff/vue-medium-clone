import axios from '@/api/axios'

const getComments = (slug) => {
  return axios
    .get(`/articles/${slug}/comments`)
    .then((response) => response.data.comments)
}

const sendComment = (slug, commentInput) => {
  return axios
    .post(`/articles/${slug}/comments`, {comment: {body: commentInput}})
    .then((response) => response.data.comment)
}

const deleteComment = (slug, commentId) => {
  return axios.delete(`/articles/${slug}/comments/${commentId}`)
}

export default {
  getComments,
  sendComment,
  deleteComment,
}
