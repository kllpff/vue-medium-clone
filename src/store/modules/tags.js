import tagsApi from '@/api/popularTags'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getTagsStart: '[tags] GetTagsStart',
  getTagsSuccess: '[tags] GetTagsSuccess',
  getTagsFailure: '[tags] GetTagsFailure',
}

export const actionTypes = {
  getTags: '[tags] Get tags',
}

const mutations = {
  [mutationTypes.getTagsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getTagsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getTagsFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getTags](context, {apiUrl}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getTagsStart)
      tagsApi
        .getPopularTags(apiUrl)
        .then((response) => {
          context.commit(mutationTypes.getTagsSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getTagsFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
