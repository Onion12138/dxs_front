<template>
  <div class="chart-region">
    <div class="title">当年应届生毕业后选择</div>
    <br>
    <button @click="changeType">切换图表类型</button>
    <vechart :data="chartData" :legend-visible="false" :settings="chartSetting"></vechart>
  </div>
</template>

<script>
  import Vechart from 'v-charts/lib/chart'
  import line from 'v-charts/lib/line'
  import histogram from 'v-charts/lib/histogram'
  import pie from 'v-charts/lib/pie'
  export default{
    data () {
      this.typeArr = ['histogram', 'line', 'pie']
      this.index = 0
      return {
        chartData: {
          columns: ['status', 'sum'],
          rows: [
            { 'status': '读研', 'sum': 112},
            { 'status': '工作', 'sum': 215},
            { 'status': '出国', 'sum': 46},
            { 'status': '暂未就业', 'sum': 9}
          ]
        },
        chartSetting : {
          type: this.typeArr[this.index]
        }
      }
    },
    methods: {
      changeType: function () {
        this.index++
        if (this.index >= this.typeArr.length) { this.index = 0 }
        this.chartSetting = { type: this.typeArr[this.index] }
      }
    },
    components: { line, histogram, pie, Vechart }
  }
</script>

<style scoped>
  .title{
    font-size: 20px;
    text-align: center;
  }
  .chart-region {
    height:60rem;
    width: 40rem;
    margin-left:18rem;
  }
</style>
