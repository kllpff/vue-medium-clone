<template>
  <div class="home-page">
    <mcv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler :tag-name="tagName" />
          <mcv-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <mcv-popular-tags :api-url="apiTagsUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed'
import McvBanner from '@/components/Banner'
import McvPopularTags from '@/components/PopularTags'
import McvFeedToggler from '@/components/McvFeedToggler'

export default {
  name: 'McvGlobalFeed',
  components: {McvFeed, McvPopularTags, McvBanner, McvFeedToggler},

  data() {
    return {
      apiTagsUrl: '/tags',
    }
  },

  computed: {
    tagName() {
      return this.$route.params.slug
    },
    apiUrl() {
      return `/articles/?tag=${this.tagName}`
    },
  },
}
</script>
