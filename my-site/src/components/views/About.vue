<template >
  <div class="about-container" v-loading="loading">
    <iframe :src="data" frameborder="0" width='100%' height="100%"></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("about/getRemoteData");
  },
  computed: mapState("about", ["data", "loading"]),
};
</script>

<style scoped lang='less'>
.about-container {
  position: relative;
  width: 100%;
  height: 100%;
  .wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>