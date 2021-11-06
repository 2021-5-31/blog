<template>
  <el-upload
    class="avatar-uploader"
    action="/api/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="headers"
  >
    <img v-if="value" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  props: ["imgTitle", "value"],
  computed: {
    imageUrl() {
      if (this.value) {
        return this.value;
      }
    },
    headers() {
      return {
        Authorization: 'Bearer ' + localStorage.getItem("authentication"),
      };
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code === 0 && res.data) {
        this.$emit("input", res.data);
      }
    },
  },
};
</script>

<style scope>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>