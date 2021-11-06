<template>
  <div class="detail-toc-container" v-if="list.length">
    <h1>目录</h1>
    <RightNav :list="tocWithSelect" @select="handleClick" :class="{}" />
  </div>
</template>

<script>
import RightNav from "@/components/views/Blog/RightNav";
export default {
  components: {
    RightNav,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectAnchor: "",
      timer:null,
    };
  },
  created() {
    this.doms;
    this.$bus.$on("scrollEvent", this.debounce);
    
  },

  destroyed(){
      this.$bus.$off("scrollEvent", this.debounce);
  },
  computed: {
    tocWithSelect() {
      const newToc = (list = []) => {
        return list.map((item) => ({
            ...item,
          isSelect: item.anchor === this.selectAnchor,
          children: newToc(item.children),
          
        }));
      };
      return newToc(this.list);
    },
    doms() {
      const doms = [];
      const getDoms = (newToc) => {
        for (const dom of newToc) {
          doms.push(document.getElementById(dom.anchor));
          if (dom.children && dom.children.length) {
            getDoms(dom.children);
          }
        }
      };
      getDoms(this.list);
      return doms;
    },
  },
  methods: {
    handleClick(li) {
      location.hash = li.anchor;
    },
    setSelect() {
      this.selectAnchor = "";
      const range = 200;
      for (const dom of this.doms) {
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          this.selectAnchor = dom.id;
          return;
        } else if (top > range) {
          return;
        } else {
          this.selectAnchor = dom.id;
        }
      }
    },
    debounce(){
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.setSelect()
        },50)
    }
  },
};
</script>

<style lang='less'>
.detail-toc-container {
  h1 {
    margin-left: 5px;
  }
}
</style>