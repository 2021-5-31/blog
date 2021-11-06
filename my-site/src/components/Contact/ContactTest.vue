<template>
  <div class="test-container">
      <Contact />
  </div>
</template>

<script>
import Contact from './Contact'
export default {
components:{
    Contact,
}
}
</script>

<style>
.test-container{
    width: 200px;
    height: 200px;
    background: #000;
    margin-top:40px ;
}
</style>