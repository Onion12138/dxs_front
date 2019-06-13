<template>
  <el-row :gutter="0">
<!--    <el-col>-->
<!--    <el-carousel :interval="0" arrow="never" height="500px" type="card">-->
<!--      <el-carousel-item v-for="item in dataimg" :key="item">-->
<!--        <div class="grid-content">-->
<!--          <el-col :md="12" :offset="6">-->
<!--            <div>-->
<!--              <img :src="item.src">-->
<!--              <p class="italictext">{{item.txt}}</p>-->
<!--              <span class="service">{{item.txt2}}</span>-->
<!--              <p class="last">{{item.txt3}}</p>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </div>-->
<!--      </el-carousel-item>-->
<!--    </el-carousel>-->
<!--    </el-col>-->
<!--    <el-col>-->
  <el-form :model="loginForm" :rules="rules" class="login-container" ref="loginForm" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>

    <el-form-item  prop="email" style="margin-bottom: 80px">
      <el-input type="text" v-model="loginForm.email" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>

    <el-form-item prop="password" style="margin-bottom: 80px">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

<!--    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>-->

    <el-form-item style="width: 100% ;margin-bottom: 80px">
      <el-button type="success" @click.native.prevent="submitClick('loginForm')" style="width: 100%">登录</el-button>
    </el-form-item>

    <el-form-item>
      <el-link href="/#/register" icon="el-icon-lollipop" type="primary" style="font-size: large">没有账号？注册</el-link>
    </el-form-item>

    <el-form-item>
      <el-link href="/#/reset" icon="el-icon-milk-tea" type="primary" style="font-size: large">忘记密码？重置</el-link>
    </el-form-item>

    <el-dialog title="请选择身份类型，进行认证" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="identity" label-position="right">
        <el-form-item label="身份类型" :label-width="formLabelWidth">
          <el-select v-model="identity.status" placeholder="请选择身份类型" style="float:left">
            <el-option label="在校学生" value="0"></el-option>
            <el-option label="毕业学生" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="statusTest(identity.status)">确 定</el-button>
      </div>
    </el-dialog>

  </el-form>

  </el-row>

</template>
<script>
  import {postRequest} from '../utils/api'
  import {putRequest} from '../utils/api'
  export default{
    data(){
      return {
        identity:{
          status: ''   //0表示在校，1表示毕业
        },
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
        loading: false,
        dataimg: [
        ],
        dialogFormVisible: false,
        formLabelWidth: '80px',
      }
    },
    methods: {
      statusTest(status){
        let _this=this;
        // console.log(status);
        if(status === '0'){
          _this.$router.replace({path: '/info'});
          _this.dialogFormVisible = false;
        }else if(status === 1){
          _this.$router.replace({path: '/graduateInfo'});
        }
      },
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
                // sessionStorage.setItem("majorName",resp.data.data.role);
                if(resp.data.code === 0){
                  if (resp.data.data.role === 'undefined'){
                    // _this.$alert("请先完成认证");
                    _this.dialogFormVisible = true;
                    // _this.$router.replace({path: '/info'});
                  }
                  else {
                    _this.$router.replace({path: '/home'});
                  }
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
    width: 500px;
    height: 800px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    background-image: url("../assets/login.png");
    background-size: contain;
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
