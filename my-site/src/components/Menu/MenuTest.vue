<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./Menu";
export default {
  components: {
    Menu,
  },
};
</script>

<style>
.test-container{
    width: 200px;
    height: 250px;
    background: #000;
}
</style>