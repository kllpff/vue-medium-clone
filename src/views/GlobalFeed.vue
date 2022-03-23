<template>
  <div class="home-page">
    <mcv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed :api-url="apiFeedUrl" />
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

export default {
  name: 'McvGlobalFeed',
  components: {McvFeed, McvPopularTags, McvBanner},
  data() {
    return {
      apiFeedUrl: '/articles',
      apiTagsUrl: '/tags',
    }
  },
}
</script>
