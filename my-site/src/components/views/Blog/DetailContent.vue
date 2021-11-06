<template>
  <div class="detail-content-container">
    <h1>{{ data.title }}</h1>
    <div class="aside">
      <span>日期：{{ data.createDate }}</span>
      <span>浏览：{{ data.scanNumber }} </span>
      <a href="#comment-area">评论： {{ data.commentNumber }}</a>
      <router-link
        :to="{
          name: 'categoryId',
          params: {
            categoryId: data.category.id,
          },
        }"
        >文章分类：{{ data.category.name }}</router-link
      >
    </div>
    <div v-html="data.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
};
</script>

<style scoped lang='less'>
.detail-content-container {
  color: black;
  margin-left: 10px;
  li {
    list-style: decimal inside;
  }
  .aside {
    a,
    span {
      margin: 0 5px;
    }
  }
  .markdown-body {
    margin-top: 30px;
  }
}
</style>