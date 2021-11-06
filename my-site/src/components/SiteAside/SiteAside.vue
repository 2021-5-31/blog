<template>
  <div class="site-aside">
      <Avatar :width='100' :height='100' 
      :url='data.avatar?data.avatar:""' />
      <h1>{{data.siteTitle}}</h1>
      <Menu />
      <Contact />
  </div>
</template>

<script>
import Avatar from '@/components/Avatar/Avatar';
import Menu from '@/components/Menu/Menu';
import Contact from '@/components/Contact/Contact';
import {mapState} from 'vuex'
export default {
    components:{
        Avatar,
        Menu,
        Contact
    },
    computed:mapState('setting',['data']),
}
</script>

<style lang='less' scoped>
.contact-container{
    margin-top: 140px;
}
h1{
    color: #B2BABB;
    font-size: 20px;
    text-align: center;
}
</style>