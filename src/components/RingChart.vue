<template>
  <div class="chart-region">
    <div class="title">当年应届生工作城市占比</div>
    <ve-ring :data="chartData" :legend-visible="false" :settings="chartSetting"></ve-ring>
  </div>
</template>

<script>
  import VeRing from 'v-charts/lib/ring'
  export default{
    data () {
      this.chartSetting = {
        radius: [60, 100]
      }
      return {
        chartData: {
          columns: ['city', 'sum'],
          rows: [
            { 'city': '上海', 'sum': 132},
            { 'city': '广州', 'sum': 22},
            { 'city': '深圳', 'sum': 8},
            { 'city': '浙江', 'sum': 9},
            { 'city': '江苏', 'sum': 12},
            { 'city': '其他', 'sum': 43},
            { 'city': '北京', 'sum': 31}
          ]
        }
      }
    },
    components: { VeRing }
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
