import articleApi from '@/api/article'
import userProfileApi from '@/api/userProfile'
import addToFavoritesApi from '@/api/addToFavorites'

const state = {
  data: null,
  isLoading: false,
  error: null,
  isFollow: null,
  isFavorite: null,
}

export const mutationTypes = {
  getArticleStart: '[article] GetArticleStart',
  getArticleSuccess: '[article] GetArticleSuccess',
  getArticleFailure: '[article] GetArticleFailure',

  deleteArticleStart: '[article] DeleteArticleStart',
  deleteArticleSuccess: '[article] DeleteArticleSuccess',
  deleteArticleFailure: '[article] DeleteArticleFailure',

  followToAuthorStart: '[article] followToAuthorStart',
  followToAuthorSuccess: '[article] followToAuthorSuccess',
  followToAuthorFailure: '[article] followToAuthorFailure',

  addToFavoritesStart: '[article] addToFavoritesStart',
  addToFavoritesSuccess: '[article] addToFavoritesSuccess',
  addToFavoritesFailure: '[article] addToFavoritesFailure',
}

export const actionTypes = {
  getArticle: '[article] Get article',
  deleteArticle: '[article] Delete article',
  followToAuthor: '[article] Follow to author',
  addToFavorites: '[article] Add to favorites',
}

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
    state.data = null
    state.isFollow = null
    state.isFavorite = null
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
    state.isFollow = payload.author.following
    state.isFavorite = payload.favorited
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false
  },

  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {},

  [mutationTypes.followToAuthorStart]() {},
  [mutationTypes.followToAuthorSuccess](state, payload) {
    state.isFollow = payload.following
  },
  [mutationTypes.followToAuthorFailure]() {},

  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess](state, payload) {
    state.isFavorite = payload.favorited
  },
  [mutationTypes.addToFavoritesFailure]() {},
}

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart, slug)
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure)
        })
    })
  },

  [actionTypes.deleteArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.deleteArticleStart, slug)
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailure)
        })
    })
  },

  [actionTypes.followToAuthor](context, {slug, isFollow}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.followToAuthorStart)
      userProfileApi
        .followUser(slug, isFollow)
        .then((userProfile) => {
          context.commit(mutationTypes.followToAuthorSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationTypes.followToAuthorFailure)
        })
    })
  },

  [actionTypes.addToFavorites](context, {slug, isFavorited}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.addToFavoritesStart)
      const promise = isFavorited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)
      promise
        .then((article) => {
          context.commit(mutationTypes.addToFavoritesSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavoritesFailure())
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
