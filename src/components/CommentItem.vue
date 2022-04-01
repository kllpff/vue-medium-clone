<template>
  <div v-if="comment" class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <router-link
        :to="{name: 'userProfile', params: {slug: comment.author.username}}"
        class="comment-author"
      >
        <img class="comment-author-img" :src="comment.author.image" />
      </router-link>
      &nbsp;
      <router-link
        :to="{name: 'userProfile', params: {slug: comment.author.username}}"
        class="comment-author"
        >{{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{ comment.createdAt }}</span>
      <span @click="deleteComment" v-if="isAuthor()" class="mod-options">
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {actionTypes} from '@/store/modules/comments'

export default {
  name: 'McvCommentItem',
  props: {
    comment: {
      type: Object,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
  },
  methods: {
    isAuthor() {
      if (!this.currentUser) {
        return false
      }
      return this.comment.author.username === this.currentUser.username
    },
    deleteComment() {
      this.$store.dispatch(actionTypes.deleteComment, {
        slug: this.$route.params.slug,
        commentId: this.comment.id,
      })
      this.$emit('deleteSumbit')
    },
  },
}
</script>
