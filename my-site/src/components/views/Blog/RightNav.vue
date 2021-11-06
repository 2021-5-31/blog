<template>
  <div class="right-nav-container" >
    <ul>
      <li
        class="right-nav-li"
        v-for="(item, i) in list"
        :key="i"
        :class="{ active: item.isSelect }"
        @click.stop="handleClick(item)"
      >
        {{ item.name }}
        <span v-if="item.aside" :class="{ active: item.isSelect }"
          >{{ item.aside }}
        </span>
        <RightNav :list="item.children" @select="handleClick"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RightNav",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(li) {
      // if (!li.isSelect) {
        this.$emit("select", li);
      // }
    },
  },
};
</script>

<style lang='less' scoped>
.right-nav-container {
  width: 200px;
  height: 100%;
  margin-left: 20px;
  ul {
    padding: 0;
    margin: 0;
    .right-nav-li {
      list-style: none;
      min-height: 40px;
      line-height: 40px;
      color: royalblue;
      span {
        color: rgb(180, 180, 178);
        &.active {
        color: red;
      }
      }
      &.active {
        color: red;
      }
    }
  }
}
</style>