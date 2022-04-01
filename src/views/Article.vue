<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span>
            <button
              @click="followToAuthor"
              class="btn btn-sm action-btn btn-outline-secondary"
            >
              <span>
                <i class="ion-plus-round"></i>&nbsp;
                <span v-if="isFollow">Unfollow</span>
                <span v-else>Follow</span>
                {{ article.author.username }}
              </span>
            </button>
            <button
              @click="handleFavorite"
              class="btn btn-sm"
              v-bind:class="[
                article.favorited ? activeBtnClass : inactiveBtnClass,
              ]"
            >
              <i class="ion-heart"></i>&nbsp;
              <span v-if="isFavorite">Unfavorite Article</span>
              <span v-else>Favorite Article</span>
              ({{ article.favoritesCount }})
            </button>
          </span>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{name: 'editArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit" />
              Edit article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />
              Delete article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <mcv-tags v-if="article.tagList" :tags="article.tagList" />
        </div>
      </div>
      <hr />
    </div>
    <mcv-comments :currentUser="currentUser" />
  </div>
</template>

<script>
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {mapState, mapGetters} from 'vuex'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTags from '@/components/Tags'
import McvComments from '@/components/Comments'

export default {
  name: 'McvArticle',
  data() {
    return {
      activeBtnClass: 'btn-primary',
      inactiveBtnClass: 'btn-outline-primary',
    }
  },
  components: {McvComments, McvTags, McvErrorMessage, McvLoading},
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      article: (state) => state.article.data,
      error: (state) => state.article.error,
      isFollow: (state) => state.article.isFollow,
      isFavorite: (state) => state.article.isFavorite,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    },
  },

  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {
      slug: this.$route.params.slug,
    })
  },

  methods: {
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.$route.params.slug,
        })
        .then(() => {
          this.$router.push({name: 'globalFeed'})
        })
    },
    followToAuthor() {
      this.$store.dispatch(articleActionTypes.followToAuthor, {
        slug: this.article.author.username,
        isFollow: this.isFollow,
      })
    },
    handleFavorite() {
      this.$store.dispatch(articleActionTypes.addToFavorites, {
        slug: this.article.slug,
        isFavorited: this.isFavorite,
      })
    },
  },
}
</script>
