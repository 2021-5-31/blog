<template>
  <div class="image-loader-container">
    <img
      :src="src"
      
      :style="{ opacity: originalOpacity, transition: `${duration}ms` }"
        @load="handleLoad"
    />
    <img :src="placeholder" v-if="!allDone" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 2500,
    },
  },
  data() {
    return {
      opacity: false,
      allDone: false,
    };
  },
  computed: {
    originalOpacity() {
      return this.opacity ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.opacity = true;
      setTimeout(() => {
        this.allDone = true;
      }, this.duration);
    },
  },
};
</script>

<style>
.image-loader-container img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
}
</style>