<template>
  <div class="carousel-container" ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="img-container" ref="img" :style="move">
      <ImageLoader :src="carousel.bigImg" :placeholder="carousel.midImg" />
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      containerSize: null,
      imgSize: null,
    };
  },
  mounted() {
    this.containerSize = {
      containerWidth: this.$refs.container.clientWidth,
      containerHeight: this.$refs.container.clientHeight,
    };
    this.imgSize = {
      imgWidth: this.$refs.img.clientWidth,
      imgHeight: this.$refs.img.clientHeight,
    };
    this.center
  },
  computed: {
    
    move() {
        if(!this.containerSize || !this.imgSize){
            return
        }
      const extraWidth = this.imgSize.imgWidth - this.containerSize.containerWidth;
      const extraHeight = this.imgSize.imgHeight - this.containerSize.containerHeight;
      const left = (-extraWidth * this.mouseX) / this.containerSize.containerWidth;
      const top = (-extraHeight * this.mouseY) / this.containerSize.containerHeight;
      return {
        transform: `translate(${left}px,${top}px)`,
      };
    },
    center(){
        this.mouseX = this.containerSize.containerWidth / 2;
        this.mouseY = this.containerSize.containerHeight / 2;
    }
  },
  methods: {
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave(){
        this.mouseX = this.containerSize.containerWidth / 2;
        this.mouseY = this.containerSize.containerHeight / 2;
    }
  },
};
</script>

<style lang='less'>
.carousel-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .img-container {
    position: absolute;
    width: 110%;
    height: 110%;
    transition: .1s;
  }
}
</style>