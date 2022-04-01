<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <div v-if="currentUser">
        <form class="card comment-form">
          <div class="card-block">
            <textarea
              v-model="comment"
              class="form-control"
              placeholder="Write a comment..."
              rows="3"
            ></textarea>
          </div>
          <div class="card-footer">
            <img :src="currentUser.image" class="comment-author-img" />
            <button
              @click="leaveComment"
              class="btn btn-sm btn-primary"
              type="button"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
      <mcv-loading v-if="isLoading" />

      <mcv-comment-item
        v-else
        v-for="comment in comments"
        v-bind:key="comment.id"
        :comment="comment"
        @deleteSumbit="fetchComments"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/comments'
import McvLoading from '@/components/Loading'
import McvCommentItem from '@/components/CommentItem'

export default {
  name: 'McvComments',
  components: {McvLoading, McvCommentItem},
  data() {
    return {
      comment: '',
    }
  },
  props: {
    currentUser: {
      type: Object,
      required: false,
    },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.comments.isLoading,
      comments: (state) => state.comments.data,
      error: (state) => state.comments.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getComments, {
      slug: this.$route.params.slug,
    })
  },
  methods: {
    fetchComments() {
      this.$store.dispatch(actionTypes.getComments, {
        slug: this.$route.params.slug,
      })
      this.comment = ''
    },
    leaveComment() {
      this.$store.dispatch(actionTypes.sendComment, {
        slug: this.$route.params.slug,
        commentInput: this.comment,
      })
      this.fetchComments()
    },
  },
}
</script>
