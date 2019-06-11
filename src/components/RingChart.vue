<template>
  <div class="chart-region">
    <div class="title">当年应届生工作城市占比</div>
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
          rows:[{
            'city':'','sum':''
          },{
            'city':'','sum':''
          },{
            'city':'','sum':''
          }]
        }
      }
    },
    components: {
      VeRing
    },
    mounted() {
      postRequest('/student/desCity', {
        "college": sessionStorage.getItem("universityName"),
        "major": sessionStorage.getItem("majorName"),
        "year": 2018,
        "token": sessionStorage.getItem("token"),
      }).then(res => {
        if (res.data.code === 0) {
          let _this = this.chartData.rows;
          let i = 0;
          let _data = res.data.data.cityWithCount;
          for (var temp in _data) {
            _this[i].city = temp;
            _this[i].sum = _data[temp];
            i = i + 1;
          }
        } else {
          _this.$alert("加载失败");
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
