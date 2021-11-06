<template>
  <div class="test-container">
    <Pager @pageChange='handlePageChange' :current='current' :total='total'/>
  </div>
</template>

<script>
import Pager from './Pager';
import '@/styles/global.less'
export default {
  components:{
    Pager
  },
  data(){
    return {
      current:1,
      total:100,
    }
  },
  methods:{
    handlePageChange(newPage){
      this.current = newPage;
    }
  }
}
</script>

<style>

</style>