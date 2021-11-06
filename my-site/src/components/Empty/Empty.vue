<template>
  <div class="empty-container">
    <Icon type="empty"/>
    <span>{{ text }}</span>
  </div>
</template>

<script>
import Icon from '../Icon/Icon'
export default {
    components:{
        Icon,
    },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style lang='less' scoped>
@import '~@/styles/mixd.less';
.empty-container{
    text-align: center;
    .center();
    .iconfont{
        font-size: 250px;
        color: rgb(160, 157, 157);
    }
    span{
        display: block;
    }
}


</style>