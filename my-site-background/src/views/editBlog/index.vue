<template>
  <div class="app-container">
    <div class="title">文章标题</div>
    <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    <div class="title">文章描述</div>
    <el-input
      v-model="form.description"
      placeholder="请输入文章描述"
      type="textarea"
      rows="5"
    ></el-input>
    <div class="title">文章头像</div>
    <Upload imgTitle="as" v-model="form.thumb" />
    <div class="title">文章编辑</div>
    <Editor
      :initialValue="form.editorText"
      :options="{}"
      height="500px"
      initialEditType="markdown"
      previewStyle="vertical"
      ref="toastuiEditor"
    />
    <div class="title">文章分类</div>
    <el-select
      v-model="form.select"
      placeholder="请选择分类"
      clearable
      @change="getCategoryId"
    >
      <el-option
        v-for="item in blogTypeInfo"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-row>
      <el-button type="primary" class="editBlogBtn" @click="editConfirm"
        >确认修改</el-button
      >
    </el-row>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import { getBlogType } from "@/api/blogType";
import { editBlog,getOneBlog } from "@/api/blog";
export default {
  components: {
    Editor,
    Upload,
  },
  data() {
    return {
      form: {
        title: "",
        editorText: "",
        description: "",
        thumb: "",
        select: "",
        blogId:'',
        categoryId:'',
      },
      blogTypeInfo: [],
      value: "",
      blogInfo:{}
    };
  },
  created() {
    this.form.blogId = this.$route.params.id;
    getOneBlog(this.form.blogId).then(res=>{
      this.blogInfo = res.data;
      this.form.title = this.blogInfo.title;
      this.form.description = this.blogInfo.description;
      this.form.editorText = this.$refs.toastuiEditor.invoke("setHTML",this.blogInfo.htmlContent);
      this.form.thumb = this.blogInfo.thumb;
      this.form.select = this.blogInfo.category===null?'':this.blogInfo.category.name;
      this.form.categoryId = this.blogInfo.category===null?'':this.blogInfo.category.id;
      this.form.title = this.blogInfo.title;
    })
    getBlogType().then((res) => {
      this.blogTypeInfo = res.data;
    });
  },
  methods: {
    getCategoryId(id) {
      this.form.categoryId = id;
    },
    editConfirm() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      const blogInfo = {
        title: this.form.title,
        description: this.form.description,
        createDate: Date.now(),
        categoryId: this.form.categoryId,
        toc: [],
        htmlContent: html,
        markdownContent: markdown,
        thumb: this.form.thumb,
      };
      const {title,description,htmlContent,categoryId} = blogInfo;
      if(title && description && htmlContent && categoryId){
        editBlog(this.form.blogId,blogInfo).then((res) => {
        this.$router.push({ name: "BlogList" });
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