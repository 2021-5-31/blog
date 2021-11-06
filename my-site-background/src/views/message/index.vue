<template>
  <div class="app-container">
    <el-table
      :data="data.rows"
      style="width: 100%"
      border
      v-loading="loading"
      v-if="data.rows"
    >
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.$index + 1 + (currentPage - 1) * pageSize
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="留言昵称" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="留言内容" min-width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" min-width="120" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预览图" width="100" align="center">
        <template slot-scope="scope">
          <el-image
            :preview-src-list="[scope.row.avatar]"
            :src="scope.row.avatar"
            fit="fit"
            style="width: 30px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delMessage(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next,total,sizes,jumper"
        :total="data.total"
        :page-size="pageSize"
        :page-sizes="sizeArr"
        :current-page="currentPage"
        @prev-click="prev"
        @next-click="next"
        @current-change="pageChange"
        @size-change="sizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { addMessage, getMessages, deleteMessage } from "@/api/message";
import { formatDate } from "@/utils/formatDate";
export default {
  data() {
    return {
      data: {},
      loading: false,
      currentPage: 1,
      pageSize: 5,
      totalPage: 0,
      sizeArr: [5, 10, 20],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      getMessages({ page: this.currentPage, limit: this.pageSize }).then(
        (res) => {
          this.data = res.data;
          this.totalPage = Math.ceil(this.data.total / this.pageSize);
          if (this.currentPage > this.totalPage) {
            this.currentPage = this.totalPage;
            this.fetchData();
          }
          this.data.rows.forEach((item, index) => {
            this.data.rows[index].createDate = formatDate(item.createDate);
          });
          this.loading = false;
        }
      );
    },
    prev() {
      this.currentPage -= 1;
    },
    next() {
      this.currentPage += 1;
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.fetchData();
    },
    delMessage(commentId) {
      this.$confirm("删除该留言, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          deleteMessage(commentId).then((res) => {
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
    q() {
      addMessage({
        nickname: "留言测试8",
        content: "留言内容测试8",
      }).then(res=>{console.log(res);});
    },
  },
};
</script>

<style scope>
.page {
  margin: 20px 0;
}
</style>