import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isLoading: false,
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  authStart: '[auth] authStart',
  authSuccess: '[auth] authSuccess',
  authFailure: '[auth] authFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
}

export const actionTypes = {
  register: '[auth] register',
  auth: '[auth] auth',
  getCurrentUser: '[auth] getCurrentUser',
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
}

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false
  },
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationTypes.authStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.authSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.authFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.errors
          )
        })
    })
  },

  [actionTypes.auth](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.authStart)
      authApi
        .auth(credentials)
        .then((response) => {
          context.commit(mutationTypes.authSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((result) => {
          context.commit(mutationTypes.authFailure, result.response.data.errors)
        })
    })
  },

  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          )
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
