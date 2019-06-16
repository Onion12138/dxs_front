<template>
  <div class="chart-region">
    <div class="title">当年应届生毕业后选择</div>
    <el-select v-model="value" placeholder="请选择年份" style="margin-top:10px;width:110px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        size="mini">
      </el-option>
    </el-select>
    <br><br>
    <button @click="changeType">切换图表类型</button>
    <vechart :data="chartData" :legend-visible="false" :settings="chartSetting"></vechart>
  </div>
</template>

<script>
  import Vechart from 'v-charts/lib/chart'
  import line from 'v-charts/lib/line'
  import histogram from 'v-charts/lib/histogram'
  import pie from 'v-charts/lib/pie'
  import {postRequest} from '../utils/api'
  export default{
    data () {
      this.typeArr = ['histogram', 'line', 'pie']
      this.index = 0
      return {
        chartData: {
          columns: ['status', 'sum'],
          rows: [
            { 'status': '读研', 'sum': ''},
            { 'status': '工作', 'sum': ''},
            { 'status': '出国', 'sum': ''},
            { 'status': '暂未就业', 'sum': ''}
          ]
        },
        chartSetting : {
          type: this.typeArr[this.index]
        },
        options: [{
          value: '2019'
        }, {
          value: '2018'
        }, {
          value: '2017'
        }, {
          value: '2016'
        }, {
          value: '2015'
        }],
        value: '2019'
      }
    },
    methods: {
      changeType: function () {
        this.index++
        if (this.index >= this.typeArr.length) { this.index = 0 }
        this.chartSetting = { type: this.typeArr[this.index] }
      }
    },
    components: { line, histogram, pie, Vechart },
    mounted() {
      postRequest('/student/choice', {
        "college": sessionStorage.getItem("universityName"),
        "major": sessionStorage.getItem("majorName"),
        "year": 2019,
        "token": sessionStorage.getItem("token"),
      }).then(res => {
        if (res.data.code === 0) {
          let _this=this.chartData.rows;
          _this[0].sum = res.data.data.yan;
          _this[1].sum = res.data.data.work;
          _this[2].sum = res.data.data.aboard;
          _this[3].sum = res.data.data.unemployment;
        }else{
          this.$alert("加载失败");
        }
      })
    },
    updated() {
      //this.$alert(this.value);
      postRequest('/student/choice', {
        "college": sessionStorage.getItem("universityName"),
        "major": sessionStorage.getItem("majorName"),
        "year": this.value,
        "token": sessionStorage.getItem("token"),
      }).then(res => {
        if (res.data.code === 0) {
          let _this=this.chartData.rows;
          _this[0].sum = res.data.data.yan;
          _this[1].sum = res.data.data.work;
          _this[2].sum = res.data.data.aboard;
          _this[3].sum = res.data.data.unemployment;
        }else{
          this.$alert("加载失败");
        }
      })
    }
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
