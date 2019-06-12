<template>
  <div>
  <div>
  <el-input
    placeholder="通过公司或城市名称搜索"
    prefix-icon="el-icon-search"
    v-model="key" style="width: 400px" size="mini">
  </el-input>
  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 3px" @click="byName">名字搜索
  </el-button>
    <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 3px" @click="byCity">城市搜索
    </el-button>
  </div>
  <el-table
    :data="companies"
    style="width: 100%"
    max-height="800">
    <el-table-column
      fixed
      prop="companyName"
      label="公司"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="address"
      label="城市"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="keyword"
      label="方向"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="description"
      label="描述"
      width="600">
    </el-table-column>
    <el-table-column
      fixed
      prop="description"
      label="描述"
      width="600">
      <template slot-scope="scope">
      <el-button type="primary" @click="seeDetail(scope.row.companyName)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
    import {getRequest} from "../utils/api";

    export default {
        mounted: function(){
          let _this = this;
          getRequest("/company")
            .then(resp=>{
              if(resp.data.code ===0) {
                _this.companies = resp.data.data;
              }else{
                _this.$alert("数据出错");
              }
            })
        },
        name: "CompanyList",
        data: function () {
          return {
            companies: [],
            key: "",
          }
        },
        methods: {
          byName: function () {
            let _this = this;
            getRequest("/company/name",{companyName: _this.key})
              .then(resp=>{
                if(resp.data.code ===0) {
                  _this.companies = resp.data.data;
                }else{
                  _this.$alert("没有搜索结果");
                }
              })
          },
          byCity: function () {
            let _this = this;
            getRequest("/company/city",{city: _this.key})
              .then(resp=>{
                if(resp.data.code ===0) {
                  _this.companies = resp.data.data;
                }else{
                  _this.$alert("没有搜索结果");
                }
              })
          },
          seeDetail: function (companyName) {
            this.$router.push({path: '/interview', query: {company: companyName}});
          }
        }
    }
</script>

<style scoped>

</style>
