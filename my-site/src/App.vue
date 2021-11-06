<template>
  <div id="app">
    <Layout>
      <template v-slot:left>
        <div class="left">
          <SiteAside />
        </div>
      </template>
      <div class="main">
        <router-view></router-view>
      </div>
    </Layout>
    <Top />
  </div>
</template>

<script>
import Layout from './components/Layout/Layout';
import SiteAside from '@/components/SiteAside/SiteAside';
import Top from '@/components/Top/Top';
export default {
  components:{
    Layout,
    SiteAside,
    Top,
  }
}
</script>

<style scoped>
/* :root{
  height: 100%;
} */
body{
  margin:0;
  /* height: 100%; */
}
#app{
  height: 100%;
  width: 100%;
  position: fixed;
}
.left{
  width: 200px;
  height: 100%;
  background: #000;
}
.main{
  width: 100%;
  height: 100%;
}
.right{
  width: 100px;
  height: 100%;
}
.menu-container{
  margin-top: 100px;
}
.contact-container{
  margin-top: 100px;
}
</style>