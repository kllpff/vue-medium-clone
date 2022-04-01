import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getUserProfileStart: '[userProfile] GetUserProfileStart',
  getUserProfileSuccess: '[userProfile] GetUserProfileSuccess',
  getUserProfileFailure: '[userProfile] GetUserProfileFailure',

  followUserStart: '[userProfile] FollowUserStart',
  followUserSuccess: '[userProfile] FollowUserSuccess',
  followUserFailure: '[userProfile] FollowUserFailure',
}

export const actionTypes = {
  getUserProfile: '[userProfile] getUserProfile',
  followUser: '[userProfile] followUser',
}

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getUserProfileFailure](state) {
    state.isLoading = false
  },

  [mutationTypes.followUserStart]() {},
  [mutationTypes.followUserSuccess](state, payload) {
    state.data = payload
  },
  [mutationTypes.followUserFailure]() {},
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then((userProfile) => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailure)
        })
    })
  },

  [actionTypes.followUser](context, {slug, isFollow}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.followUserStart)
      userProfileApi
        .followUser(slug, isFollow)
        .then((userProfile) => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
