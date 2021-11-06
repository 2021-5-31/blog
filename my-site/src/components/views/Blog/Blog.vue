<template>
  <div class="blog-container">
    <Layout>
      <BlogList />
      <template v-slot:right>
        <BlogCategory />
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout/Layout";
import BlogList from '@/components/views/Blog/BlogList';
import BlogCategory from '@/components/views/Blog/BlogCategory';
export default {
  components:{
    Layout,
    BlogCategory,
    BlogList
  },
  methods:{

  }
};
</script>

<style scoped lang='less'>
.blog-container{
  width: 100%;
  height: 100%;
}
</style>