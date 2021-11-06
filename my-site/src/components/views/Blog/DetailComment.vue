<template>
  <div class="detail-comment" v-if="data" id="comment-area">
    <h1>评论区：</h1>
    <CommentArea
      title="评论列表"
      :subTitle="`(${data.total}条)`"
      :list="data.rows"
      :isListLoading="isLoading"
      :hasData="hasData"
      @submit="handleSubmit"
      @clickToReload="handleClick"
    />
  </div>
</template>

<script>
import CommentArea from "@/components/CommentArea/CommentArea";
import mixin from "@/mixins/mixin";
import { getComment, postComment } from "@/API/blog";
export default {
  mixins: [mixin({total:0})],
  components: {
    CommentArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      hasData: true,
    };
  },
  created() {
    this.$bus.$on("scrollEvent", this.scrollToBottom);
  },
  computed: {},
  methods: {
    async getRemoteData() {
      return await getComment(this.page, this.limit, this.$route.params.id);
    },
    async handleSubmit(formData, callback) {
      const commentData = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      callback("论评成功");
      this.data.total++;
      this.data.rows.unshift(commentData);
    },

    async reloadMore() {
      if (!this.hasData) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const res = await this.getRemoteData();
      this.data.rows = this.data.rows.concat(res.rows);
      this.isLoading = false;
      if (this.data.rows.length >= this.data.total) {
        this.hasData = false;
      }
    },
    scrollToBottom(dom) {
      if (Math.ceil(dom.scrollTop + dom.clientHeight) == dom.scrollHeight) {
        this.reloadMore();
      }
    },
    handleClick() {
      this.reloadMore();
    },
  },
};
</script>

<style scoped lang='less'>
.detail-comment {
  margin-top: 50px;
  padding: 20px 0 0 20px;
  border-top: 1px dashed #808b96;
}
</style>