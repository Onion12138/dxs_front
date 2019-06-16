<template>
  <div class="chart-region">
    <div class="title">当年应届生毕业后工作的公司分布</div>
    <el-select v-model="value" placeholder="请选择年份" style="margin-top:10px;width:110px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        size="mini">
      </el-option>
    </el-select>
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
          rows: []
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
    components: { VePie },
    mounted() {
      postRequest('/student/desCompany', {
        "college": sessionStorage.getItem("universityName"),
        "major": sessionStorage.getItem("majorName"),
        "year": 2019,
        "token": sessionStorage.getItem("token"),
      }).then(res => {
        if (res.data.code === 0) {
          let _this = this.chartData.rows;
          let i = 0;
          let _data = res.data.data.nameWithCount;
          for (var temp in _data) {
            _this.push({"company":temp+"","sum": _data[temp] });
            i = i + 1;
          }
        } else {
          this.$alert("加载失败");
        }
      })
    },
    updated() {
      //this.$alert(this.value);
      postRequest('/student/desCompany', {
        "college": sessionStorage.getItem("universityName"),
        "major": sessionStorage.getItem("majorName"),
        "year": this.value,
        "token": sessionStorage.getItem("token"),
      }).then(res => {
        if (res.data.code === 0) {
          let _this = this.chartData.rows;
          let i = 0;
          let _data = res.data.data.nameWithCount;
          for (var temp in _data) {
            _this = [];
            _this.push({"company":temp+"","sum": _data[temp] });
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
