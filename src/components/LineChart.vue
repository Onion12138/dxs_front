<template>
  <div>
    <div class="title">近五年平均薪资</div>
    <div class="chart-region">
      <ve-line :data="chartData" :legend-visible="false" :extend="extend"></ve-line>
    </div>
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line'
  import {postRequest} from '../utils/api'
  export default{
    data () {
      this.extend = {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      };
      return {
        chartData: {
          columns: ['year', 'salary'],
          rows: [
            { 'year': '', 'salary': ''},
            { 'year': '', 'salary': ''},
            { 'year': '', 'salary': ''},
            { 'year': '', 'salary': ''},
            { 'year': '', 'salary': ''}
          ]
        }
      }
    },
    components: { VeLine },
    mounted() {
      postRequest('/student/salaryChange', {
        "college": "ecnu",
        "major": sessionStorage.getItem("major"),
        "year": 2018,
        "token": sessionStorage.getItem("token")
      }).then(res => {
        if (res.data.code === 0) {
          let _this=this.chartData.rows;
          for(let i = 0;i < res.data.data.salary.length;i = i+1) {
            _this[i].year = res.data.data.year[i]+"";
            _this[i].salary = res.data.data.salary[i]+"";
          }
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
    width: 40rem;
    height: 35rem;
    margin-left: 18rem
  }
</style>
