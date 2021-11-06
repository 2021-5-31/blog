<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" class="aboutme" :disabled='isDisabled'>
      <el-form-item label="简历地址" >
        <el-input v-model="form.url" width = '400px'></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" size='mini' class='btn' @click="edit" v-if="isDisabled">编辑</el-button>
    <el-button type="primary" size='mini' class='btn' @click="confirm" v-if="!isDisabled">确认</el-button>
  <el-button type="primary" size='mini' class='btn' @click="cancel" v-if="!isDisabled">取消</el-button>
  </div>
</template>

<script>
import {setAbout,getAbout} from '@/api/about';
export default {
  data(){
    return{
      form:{
        url:''
      },
      isDisabled:true,
      tempUrl:'',
    }
  },
  created(){
    this.fetchData();
  },
  methods:{
    fetchData(){
      getAbout().then(res=>{
        if(typeof res === 'string'){
          return
        }
        this.form.url = res.data;
      })
    },
    edit(){
      this.isDisabled = false;
      this.tempUrl = this.form.url
    },
    confirm(){
      setAbout({url:this.form.url}).then(()=>{
         this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
        this.fetchData();
        this.isDisabled = true;
      })
    },
    cancel(){
      this.form.url = this.tempUrl;
      this.isDisabled = true;
    }
  }
};
</script>

<style scope>
.aboutme{
  width: 400px;
}
.btn{
  margin-left: 80px;
}
</style>