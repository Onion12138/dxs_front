<template>
  <div>
    <div class="title">近五年平均薪资</div>
    <el-select v-model="value" placeholder="请选择年份" style="margin-top:10px;width:110px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        size="mini">
      </el-option>
    </el-select>
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
        }, {
          value: '2014'
        }, {
          value: '2013'
        }, {
          value: '2012'
        }, {
          value: '2011'
        }, {
          value: '2010'
        }],
        value: '2019'
      }
    },
    components: { VeLine },
    mounted() {
      postRequest('/student/salaryChange', {
        "college": sessionStorage.getItem("universityName"),
        "major": sessionStorage.getItem("majorName"),
        "year": 2019,
        "token": sessionStorage.getItem("token"),
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
    },
    updated() {
      //this.$alert(this.value);
      postRequest('/student/salaryChange', {
        "college": sessionStorage.getItem("universityName"),
        "major": sessionStorage.getItem("majorName"),
        "year": this.value,
        "token": sessionStorage.getItem("token"),
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
