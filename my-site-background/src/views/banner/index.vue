<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index +1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" min-width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片预览" min-width="180" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">
              <el-row>中图</el-row>
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.midImg"
                fit="fill"
                 :preview-src-list="[scope.row.midImg]">
              ></el-image>
            </el-col>
            <el-col :span="12">
              <el-row>大图</el-row>
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.bigImg"
                fit="fill"
                 :preview-src-list="[scope.row.bigImg]"
              ></el-image>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showDialog(scope)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">中图 <Upload v-model="form.midImg" /></el-col>
          <el-col :span="12">大图 <Upload v-model="form.bigImg" /></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
import {getBanner,setBanner} from '@/api/banner';
export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [],
      form: {},
      dialogFormVisible: false,
    };
  },
  async created(){
      const res = await getBanner();
      this.data = res.data;
  },
  methods: {
    showDialog(getBannerInfo) {
      this.dialogFormVisible = true;
      this.form = { ...getBannerInfo.row };
    },
    editConfirm() {
      this.data.forEach((item, index) => {
        if (item.id === this.form.id) {
          this.data[index] = this.form;
        }
      });
    setBanner(this.data).then(res=>{
        this.dialogFormVisible = false;
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
        this.data = res.data;
    }).catch(err=>{
        this.$message({
          showClose: true,
          message: err,
          type: 'error'
        });
    })
    },
  },
};
</script>

<style>
</style>