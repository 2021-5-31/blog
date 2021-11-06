<template>
  <div class="comment-display">
    <ul>
      <li v-for="item in list" :key="item.id">
        <Avatar :url="item.avatar" :width="50" :height="50" />
        <div class="content">
          <span class="nickname">{{ item.nickname }}</span>
          <p>
            {{ item.content }}
          </p>
        </div>
        <span class="date">{{ formatDate(item.createDate) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar/Avatar";
import { formatDate } from "@/utils/formatDate";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newList: [],
    };
  },
  components: {
    Avatar,
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang='less'>
.comment-display {
  color: #34495e;
  margin-top: 10px;
  ul {
    padding: 0;
    li {
      display: flex;
      width: 800px;
      position: relative;
      padding: 10px 0;
      border-bottom: 1px solid #d5d8dc;
      .content {
        margin-left: 10px;
        .nickname {
          color: #b7950b;
        }
        p {
          font-size: 14px;
          word-break: break-all;
        }
      }
      .date {
        position: absolute;
        top: 10px;
        right: 0;
        font-size: 12px;
      }
    }
  }
}
</style>