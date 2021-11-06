<template>
  <div class="menu-container">
    <ul>
      <li v-for="item in arr" :key="item.icon">
        <!-- <a :href="item.link">
          <i>
            <Icon :type="item.icon" />
          </i>
          <span>{{ item.title }}</span>
        </a> -->
        <router-link :to='item.link' :exact='item.exact' active-class="active">
          <i>
            <Icon :type="item.icon" />
          </i>
          <span>{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "@/components/Icon/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      arr: [
        {
          icon: "home",
          title: "首页",
          link: "/",
          exact: true,
        },
        {
          icon: "article",
          title: "文章",
          link: "/blog",
          exact: false,
        },
        {
          icon: "aboutme",
          title: "关于我",
          link: "/about",
          exact: true,
        },
        {
          icon: "project",
          title: "项目&效果",
          link: "/project",
          exact: true,
        },
        {
          icon: "message",
          title: "留言板",
          link: "/message",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/global.less";
.menu-container {
  margin: 10px 0;
  li {
    width: 100%;
    a {
      color: rgb(151, 148, 148);
      display: block;
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      &:hover {
        color: #fff;
      }
      i {
        display: inline-block;
        margin-right: 5px;
      }
      &.active {
        background: rgb(78, 78, 78);
      }
    }
  }
}
</style>