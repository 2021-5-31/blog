<template>
  <div class="contact-container">
    <ul>
      <!-- <li v-for="item in arr" :key="item.way" >
              <a href="">
                  <Icon :type='item.way'/>
                  <span> {{item.content}}</span>
              </a>
          </li> -->
      <li>
        <a :href="data.github" target="_blank">
          <Icon type="github" class="icon" />
          <span> {{ data.githubName }}</span>
        </a>
      </li>
      <li>
        <a :href="`mailto:${data.mail}`">
          <Icon type="mail" />
          <span> {{ data.mail }}</span>
        </a>
      </li>
      <li>
        <a
          :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
        >
          <Icon type="qq" />
          <span> {{ data.qq }}</span>
        </a>
        <div class="qq">
            <img :src="data.qqQrCode" alt="" />
        </div>
      </li>
      <li>
        <a>
          <Icon type="wechat" class="icon" />
          <span> {{ data.weixin }}</span>
        </a>
        <div class="wechat">
          <img :src="data.weixinQrCode" alt="" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "../Icon/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      arr: [
        {
          way: "github",
          content: "duyi",
        },
        {
          way: "mail",
          content: "duyi@gmail.com",
        },
        {
          way: "qq",
          content: "11232312",
        },
        {
          way: "wechat",
          content: "wx123123",
        },
      ],
    };
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style lang='less' scoped>
li {
  list-style: none;
  color: rgb(151, 148, 148);
  height: 40px;
  line-height: 40px;
  position: relative;
  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  &:hover {
    color: #fff;
    .qq,
    .wechat {
      transform: scaleY(1);
    }
  }
}
ul {
  padding: 0;
}
.contact-container {
  margin: 10px 0;
  .icon {
    font-size: 18px;
  }
  i {
    display: inline-block;
    width: 20px;
  }
  span {
    display: inline-block;
    margin-left: 10px;
  }
  .qq,
  .wechat {
    position: absolute;
    left: 0px;
    bottom: 40px;
    transition: 0.5s;
    width: 150px;
    height: 120px;
    transform: scaleY(0);
    transform-origin: center bottom;
    padding: 10px;
    background: #fff;
    &::after {
      content: "";
      border: 10px solid transparent;
      border-top-color: #fff;
      position: absolute;
      left: 50%;
      bottom: -20px;
      transform: translateX(-50%);
      width: 0;
      height: 0px;
    }
  }
  img {
    width: 150px;
    height: 120px;
  }
}
</style>