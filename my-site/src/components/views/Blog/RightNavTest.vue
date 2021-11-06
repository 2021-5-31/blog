<template>
  <div class="test-container">
    <RightNav :list="list" @select="handleClick"/>
  </div>
</template>

<script>
import RightNav from "./RightNav";
export default {
  components: {
    RightNav,
  },
  data() {
    return {
      list: [
        { name: "a", children: [], isSelect: false },
        { name: "b", children: [], isSelect: false },
        {
          name: "c",
          children: [
            { name: "c2-1", children: [], isSelect: false },
            {
              name: "c2-2",
              children: 
              [{ name: "c3-1", children: [], isSelect: false }],
              isSelect: false,
            },
          ],
          isSelect: true,
        },
        { name: "b", children: [], isSelect: false },
      ],

    };
  },
  methods:{
    handleClick(li){
      console.log(li);
    }
  }
};
</script>

<style>
</style>