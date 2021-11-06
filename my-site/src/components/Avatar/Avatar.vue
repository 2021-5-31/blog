<template>
  <div class="avatar">
    <img :src="url" :style="{ width: width + 'px', height: height + 'px' }" />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
};
</script>

<style scoped lang='less'>
.avatar {
  padding: 10px 0;
  text-align: center;
  img{
      border-radius: 50%;
  }
}
</style>