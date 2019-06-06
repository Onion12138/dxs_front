<template>
  <div class="chart-region">
    <div class="title">当年应届生毕业后工作的公司分布</div>
    <ve-pie :data="chartData" :legend-visible="false" :settings="chartSetting"></ve-pie>
  </div>
</template>

<script>
  import VePie from 'v-charts/lib/pie'
  export default{
    data () {
      this.chartSetting = {

      }
      return {
        chartData: {
          columns: ['company', 'sum'],
          rows: [
            { 'company': '阿里巴巴', 'sum': 12},
            { 'company': '百度', 'sum': 22},
            { 'company': '腾讯', 'sum': 8},
            { 'company': '京东', 'sum': 19},
            { 'company': '携程', 'sum': 12},
            { 'company': '微软', 'sum': 3},
            { 'company': '拼多多', 'sum': 21},
            { 'company': '其他', 'sum': 71}
          ]
        }
      }
    },
    components: { VePie }
  }
</script>

<style scoped>
  .title{
    font-size: 20px;
    text-align: center;
  }
  .chart-region {
    height:60rem;
    align-items: center;
  }
</style>
