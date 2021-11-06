<template>
  <div class="app-container">
    <div class="addType">
      <el-input
        placeholder="请输入文章分类，左边选择分类等级"
        v-model="input"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button class="addBtn" type="primary" @click="addType">添加</el-button>
    </div>

    <el-table :data="data" style="width: 100%" border v-loading="loading" >
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index +1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章分类" min-width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章数量" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.articleCount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showDialog(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteType(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="文章分类">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类等级">
          <el-select v-model="form.order" placeholder="请选择分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBlogType,
  editBlogType,
  deleteBlogType,
  getBlogType,
} from "@/api/blogType";
export default {
  data() {
    return {
      input: "",
      select: "1",
      data: [],
      dialogFormVisible: false,
      form: {},
      loading:true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBlogType().then((res) => {
        this.data = res.data;
        this.loading = false;
      });
    },
    addType() {
      addBlogType({ name: this.input, order: this.select }).then(() => {
        this.$message({
          showClose: true,
          message: "添加成功",
          type: "success",
        });
        this.fetchData();
        this.input = "";
      });
    },
    showDialog(blogTypeInfo) {
      this.dialogFormVisible = true;
      this.form = { ...blogTypeInfo };
    },
    editConfirm() {
      const { id, name, order } = this.form;
      editBlogType(id, { name, order }).then((res) => {
        this.dialogFormVisible = false;
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
        this.fetchData();
      });
    },
    deleteType(id) {
      this.$confirm(
        "此操作将永久删除该分类并且该分类的文章会被置为‘<strong>未分类</strong>’状态, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
          dangerouslyUseHTMLString: true,
        }
      )
        .then(() => {
          deleteBlogType(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchData();
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scope>
.addType {
  width: 400px;
  display: flex;
  margin-bottom: 10px;
}
.addBtn {
  margin-left: 10px;
}
.el-message-box {
  width: 460px;
}
</style>