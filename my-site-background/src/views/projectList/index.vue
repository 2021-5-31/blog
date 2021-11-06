<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border v-loading="loading">
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" min-width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目描述" min-width="180" align="center">
        <template slot-scope="scope">
          <el-table
            ref="singleTable"
            :data="scope.row.description"
            style="width: 100%"
            :show-header="false"
            border
          >
            <el-table-column type="index" width="50" align="center">
            </el-table-column>

            <el-table-column>
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="项目地址" min-width="150" align="center">
        <template slot-scope="scope">
          <a href="#" target="_blank" class="jumpToUrl" @click.prevent="jumpToUrl(scope.row.url)">{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column label="GitHub地址" min-width="150" align="center">
        <template slot-scope="scope">
          <a href="#" target="_blank" class="jumpToUrl" @click.prevent="jumpToUrl(scope.row.github)">{{ scope.row.github }}</a>
        </template>
      </el-table-column>
      <el-table-column label="预览图" width="100" align="center">
        <template slot-scope="scope">
           <el-image
      :preview-src-list="[scope.row.thumb]"
      :src="scope.row.thumb"
      fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="openEditDialog(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delProject(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改项目信息" :visible.sync="dialogFormVisible" fullscreen>
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
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editConfirm">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getProject,deleteProject,editProject } from "@/api/project";
import Upload from "@/components/Upload/index";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [],
      loading: false,
      dialogFormVisible:false,
      form:{},
      projectInfo:{},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      getProject().then((res) => {
        this.data = res.data;
        this.data.description = res.data.description;
        this.loading = false;
      });
    },
    jumpToUrl(url){
    window.open(url)
  },
  openEditDialog(projectInfo){
    this.dialogFormVisible = true;
    this.form = {...projectInfo};
    this.form.description = projectInfo.description.join(',');
  },
  editConfirm(){
    this.projectInfo = {...this.form};
    this.projectInfo.description = this.projectInfo.description.split(',');
    this.projectInfo.order = +this.projectInfo.order;
    editProject(this.projectInfo.id,this.projectInfo).then(res=>{
      this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
        this.dialogFormVisible = false;
        this.fetchData();
    })
  },
  delProject(projectId){
    this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          deleteProject(projectId).then((res)=>{
            this.$message({
            showClose: true,
            type: 'success',
            message: '删除成功!'
          });
          this.fetchData();
          })
        }).catch(() => {});
  }
  },
};
</script>

<style scope>
.jumpToUrl:hover{
  color: #DC7633;
}
.title{
  margin: 20px 0;
}
.el-dialog__footer{
  text-align: left;
}
</style>