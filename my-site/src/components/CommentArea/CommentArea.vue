<template>
  <div class="comment-area" >
    <CommentForm v-on="$listeners" />
    <h3>{{ title }}</h3>
    <span>{{ subTitle }}</span>
    <CommentDisplay :list="list" />
    <div class="loading" v-loading="isListLoading">
      <span
        v-show="!isListLoading"
        @click="handleClick"
        :class="{ disabled: !hasData }"
        >{{ hasData ? "加载更多数据" : "没有更多数据" }}</span
      >
    </div>
  </div>
</template>

<script>
import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";
export default {
  components: {
    CommentForm,
    CommentDisplay,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
    hasData: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit("clickToReload");
    },
  },
};
</script>

<style scoped lang='less'>
@import "~@/styles/mixd.less";
.comment-area {
  color: #34495e;
  h3 {
    display: inline-block;
    margin: 10px 10px 10px 0;
  }
  .loading {
    width: 100%;
    height: 200px;
    position: relative;
    span {
      .center();
      user-select: none;
      cursor: pointer;
      &:hover {
        color: red;
      }
      &.disabled {
        cursor: default;
        color: #bdc3c7;
      }
    }
  }
}
</style>