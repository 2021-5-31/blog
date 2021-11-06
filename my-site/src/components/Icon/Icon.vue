<template>
  <i class="iconfont" :class="classSwitch"> </i>
</template>

<script>
const classMap = {
  home: "icon-geren1",
  aboutme: "icon-guanyuwomen",
  message: "icon-pinglun",
  article: "icon-ai-article",
  empty:'icon-wushuju',
  qq:'icon-qq',
  project:'icon-02',
  wechat:'icon-weixin',
  mail:'icon-youjian',
  github:'icon-github',
  success:'icon-chenggong',
  info:'icon-tishi',
  warn:'icon-gaojing',
  error:'icon-cuowu',
  arrowUp:'icon-jiantoushang',
  arrowDown:'icon-jiantouxia',
};
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    classSwitch() {
      return classMap[this.type];
    },
  },
};
</script>

<style>
@import "//at.alicdn.com/t/font_2500346_juzxxnty97h.css";

</style>