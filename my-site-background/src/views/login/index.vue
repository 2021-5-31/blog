<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">个人空间后台管理系统</h3>
      </div>

      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginId"
          v-model="loginForm.loginId"
          placeholder="请输入管理员账号"
          name="loginId"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="loginPwd"
          v-model="loginForm.loginPwd"
          :type="passwordType"
          placeholder="请输入密码"
          name="loginPwd"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <div class="captchaContainer">
        <el-form-item prop="captcha" class="captcha">
          <span class="svg-container">
            <svg-icon icon-class="nested" />
          </span>
          <el-input
            ref="captcha"
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            name="captcha"
            type="text"
            tabindex="3"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <div
          class="captchaImg"
          v-html="captchaImg"
          @click="refreshCaptcha"
        ></div>
      </div>
      <el-checkbox v-model="checked">7天内免登录</el-checkbox>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录
      </el-button>
    </el-form>
    <p style="text-align:center;color:red;">账号：admin 密码：1234</p>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { getCaptchaApi } from "@/api/user";
export default {
  name: "Login",
  data() {
    const validateLoginId = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入管理员账号"));
      } else {
        callback();
      }
    };
    const validateLoginPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        loginId: "",
        loginPwd: "",
        captcha: "",
      },
      loginRules: {
        loginId: [
          { required: true, trigger: "blur", validator: validateLoginId },
        ],
        loginPwd: [
          { required: true, trigger: "blur", validator: validateLoginPwd },
        ],
        captcha: [
          { required: true, trigger: "blur", validator: validateCaptcha },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      captchaImg: "",
      checked: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.loginId.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.checked) {
            this.loginForm.remember = 7;
          }
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((res) => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((err) => {
              if (typeof err === "string") {
                this.$message({
                  showClose: true,
                  message: "验证码错误",
                  type: "error",
                });
              } else if (typeof err === "object" ) {
                this.$message({
                  showClose: true,
                  message: "账号或密码错误",
                  type: "error",
                });
              } else {
                this.$message({
                  showClose: true,
                  message: err,
                  type: "error",
                });
              }
              this.loading = false;
              this.getCaptcha();
              this.loginForm.captcha = '';
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getCaptcha() {
      const res = await getCaptchaApi();
      this.captchaImg = res;
    },
    refreshCaptcha() {
      this.getCaptcha();
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .captchaContainer {
    display: flex;
    .captcha {
      width: 70%;
    }
    .captchaImg {
      width: 150px;
      height: 50px;
    }
  }
  .el-checkbox {
    margin-bottom: 5px;
  }
}
</style>
