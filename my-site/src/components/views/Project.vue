<template>
  <div class="project-container" v-loading="loading" ref="container">
    <div class="project-item" v-for="item in data" :key="item.id">
      <a
        :href="
          item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
        "
        :target="item.url ? '_blank' : '_self'"
      >
        <img class="thumb" v-lazy="item.thumb" />
      </a>
      <div class="info">
        <h2>
          {{ item.name }}
        </h2>
        <a :href="item.github" target="_blank">
          <p>github：{{ item.github }}</p>
        </a>
        <p>项目描述：{{ item.description.join('；') }}</p>
        <a :href="item.url" target="_blank">
          <p>项目展示：{{ item.url }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  async created() {
    this.$store.dispatch("project/getRemoteData");
    this.$bus.$on("clickToTop", this.handleScrollToTop);
  },
  mounted() {
    this.$refs.container.addEventListener("scroll", this.handleScroll);
  },
  beforedestroyed() {
    this.$refs.container.addEventListener("scroll", this.handleScroll);
    this.$bus.$off("clickToTop", this.handleScrollToTop);
  },

  destroyed() {
    this.$store.state.top.scrollTop = false;
  },
  computed: mapState("project", ["data", "loading"]),
  methods: {
    handleScroll() {
      this.$bus.$emit("scrollEvent", this.$refs.container);
    },
    handleScrollToTop(scrollTop) {
      if (!this.$refs.container) {
        return;
      }
      this.$refs.container.scrollTop = scrollTop;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.project-item {
  transition: 0.5s;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    color: inherit;
  }
  .thumb {
    width: 250px;
    min-height: 150px;
    flex: 0 0 auto;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 15px;
  }
  img{
    width: 100%;
    height: 100%;
  }
  .info {
    line-height: 1.7;
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .github {
    font-size: 14px;
    color: @primary;
  }
}
</style>