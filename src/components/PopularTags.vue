<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message v-if="error" />
    <div v-if="error">Something went wrong... Please, try again</div>
    <div v-if="popularTags" class="sidebar">
      <p>Popular Tags</p>
      <router-link
        class="tag-default tag-pill"
        v-for="tag in popularTags.tags"
        :key="tag"
        :to="{name: 'tag', params: {slug: tag}}"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/tags'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'McvPopularTags',

  components: {McvErrorMessage, McvLoading},

  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.tags.isLoading,
      popularTags: (state) => state.tags.data,
      error: (state) => state.tags.error,
    }),
  },

  mounted() {
    this.$store.dispatch(actionTypes.getTags, {apiUrl: this.apiUrl})
  },
}
</script>
