<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a href="#" :class="{ disable: current === 1 }" @click="handleClick(1)"
      >首页</a
    >
    <a
      href="#"
      :class="{ disable: current === 1 }"
      @click="handleClick(current - 1)"
      >上一页</a
    >
    <a
      href="#"
      v-for="(item, i) in page"
      :key="i"
      :class="{ active: item === current }"
      @click="handleClick(item)"
      >{{ item }}</a
    >
    <a
      href="#"
      :class="{ disable: current === pageNumber }"
      @click="handleClick(current + 1)"
      >下一页</a
    >
    <a
      href="#"
      :class="{ disable: current === pageNumber }"
      @click="handleClick(pageNumber)"
      >尾页</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibleNumber: {
      type: Number,
      default: 7,
    },
  },
  computed: {
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    min() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    max() {
      let max = this.visibleNumber + this.min - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    page() {
      const arr = [];
      for (let i = this.min; i <= this.max; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    handleClick(newPage) {
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage == this.current) {
        return;
      }
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
.pager-container {
  display: flex;
  justify-content: center;
  margin: 50px 0;
  a {
    margin: 0 5px;
    color: cornflowerblue;
    &.disable {
      color: gray;
      cursor: default;
    }
    &.active {
      color: orangered;
    }
  }
}
</style>