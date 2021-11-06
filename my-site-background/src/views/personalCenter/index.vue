<template>
  <div class="app-container">
    <div class="changePwdWrapper">
        <div class="title">修改密码</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="ruleForm"
        label-position='left'
      >
        <el-form-item label="旧密码" prop="oldLoginPwd">
          <el-input
            type="password"
            v-model="ruleForm.oldLoginPwd"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="loginPwd">
          <el-input
            type="password"
            v-model="ruleForm.loginPwd"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkLoginPwd">
          <el-input
            type="password"
            v-model="ruleForm.checkLoginPwd"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { changeLoginPwd } from "@/api/user";
export default {
  data() {
    const validateOldLoginPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };
    const validateLoginPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (value.toString().length < 3) {
        callback(new Error("新密码不能少于3个字符"));
      } else {
        callback();
      }
    };
    const validateCheckLoginPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.ruleForm.loginPwd) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: { oldLoginPwd: "", loginPwd: "", checkLoginPwd: "" },
      rules: {
        oldLoginPwd: [{ validator: validateOldLoginPwd, trigger: "blur" }],
        loginPwd: [{ validator: validateLoginPwd, trigger: "blur" }],
        checkLoginPwd: [{ validator: validateCheckLoginPwd, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changeLoginPwd(this.ruleForm).then((res) => {
            if (typeof res === "string") {
              res = JSON.parse(res);
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
              });
            } else {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scope>
.ruleForm {
  width: 400px;
}
.changePwdWrapper{
    width: 400px;
    margin: auto;
}
.title{
margin: 30px 0;
color: #606266;
}
</style>