<template>
  <div class="message-container" v-loading='data.total?false:true'>
    <CommentArea 
      class="comment-area"
      title="留言板"
      :subTitle="`(${data.total}条)`"
      :list="data.rows"
      :isListLoading="isLoading"
      :hasData='hasData'
      @submit="handleSubmit"
      @clickToReload="handleClickToReload"
    />
  </div>
</template>

<script>
import CommentArea from "@/components/CommentArea/CommentArea";
import mixin from "@/mixins/mixin";
import { getMessage, postMessage } from "@/API/message";
export default {
  components: {
    CommentArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      hasData:true,
    };
  },
  mixins: [mixin({total:0})],
  methods: {
    async getRemoteData() {
      return await getMessage(this.page, this.limit);
    },
    async handleSubmit(formData,callback) {
      const res = await postMessage({
        nickname: formData.nickname,
        content: formData.content,
      });
      callback('感谢您的评论！');
      this.data.total++;
      this.data.rows.unshift(res)
    },
    async handleClickToReload(){
      if(!this.hasData){
        return
      }
      this.page++;
      this.isLoading = true;
      const res = await this.getRemoteData();
      this.data.rows = this.data.rows.concat(res.rows)
      this.isLoading = false;
      if(this.data.rows.length >= this.data.total){
        this.hasData = false
      }
    }
  },
};
</script>

<style scoped lang='less'>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  position: relative;
  .comment-area {
    width: 800px;
    height: 100%;
    margin: 40px auto 0;
    position: relative;
  }
}
</style>