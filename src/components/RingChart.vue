<template>
  <div class="chart-region">
    <div class="title">当年应届生工作城市占比</div>
    <el-select v-model="value" placeholder="请选择年份" style="margin-top:10px;width:110px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        size="mini">
      </el-option>
    </el-select>
    <ve-ring :data="chartData" :legend-visible="false" :settings="chartSetting"></ve-ring>
  </div>
</template>

<script>
  import VeRing from 'v-charts/lib/ring'
  import {postRequest} from '../utils/api'
  export default{
    data () {
      this.chartSetting = {
        radius: [60, 100]
      }
      return {
        chartData: {
          columns: ['city', 'sum'],
          rows:[]
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
    components: {
      VeRing
    },
    mounted() {
      postRequest('/student/desCity', {
        "college": sessionStorage.getItem("universityName"),
        "major": sessionStorage.getItem("majorName"),
        "year": 2019,
        "token": sessionStorage.getItem("token"),
      }).then(res => {
        if (res.data.code === 0) {
          let _this = this.chartData.rows;
          let _data = res.data.data.cityWithCount;
          for (let temp in _data) {
            _this.push({"city":temp+"","sum": _data[temp] });
            // _this[i].city = temp;
            // _this[i].sum = _data[temp];
          }
        } else {
          this.$alert("加载失败");
        }
      })
    },
    updated() {
      //this.$alert(this.value);
      postRequest('/student/desCity', {
        "college": sessionStorage.getItem("universityName"),
        "major": sessionStorage.getItem("majorName"),
        "year": this.value,
        "token": sessionStorage.getItem("token"),
      }).then(res => {
        if (res.data.code === 0) {
          let _data = res.data.data.cityWithCount;
          this.chartData.rows = [];
          for (let temp in _data) {
            this.chartData.rows.push({"city":temp+"","sum": _data[temp]});
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
