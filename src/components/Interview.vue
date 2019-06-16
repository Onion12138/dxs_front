<template>
  <el-row>
    <el-col>
  <div style="text-align: left;">
    <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
  </div>
    </el-col>
    <el-col>
  <el-table
    :data="interviews"
    style="width: 100%"
    max-height="800">
    <el-table-column
      fixed
      prop="rate"
      label="评价"
      width="200">
      <template slot-scope="scope" >
      <el-rate
        disabled
        v-model="scope.row.rate"
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
      </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="feeling"
      label="感受"
      width="500">
    </el-table-column>
    <el-table-column
      fixed
      prop="nickname"
      label="昵称"
      width="150">
    </el-table-column>
  </el-table>
    </el-col>
    <el-button type="primary" @click="addExperience" v-if="add">添加经验</el-button>
    <div v-if="!add">给公司评分</div>
    <el-rate
      v-model="rateValue" v-if="!add"
      show-text>
    </el-rate>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入面试感受"
      v-if="!add"
      v-model="feeling">
    </el-input>
    <el-button type="success" @click="confirm" v-if="!add" :disabled="feeling.length===0">确认</el-button>
    <el-button type="warning" @click="giveUp" v-if="!add">放弃</el-button>
  </el-row>
</template>

<script>
  import {getRequest, postRequest} from "../utils/api";

    export default {
        mounted: function(){
          let _this = this;
          window.bus.$on('interviewReload', function () {
            _this.loadInterview();
          });
          _this.loadInterview();
        },
        name: "Interview",
        data: function () {
          return {
            interviews: [],
            companyName: "",
            rateValue: 0,
            feeling: "",
            add: true,
          }
        },
        methods:{
          goBack: function () {
            this.$router.go(-1);
          },
          addExperience: function(){
            this.add = false;
          },
          giveUp: function(){
            this.add = true;
          },
          confirm: function () {
            let _this = this;
            postRequest("/interview",{
              company: _this.companyName,
              rate: _this.rateValue,
              feeling: _this.feeling,
              nickname: sessionStorage.getItem("nickname"),
            }).then(resp=>{
              if(resp.data.code === 0){
                _this.$alert("添加成功");
                window.bus.$emit('interviewReload');
                _this.add = true;
                _this.feeling = "";
              }else{
                _this.$alert("添加失败");
              }
            })
          },
          loadInterview: function () {
            let _this = this;
            _this.companyName = this.$route.query.company;
            getRequest("/interview",{company: _this.companyName})
              .then(resp=>{
                if(resp.data.code === 0){
                  _this.interviews = resp.data.data;
                }else{
                  _this.$alert("数据错误");
                }
              })
          }
        }
    }
</script>

<style scoped>

</style>
