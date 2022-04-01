import commentsApi from '@/api/comments'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getCommentsStart: '[comments] getCommentsStart',
  getCommentsSuccess: '[comments] getCommentsSuccess',
  getCommentsFailure: '[comments] getCommentsFailure',

  sendCommentStart: '[comments] sendCommentStart',
  sendCommentSuccess: '[comments] sendCommentSuccess',
  sendCommentFailure: '[comments] sendCommentFailure',

  deleteCommentStart: '[comments] deleteCommentStart',
  deleteCommentSuccess: '[comments] deleteCommentSuccess',
  deleteCommentFailure: '[comments] deleteCommentFailure',
}

export const actionTypes = {
  getComments: '[comments] getComments',
  sendComment: '[comments] sendComment',
  deleteComment: '[comments] deleteComment',
}

const mutations = {
  [mutationTypes.getCommentsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getCommentsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getCommentsFailure]() {},

  [mutationTypes.sendCommentStart]() {},
  [mutationTypes.sendCommentSuccess]() {},
  [mutationTypes.sendCommentFailure]() {},

  [mutationTypes.deleteCommentStart]() {},
  [mutationTypes.deleteCommentSuccess]() {},
  [mutationTypes.deleteCommentFailure]() {},
}

const actions = {
  [actionTypes.getComments](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCommentsStart)
      commentsApi
        .getComments(slug)
        .then((comments) => {
          context.commit(mutationTypes.getCommentsSuccess, comments)
          resolve(comments)
        })
        .catch(() => {
          context.commit(mutationTypes.getCommentsFailure)
        })
    })
  },

  [actionTypes.sendComment](context, {slug, commentInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.sendCommentStart)
      commentsApi
        .sendComment(slug, commentInput)
        .then((comment) => {
          context.commit(mutationTypes.sendCommentSuccess, comment)
          resolve(comment)
        })
        .catch(() => {
          context.commit(mutationTypes.sendCommentFailure)
        })
    })
  },

  [actionTypes.deleteComment](context, {slug, commentId}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.deleteCommentStart)
      commentsApi
        .deleteComment(slug, commentId)
        .then(() => {
          context.commit(mutationTypes.deleteCommentSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteCommentFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
