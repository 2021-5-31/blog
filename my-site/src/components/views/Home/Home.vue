<template>
  <div
    class="home-container"
    ref="divContainer"
    @wheel="handleWheel"
    v-loading="loading"
  >
    <ul :style="{ marginTop: marginTop }" @transitionend="handleTransitionEnd">
      <li v-for="item in data" :key="item.id"><Carousel :carousel="item" /></li>
    </ul>
    <div class="arrow-up" v-show="index > 0" @click="handleClick(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div
      class="arrow-down"
      v-show="index < data.length - 1"
      @click="handleClick(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <div class="indicator">
      <span
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: i === index }"
        @click="handleClick(i)"
      ></span>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon/Icon";
import Carousel from "./Carousel";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
    Carousel,
  },
  data() {
    return {
      index: 0,
      containerHeight: 0,
      isSwitch: false,
    };
  },
  async created() {
    if (this.data.length) {
      return;
    }
    await this.$store.dispatch("home/getRemoteData");
  },
  mounted() {
    this.containerHeight = this.$refs.divContainer.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("home", ["loading", "data"]),
  },
  methods: {
    async getRemoteData() {
      return await getData();
    },
    handleClick(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.isSwitch) {
        return;
      }
      if (e.deltaY > 0 && this.index < this.data.length - 1) {
        this.index++;
        this.isSwitch = true;
      }
      if (e.deltaY < 0 && this.index > 0) {
        this.index--;
        this.isSwitch = true;
      }
    },
    handleTransitionEnd() {
      this.isSwitch = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.divContainer.clientHeight;
    },
  },
};
</script>

<style scoped lang='less'>
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ul {
    width: 100%;
    height: 100%;
    transition: 0.5s;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .arrow-up,
  .arrow-down {
    position: absolute;
    left: 50%;
    cursor: pointer;
    i {
      font-size: 30px;
    }
  }
  .arrow-up {
    top: 0;
    transform: translate(-50%, 15px);
  }
  .arrow-down {
    bottom: 0;
    transform: translate(-50%, -15px);
  }
  .indicator {
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate(-50px, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      width: 10px;
      height: 10px;
      background: #000;
      border: 1px solid #fff;
      border-radius: 50%;
      margin: 5px 0;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>