<template>
  <el-form ref="form" :model="form" label-width="80px">

  <el-form-item label="我的邮箱">
    <el-input v-model="email" :disabled="true"></el-input>
  </el-form-item>
    <el-form-item label="我的昵称">
      <el-input placeholder="请输入内容" v-model="nickname" >
        <el-button slot="append" icon="el-icon-edit" @click="handleName">修改昵称</el-button>
      </el-input>
    </el-form-item>
    <el-form-item label="我的大学">
      <el-input v-model="university" :disabled="true" ></el-input>
    </el-form-item>
    <el-form-item label="我的专业">
      <el-input v-model="major" :disabled="true" ></el-input>
    </el-form-item>
    <el-form-item label="毕业年份" v-if="role==='graduate'">
      <el-input v-model="graduateYear" :disabled="true" ></el-input>
    </el-form-item>
    <el-form-item label="我的公司" v-if="role==='graduate'">
      <el-input v-model="company" :disabled="true" ></el-input>
    </el-form-item>
    <el-form-item label="我的职位" v-if="role==='graduate'">
      <el-input v-model="position" :disabled="true" ></el-input>
    </el-form-item>

    <el-form-item>
    <el-link icon="el-icon-s-custom" href="/#/homeGraduateInfo" v-if="role==='graduate'">重新认证</el-link>
    </el-form-item>
    <el-form-item>
      <el-link icon="el-icon-s-custom" href="/#/homeInfo" v-if="role==='student'">重新认证</el-link>
    </el-form-item>
    <el-form-item>
    <el-link icon="el-icon-s-check" href="/#/homeReset">重置密码</el-link>
      </el-form-item>


  </el-form>
</template>
<script>
  import {getRequest, putRequest} from "../utils/api";

  export default {
    mounted: function(){
      let _this = this;
      getRequest("/user",{
        email: _this.email,
        role: _this.role,
      }).then(resp=>{
        if(resp.data.code === 0){
          _this.university = resp.data.data.universityName;
          _this.major = resp.data.data.majorName;
          if(_this.role === 'graduate'){
            _this.company = resp.data.data.company;
            _this.graduateYear = resp.data.data.graduateYear;
            _this.position = resp.data.data.position;
          }
        }else{
          _this.$alert("数据查询失败");
        }
      })
    },
    data: function () {
      return {
        email: sessionStorage.getItem("email"),
        nickname: sessionStorage.getItem("nickname"),
        role: sessionStorage.getItem("role"),
        form: {},
        university: "",
        major: "",
        company: "",
        graduateYear: 2019,
        position: "",
      }
    },
    methods: {
      handleName: function () {
        let _this = this;
        putRequest("/user",
          {email: _this.email,
          nickname: _this.nickname})
          .then(resp=>{
            if(resp.data.code === 0){
              _this.$alert("修改成功");
              sessionStorage.setItem("nickname", _this.nickname);
            }else{
              _this.$alert("修改失败");
            }
        })
      }
    }
  }
</script>
