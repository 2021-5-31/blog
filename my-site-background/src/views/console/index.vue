<template>
  <div class="app-container">
    <div class="echartsWrapper">
      <ECharts :option="option1" class="bar" />
      <ECharts :option="option2" class="pie" />
      <div class="scanNumber">
        <h3>文章访问总量：{{scanTotalNumber}}</h3>
        <i class="iconfont icon-fangwenliang"></i>
      </div>
      <div class="comment">
        <h3>评论总量：{{commentTotalNumber}}</h3>
        <h3>留言总量：{{messageTotalNumber}}</h3>
        <i class="iconfont icon-pinglun1"></i>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import { use } from "echarts/core";
import { randomColor } from "@/utils/randomColor";
import { getBlogType } from "@/api/blogType";
import { getBlogs } from "@/api/blog";
import { getProject } from "@/api/project";
import { getComments } from "@/api/comment";
import { getMessages } from "@/api/message";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
]);
export default {
  components: {
    ECharts,
  },
  data() {
    return {
      scanTotalNumber:0,
      commentTotalNumber:0,
      messageTotalNumber:0,
      option1: {
        title: {
          text: "博客文章数量",
          textStyle: {
            fontSize: 14,
          },
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            data: [],
            label: { show: true, position: "top" },
          },
        ],
      },
      option2: {
        tooltip: {},
        legend: {
          orient: "horizontal",
          left: "center",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 15,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  async created() {
    getBlogType().then((res) => {
      res.data.forEach((item) => {
        this.option1.xAxis.data.push(item.name);
        this.option1.series[0].data.push({
          value: item.articleCount,
          itemStyle: {
            color: randomColor(),
          },
        });
      });
    });
    const blogs = await getBlogs(1,100**2);
    const comments = await getComments({page:1,limit:100**2});
    const project = await getProject();
    const messages = await getMessages({page:1,limit:100**2});
    blogs.data.rows.forEach(item=>{
      this.scanTotalNumber +=item.scanNumber;
    })
    this.commentTotalNumber = comments.data.total;
    this.messageTotalNumber = messages.data.total;
    this.option2.series[0].data = [
      {value:blogs.data.total,name:'文章'},
      {value:comments.data.total,name:'评论'},
      {value:project.data.length,name:'项目'},
      {value:messages.data.total,name:'留言'},
    ]
  },
  
};
</script>

<style scope >
@import "//at.alicdn.com/t/font_2500346_juzxxnty97h.css";
.echartsWrapper{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.bar {
  width: 350px;
  height: 350px;
}
.pie {
  width: 550px;
  height: 350px;
}
.scanNumber{
  width: 450px;
  height: 250px;
  background: #58D68D;
  border-radius: 30px;
  color: #fff;
  margin-top: 30px;
  box-shadow: inset 0px 1px 12px 4px;
  transition: .5s;
}
.scanNumber:hover{
  transform: scale(1.1);
  transition: .5s;
  box-shadow: inset 0px 1px 12px 4px,2px 3px 3px 0px rgba(0,0,0,.4);
}
.scanNumber h3{
  margin: 30px;
}
.scanNumber i{
  display: block;
  margin: 20px 150px;
  font-size: 120px;
  opacity: .5;
}
.comment{
  width: 450px;
  height: 250px;
  background: #EB984E;
  border-radius: 30px;
  color: #fff;
  margin-top: 30px;
  box-shadow: inset 0px 1px 12px 4px;
  transition: .5s;
}
.comment h3{
  margin: 30px;
  display: inline-block;
}
.comment:hover{
  transform: scale(1.1);
  transition: .5s;
  box-shadow: inset 0px 1px 12px 4px,2px 3px 3px 0px rgba(0,0,0,.4);
}
.comment i{
  display: block;
  margin: 0px 150px;
  font-size: 120px;
  opacity: .5;
}
</style>