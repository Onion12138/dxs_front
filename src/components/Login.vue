<template>
  <el-form :model="loginForm" :rules="rules" class="login-container" ref="loginForm" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>

    <el-form-item  prop="email">
      <el-input type="text" v-model="loginForm.email" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>

    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick('loginForm')" style="width: 100%">登录</el-button>
    </el-form-item>

    <el-form-item>
    <router-link to="/register" class="linkregister">没有账号？注册</router-link>
    </el-form-item>

    <el-form-item>
    <router-link to="/reset" class="linkreset">忘记密码？重置</router-link>
    </el-form-item>

  </el-form>
</template>
<script>
  import {postRequest} from '../utils/api'
  import {putRequest} from '../utils/api'
  export default{
    data(){
      return {
        rules: {
          email: [{required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确邮箱', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 16, message: '请输入有效的密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      submitClick: function (formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            let _this = this;
            this.loading = true;
            postRequest('/user/login', {},{
              email: this.loginForm.email,
              password: this.loginForm.password
            }).then(resp=> {
                _this.loading = false;
                sessionStorage.setItem("nickname", resp.data.data.nickname);
                sessionStorage.setItem("token",resp.data.data.token);
                sessionStorage.setItem("email",resp.data.data.email);
                sessionStorage.setItem("universityName",resp.data.data.universityName);
                sessionStorage.setItem("majorName",resp.data.data.majorName);
                if(resp.data.code === 0){
                  _this.$router.replace({path: '/home'});
                }else{
                  _this.$alert(resp.data.msg);
                }
              },
              resp=> {
                _this.loading = false;
                _this.$alert('服务器繁忙');
              });
          }else{
            this.$alert("请正确输入信息");
          }
        });

      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
