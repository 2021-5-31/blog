<template>
  <div class="app-container">
    <el-table :data="data.rows" style="width: 100%" border v-loading='loading'>
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 + (currentPage -1) * pageSizes}}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章描述" min-width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="浏览次数" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.scanNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论量" width="70" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.commentNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章分类" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.category.name=scope.row.category?scope.row.category.name:'未分类' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="120" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="jumpToEditPage(scope.row.id)"
            ></el-button>
          </el-tooltip>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delBlog(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next,total,sizes,jumper"
      :page-sizes='sizesArr'
      :total="data.total"
      :page-size="pageSizes"
      :current-page='currentPage'
      @prev-click="prev"
      @next-click="next"
      @current-change="changePage"
      @size-change='sizeChange'
    >
    </el-pagination>
  </div>
</template>

<script>
import { formatDate } from "@/utils/formatDate";
import { getBlogs, deleteBlog } from "@/api/blog";
export default {
  data() {
    return {
      data: {},
      currentPage: 1,
      pageSizes: 5,
      totalPage:0,
      loading:false,
      sizesArr:[5,10,20]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBlogs(this.currentPage, this.pageSizes).then((res) => {
        this.data = res.data;
        this.totalPage = Math.ceil(this.data.total / this.pageSizes);
        if(this.currentPage > this.totalPage){
          this.currentPage = this.totalPage;
          this.fetchData();
        }
        this.loading = false;
        if (this.data.rows) {
          this.data.rows.forEach((item, index) => {
            this.data.rows[index].createDate = formatDate(item.createDate);
          });
        }
      });
    },
    prev(prevPage) {
      this.currentPage = prevPage;
    },
    next(nxetPage) {
      this.currentPage = nxetPage;
    },
    changePage(page) {
      this.currentPage = page;
      this.loading = true;
      this.fetchData();
    },
    sizeChange(sizes){
      this.pageSizes = sizes;
      this.currentPage = 1;
      this.fetchData();
    },
    delBlog(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          deleteBlog(id).then((res) => {
            this.$message({
              showClose: true,
              type: "success",
              message: "删除成功!",
            });
            this.fetchData();
          });
        })
        .catch(() => {});
    },
    jumpToEditPage(blogId){
      this.$router.push({path:`editBlog/${blogId}`})
    }
  },
};
</script>

<style scope>
.page {
  margin: 20px 0;
}
</style>