<template>
  <div class="app-container">
    <el-form label-position="left" label-width="100px" :disabled='isDisabled' class="form">
      <el-form-item label="博客名称">
        <el-input v-model="form.siteTitle"></el-input>
      </el-form-item>
      <el-form-item label="博客头像">
        <Upload imgTitle="as" v-model="form.avatar" />
      </el-form-item>
      <el-form-item label="网站图标">
        <Upload imgTitle="as" v-model="form.favicon" />
      </el-form-item>
      <el-form-item label="GitHub名称">
        <el-input v-model="form.githubName"></el-input>
      </el-form-item>
      <el-form-item label="GitHub地址">
        <el-input v-model="form.github"></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>
      <el-form-item label="QQ二维码">
        <Upload imgTitle="as" v-model="form.qqQrCode" />
      </el-form-item>
      <el-form-item label="微信">
        <el-input v-model="form.weixin"></el-input>
      </el-form-item>
      <el-form-item label="微信二维码">
        <Upload imgTitle="as" v-model="form.weixinQrCode" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mail"></el-input>
      </el-form-item>
      <el-form-item label="备案号">
        <el-input v-model="form.icp"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" v-if="isDisabled" @click="edit">修改信息</el-button>
    <el-button type="primary" v-if="!isDisabled" @click="editComfirm">确认修改</el-button>
    <el-button v-if="!isDisabled" @click="cancel">取消</el-button>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
import { getSetting, editSetting } from "@/api/setting";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {},
      isDisabled:true,
      tempForm:{},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getSetting().then((res) => {
        this.form = res.data;
      });
    },
    edit(){
      this.isDisabled = false;
      this.tempForm = {...this.form};
    },
    editComfirm(){
      editSetting(this.form).then((res)=>{
        console.log(res);
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
      this.form = {...this.tempForm};
      this.isDisabled = true;
    }
  },
};
</script>

<style scope>
.form{
  width: 400px;
}
</style>