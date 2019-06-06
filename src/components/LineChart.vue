<template>
  <div>
    <div class="title">近五年平均薪资</div>
    <div class="chart-region">
      <ve-line :data="chartData" :legend-visible="false" :settings="chartSetting"></ve-line>
    </div>
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line'
  export default{
    data () {
      this.chartSetting = {
        min: [8000],
        max: [16000]
      }
      return {
        chartData: {
          columns: ['year', 'salary'],
          rows: [
            { 'year': '2015', 'salary': 11393},
            { 'year': '2016', 'salary': 12530},
            { 'year': '2017', 'salary': 13923},
            { 'year': '2018', 'salary': 15323},
            { 'year': '2019', 'salary': 14592}
          ]
        }
      }
    },
    components: { VeLine }
  }
</script>

<style scoped>
  .title{
    font-size: 20px;
    text-align: center;
  }
  .chart-region {
    width: 40rem;
    height: 35rem;
    margin-left: 18rem
  }
</style>
