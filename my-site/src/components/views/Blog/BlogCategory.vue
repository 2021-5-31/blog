<template>
  <div class="blog-category" v-loading='isLoading' >
    <h3 v-if="!isLoading">文章分类</h3>
    <RightNav :list="categoryData" @select="handleSelect" v-if="!isLoading"/>
  </div>
</template>

<script>
import RightNav from "@/components/views/Blog/RightNav";
import mixin from "@/mixins/mixin";
import * as apiBlog from "@/API/blog";
export default {
  components: {
    RightNav,
  },
  mixins: [mixin([])],
  computed: {
    getCategory() {
      return this.$route.params.categoryId || -1;
    },
    categoryData() {
      const totalArticle = this.data.reduce(
        (prev, item) => prev + item.articleCount,
        0
      );
      const result = [{ name: "全部", id: -1, totalArticle,articleCount:totalArticle }, ...this.data];
      return result.map((item) => {
        return { ...item, isSelect: item.id === this.getCategory,aside:`${item.articleCount}篇`};
      });
    },
  },
  methods: {
    async getRemoteData() {
      return await apiBlog.getBlogCategroy();
    },
    async handleSelect(li) {
      if (li.id === -1) {
        this.$router.push({
          name: "blog",
        });
      } else {
        this.$router.push({
          name: "categoryId",
          params: {
            categoryId: li.id,
          },
        });
      }
    },
  },
};
</script>

<style scope>
.blog-category {
  padding: 20px 0;
  height: 100%;
  width: 220px;
  box-sizing: border-box;
  position: relative;
}
h3 {
  margin: 0 0 20px 20px;
}
li{
    cursor: pointer;
}
</style>