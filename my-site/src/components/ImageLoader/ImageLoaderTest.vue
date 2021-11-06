<template>
  <div class="test-container">
      <ImageLoader 
      placeholder='https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100'
       src='https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304'
      /> 
  </div>
</template>

<script>
import ImageLoader from './ImageLoader'
export default {
    components:{
        ImageLoader,
    }
}
</script>

<style>
.test-container{
    position: relative;
    width: 500px;
    height: 400px;
}
</style>