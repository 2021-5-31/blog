<template>
  <div class="top" @click="handleClick" v-show="$store.state.top.scrollTop">Top</div>
</template>

<script>
export default {
  created() {
    this.$bus.$on("scrollEvent", this.showTop);
  },
  destroyed() {
    this.$bus.$off("scrollEvent", this.showTop);
  },
  computed:{
    
  },
  methods: {
    handleClick() {
      this.$bus.$emit("clickToTop", 0);
    },
    showTop(dom) {
      if (dom.scrollTop >= 300) {
        this.$store.state.top.scrollTop = true;
      } else {
        this.$store.state.top.scrollTop = false;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.top {
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 100px;
  right: 100px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  background: #2980b9;
  cursor: pointer;
  user-select: none;
}
</style>