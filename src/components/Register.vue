<template>
  <el-form :model="registerForm" :rules="rules" ref="registerForm" class="register-container" label-position="left"
           label-width="20px" >
    <h3 class="login_title">注册</h3>

    <el-form-item prop="email">
      <el-input type="text" v-model="registerForm.email" auto-complete="off" placeholder="邮箱" style="width: 70%;margin-bottom: 40px"></el-input>
    </el-form-item>

    <el-form-item prop="nickname">
      <el-input type="text" v-model="registerForm.nickname" auto-complete="off" placeholder="昵称" style="width: 70%;margin-bottom: 40px"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="密码" style="width: 70%;margin-bottom: 40px"></el-input>
    </el-form-item>

    <el-form-item prop="checkPassword">
      <el-input type="password" v-model="registerForm.checkPassword" auto-complete="off" placeholder="确认密码" style="width: 70%;margin-bottom: 40px"></el-input>
    </el-form-item>

    <el-form-item prop="code">
      <el-input type="text" placeholder="验证码" v-model="registerForm.code" style="width: 70%;margin-bottom: 40px">
        <el-button slot="append" icon="el-icon-s-promotion" @click="sendCode('registerForm')" :disabled="this.timer != null">{{msg}}</el-button>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('registerForm')" style="width: 70%">注册</el-button>
    </el-form-item>

<!--    <el-dialog title="注册成功，请选择身份类型，进行认证" :visible.sync="dialogFormVisible" width="40%">-->
<!--      <el-form :model="identity" label-position="right">-->
<!--        <el-form-item label="身份类型" :label-width="formLabelWidth">-->
<!--          <el-select v-model="identity.status" placeholder="请选择身份类型" style="float:left">-->
<!--            <el-option label="在校学生" value="0"></el-option>-->
<!--            <el-option label="毕业学生" value="1"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="statusTest(identity.status)">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

  </el-form>
</template>

<script>
  import {getRequest} from '../utils/api'
  import {postRequest} from "../utils/api";
  export default{
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPassword !== '') {
            this.$refs.registerForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          email: '',
          nickname: '',
          password: '',
          checkPassword: '',
          code: ''
        },
        // identity:{
        //   status: ''   //0表示在校，1表示毕业
        // },
        rules: {
          email: [{required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入合法邮箱', trigger: 'blur'}],
          nickname: [{required: true, message: '请输入昵称', trigger: 'blur'},
            {min: 2, max: 16, message: '长度为3-16个字符', trigger: 'blur'}],
          password: [
            { validator: validatePass, trigger: 'blur' },
            {pattern: /[a-zA-Z0-9]{6,16}/, message:'密码为6-16位的字母或数字', trigger: 'blur'}
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {pattern: /[0-9]{6}/, message: '请输入6位数字验证码', trigger: 'blur'}
          ]
        },
        msg: '发送验证码',
        timer: null,
        count: '',
        // dialogFormVisible: false,
        // formLabelWidth: '80px'
      }
    },
    methods: {
      // statusTest(status){
      //   let _this=this;
      //   console.log(status);
      //   if(status === 0){
      //     _this.$router.replace({path: '/info'});
      //     _this.dialogFormVisible = false;
      //   }else if(status === 1){
      //     _this.$router.replace({path: '/graduateInfo'});
      //   }
      // },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this;
            postRequest('/user/register',{
              email: this.registerForm.email,
              nickname: this.registerForm.nickname,
              password: this.registerForm.password
            },{checkcode: this.registerForm.code}
            ).then(resp => {
              if (resp.data.code === 0) {
                _this.$message({message: '注册成功', type: 'success'});
                // _this.dialogFormVisible = true;
                _this.$router.replace({path: '/'});
                //replace和push有啥区别呢
              } else {
                _this.$alert(resp.data.msg);
              }
            },resp=> {
              _this.$alert('服务器繁忙');
            });
          } else {
            this.$alert('请正确填写注册信息');
            return false;
          }
        });
      },
      sendCode: function (formName) {
        this.$refs[formName].validateField('email',msg =>{
          if(msg === ""){
            this.count = 30;
            this.timer = setInterval(() => {
              if (this.count > 0) {
                this.count--;
                this.msg = this.count + 's后再次发送'
              } else {
                clearInterval(this.timer);
                this.timer = null;
                this.msg = '发送验证码';
              }
            }, 1000);
            let _this = this;
            getRequest('/user/sendCode', {
              email: this.registerForm.email
            }).then(resp => {
              if (resp.data.code === 0) {
                _this.$alert('验证码已发送');
              } else {
                _this.$alert('验证码发送失败');
              }
            },resp=> {
              _this.$alert('服务器繁忙');
            });
          }else{
            this.$alert('请正确填写邮箱')
          }
        });
      },
    }
  }
</script>

<style scoped>
  .register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 640px;
    height: 640px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    background-image: url("../assets/register.png");
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
