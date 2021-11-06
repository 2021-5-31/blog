<template>
  <div class="test-container">
    <Empty />
  </div>
</template>

<script>
import Empty from './Empty';
export default {
  components:{
    Empty
  }
}
</script>

<style>
.test-container{
  position: relative;
  width: 500px;
  height: 500px;
}
</style>