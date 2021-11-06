<template>
  <div class="blog-list-container" v-loading="isLoading" ref="container">
    <ul v-if="data.total">
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <router-link
            :to="{
              name: 'detail',
              params: {
                id: item.id,
              },
            }"
            ><img v-lazy="item.thumb" :alt="item.title" :title="item.title"
          /></router-link>
        </div>
        <div class="main">
          <router-link
            :to="{
              name: 'detail',
              params: {
                id: item.id,
              },
            }"
            ><h2>{{ item.title }}</h2></router-link
          >
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <router-link
              :to="{
                name: 'categoryId',
                params: {
                  categoryId: item.category.id,
                },
              }"
              >文章分类：{{ item.category.name }}</router-link
            >
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <div v-else-if="data.total==0" class="icon-wrapper">
      <Icon type="empty" class="icon"/>
      <p>无数据</p>
      </div>

    <Pager
      :current="getRoute.page"
      :limit="getRoute.limit"
      :visibleNumber="7"
      :total="data.total"
      @pageChange="handlePageChange"
      v-if="data.total"
    />
  </div>
</template>

<script>
import * as apiBlog from "@/API/blog";
import mixin from "@/mixins/mixin";
import Pager from "@/components/Pager/Pager";
import { formatDate } from "@/utils/formatDate";
import Icon from "@/components/Icon/Icon";
export default {
  components: {
    Pager,
    Icon,
  },
  mixins: [mixin({})],
  mounted() {
    this.$bus.$on("clickToTop", this.handleClick);
    this.$refs.container.addEventListener("scroll", this.handleScroll);
  },
  beforedestroyed() {
    this.$bus.$off("clickToTop", this.handleClick);
    this.$refs.container.removeEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    this.$store.state.top.scrollTop = false;
  },
  computed: {
    getRoute() {
      const categoryId = this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },

  methods: {
    formatDate,
    async getRemoteData(){
      return await apiBlog.getBlogs(
      this.getRoute.page,
      this.getRoute.limit,
      this.getRoute.categoryId
    );
    },
    handlePageChange(newPage) {
      if (this.getRoute.categoryId === -1) {
        this.$router.push({
          name: "blog",
          query: {
            page: newPage,
            limit: this.getRoute.limit,
          },
        });
      } else {
        this.$router.push({
          name: "categoryId",
          query: {
            page: newPage,
            limit: this.getRoute.limit,
          },
          params: {
            categoryId: this.getRoute.categoryId,
          },
        });
      }
    },
    handleClick(scrollTop) {
      if (!this.$refs.container) {
        return;
      }
      this.$refs.container.scrollTop = scrollTop;
    },
    handleScroll() {
      this.$bus.$emit("scrollEvent", this.$refs.container);
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.data = await this.getRemoteData();
      this.$refs.container.scrollTop = 0;
      this.isLoading = false;
    },
  },
};
</script>

<style lang='less' scoped>
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  position: relative;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .icon-wrapper{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    .icon{
      font-size: 200px;
      color: #D98880;
    }
    p{
      position: relative;
      top: -60px;
      color: #D98880;
    }
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid rgb(90, 90, 90);
  cursor:auto;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: rgb(90, 90, 90);
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>