<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-article-form
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    >
    </mcv-article-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvArticleForm from '@/components/ArticleForm'
import {actionTypes} from '@/store/modules/editArticle'
import McvLoading from '@/components/Loading'

export default {
  name: 'McvEditArticle',
  components: {McvArticleForm, McvLoading},
  // data() {
  //   return {
  //     initialValues: {
  //       body: '',
  //       title: '',
  //       tagList: [],
  //       description: '',
  //     },
  //   }
  // },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
      validationErrors: (state) => state.editArticle.validationErrors,
    }),
    initialValues() {
      if (!this.article) {
        return null
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      }
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    })
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug
      this.$store
        .dispatch(actionTypes.updateArticle, {articleInput, slug})
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    },
  },
}
</script>
