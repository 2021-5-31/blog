<template>
  <Layout>
    <div class="detail-content" v-loading="isLoading" ref="scrollContainer">
      <DetailContent :data="data" v-if="data.title" />
      <DetailComment v-if="!isLoading" />
    </div>

    <template #right>
      <div class="detail-toc" v-loading="isLoading">
        <DetailToc :list="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout/Layout";
import DetailToc from "./DetailToc";
import DetailContent from "./DetailContent";
import * as blogAPi from "@/API/blog";
import mixin from "@/mixins/mixin";
import DetailComment from "./DetailComment";
import {formatDate} from '@/utils/formatDate'
export default {
  mixins: [mixin({})],
  components: {
    Layout,
    DetailToc,
    DetailContent,
    DetailComment,
  },
  mounted() {
    this.$refs.scrollContainer.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("clickToTop", this.handleClick);
  },
  beforedestroyed() {
    this.$refs.scrollContainer.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("clickToTop", this.handleClick);
  },
  destroyed() {
    this.$store.state.top.scrollTop = false;
  },
  methods: {
    async getRemoteData() {
      const blogId = this.$route.params.id;
      const res = await blogAPi.getDetail(blogId);
      res.createDate = formatDate(res.createDate);
      return res;
    },
    handleScroll() {
      this.$bus.$emit("scrollEvent", this.$refs.scrollContainer);
    },
    handleClick(scrollTop) {
      if (!this.$refs.scrollContainer) {
        return;
      }
      this.$refs.scrollContainer.scrollTop = scrollTop;
    },
  },
};
</script>

<style scoped lang='less'>
.detail-content {
  max-width: 1000px;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.detail-toc {
  width: 250px;
  height: 100%;
  position: relative;
}
</style>