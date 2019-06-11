<template>
  <div class="chart-region">
    <div class="title">当年应届生毕业后工作的公司分布</div>
    <ve-pie :data="chartData" :legend-visible="false" :settings="chartSetting"></ve-pie>
  </div>
</template>

<script>
  import VePie from 'v-charts/lib/pie'
  import {postRequest} from '../utils/api'
  export default{
    data () {
      this.chartSetting = {
      }
      return {
        chartData: {
          columns: ['company', 'sum'],
          rows: [
            { 'company': '', 'sum': ''},
            { 'company': '', 'sum': ''},
            { 'company': '', 'sum': ''},
            { 'company': '', 'sum': ''},
            { 'company': '', 'sum': ''},
            { 'company': '', 'sum': ''},
            { 'company': '', 'sum': ''},
            { 'company': '', 'sum': ''}
          ]
        }
      }
    },
    components: { VePie },
    mounted() {
      postRequest('/student/desCompany', {
        "college": sessionStorage.getItem("universityName"),
        "major": sessionStorage.getItem("majorName"),
        "year": 2018,
        "token": sessionStorage.getItem("token"),
      }).then(res => {
        if (res.data.code === 0) {
          let _this = this.chartData.rows;
          let i = 0;
          let _data = res.data.data.nameWithCount;
          for (var temp in _data) {
            _this[i].company = temp;
            _this[i].sum = _data[temp];
            i = i + 1;
          }
        } else {
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
    align-items: center;
  }
</style>
