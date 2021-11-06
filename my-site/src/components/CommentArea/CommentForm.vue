<template>
  <form action="" @submit.prevent="handleSubmit" ref="formContainer">
    <div class="comment-form">
      <div class="nickname">
        <input
          type="text"
          placeholder="用户昵称"
          maxlength="10"
          v-model="formData.nickname"
          @input="handleInput"
        />
        <span>{{ formData.nickname.length }}/10</span>
      </div>
      <div class="nickname-error">{{ error.nickname }}</div>
      <div class="comment-content">
        <textarea
          name=""
          id=""
          cols="70"
          rows="10"
          placeholder="输入内容"
          maxlength="300"
          v-model="formData.content"
          @input="handleTextArea"
        ></textarea>
        <span>{{ formData.content.length }}/300</span>
      </div>
      <div class="content-error">{{ error.content }}</div>
      <div class="btn">
        <button :disabled="isSubmiting">
          {{ isSubmiting ? "正在提交中" : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmiting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.error.nickname = this.formData.nickname ? "" : "请输入昵称";
      this.error.content = this.formData.content ? "" : "请输入内容";
      if (this.formData.nickname && this.formData.content) {
        this.isSubmiting = true;
        this.$emit("submit", this.formData, (content) => {
          this.$showTip(
            this.$refs.formContainer,
            "success",
            content,
            1000,
            () => {
              this.formData.nickname = "";
              this.formData.content = "";
              this.isSubmiting = false;
            }
          );
        });
      }
    },
    handleInput() {
      this.error.nickname = "";
    },
    handleTextArea() {
      this.error.content = "";
    },
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/mixd.less";
.comment-form {
    color:#34495e;
  //   .center();
  margin-bottom: 20px;
  .nickname {
    margin: 10px 0;
    position: relative;
    width: 300px;
    input {
      border: 1px dashed;
      width: 100%;
      height: 40px;
      padding-left: 10px;
      border-radius: 5px;
      outline: none;
      box-sizing: border-box;
      &:focus {
        border: 1px dashed brown;
      }
    }
    span {
      color: rgb(141, 139, 139);
      position: absolute;
      right: 2px;
      bottom: 0px;
      font-size: 14px;
    }
  }
  .comment-content {
    margin: 10px 0;
    width: 800px;
    position: relative;
    textarea {
      border-radius: 5px;
      border: 1px dashed;
      outline: none;
      padding: 10px;
      resize: none;
      width: 100%;
      box-sizing: border-box;
      &:focus {
        border: 1px dashed brown;
      }
      &::placeholder {
        font-size: 15px;
      }
    }
    span {
      color: rgb(141, 139, 139);
      position: absolute;
      right: 2px;
      bottom: 4px;
      font-size: 14px;
    }
  }
  .btn {
    button {
      padding: 6px 24px;
      border-radius: 5px;
      border: none;
      background: #3498db;
      color: #fff;
      cursor: pointer;
      margin-top: 10px;
      &:disabled {
        cursor: default;
        background: #3498db;
        opacity: 0.5;
      }
    }
  }
  .nickname-error,
  .content-error {
    font-size: 12px;
    margin-left: 10px;
    color: #e74c3c;
    width: 100px;
    height: 20px;
  }
}
</style>