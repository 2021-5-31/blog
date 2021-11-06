<template>
  <div class="app-container">
    <div class="title">项目名称</div>
    <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
    <div class="title">项目描述（可填写多个描述，以英文逗号分隔）</div>
    <el-input v-model="form.description" placeholder="请输入项目描述"></el-input>
    <div class="title">项目地址</div>
    <el-input v-model="form.url" placeholder="请输入项目地址"></el-input>
    <div class="title">GitHub地址</div>
    <el-input v-model="form.github" placeholder="请输入GitHub地址"></el-input>
    <div class="title">预览图</div>
    <Upload imgTitle="as" v-model="form.thumb" />
    <div class="title">项目排序</div>
    <el-select
      v-model="form.order"
      placeholder="请选择排序"
      clearable
    >
      <el-option label="1" value="1"></el-option>
      <el-option label="2" value="2"></el-option>
      <el-option label="3" value="3"></el-option>
      <el-option label="4" value="4"></el-option>
      <el-option label="5" value="5"></el-option>
    </el-select>
    <el-row>
      <el-button type="primary" class="editBlogBtn" @click="publishProject"
        >发布项目</el-button
      >
    </el-row>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
import { addProject } from "@/api/project";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        thumb: "",
        order: "",
        url:'',
        github:'',
      },
      blogTypeInfo: [],
      value: "",
    };
  },
  created() {
    
  },
  methods: {
    getCategoryId(id) {
      this.form.categoryId = id;
    },
    publishProject() {
      const projectInfo = {...this.form};
      projectInfo.description = this.form.description.split(',');
      projectInfo.order = +this.form.order;
      const {name,description,url,github,order} = projectInfo;
      if(name && description && url && github && order){
        addProject(projectInfo).then((res) => {
        this.$router.push({ name: "ProjectList" });
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
      });
      }else{
        this.$message({
          showClose: true,
          message: "除了头像，其它选项都必须填写",
          type: "warning",
        });
      }
      
    },
  },
};
</script>

<style scope>
.title {
  margin: 20px 0;
}
.editBlogBtn {
  margin: 20px 0;
}
</style>