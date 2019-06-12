<template>
  <el-container class="home_container" >
    <el-header style="background-color: black">
      <div class="home_title">大学仕</div>
      <div class="home_userinfoContainer">
        <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link home_userinfo">
    {{currentUserName}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="systemMessage">
              系统消息
              <el-badge :is-dot="true"/>
            </el-dropdown-item>
            <el-dropdown-item command="personalInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="profile">我的主页</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo" style="background-color: #ECECEC" router>
          <template v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden">
<!--            <el-submenu :index="index+''" v-if="item.children.length>1" :key="index">-->
            <el-submenu :index="index+''" v-if="item.children.length>1" :key="index">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" v-if="!child.hidden" :index="child.path" :key="child.path">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
            <template v-else>
              <el-menu-item :index="item.children[0].path">
                <i :class="item.children[0].iconCls"></i>
                <span slot="title">{{item.children[0].name}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
  import {getRequest} from '../utils/api'
  export default{
    methods: {
      handleCommand(command){
        let _this = this;
        if(command === 'systemMessage'){
          _this.$router.replace({path: 'systemMessage'});
        }
        if(command === 'personalInfo'){
          _this.$router.replace({path: 'personalInfo'});
        }
        if(command === 'profile'){
          _this.$router.replace({path: 'profile'});
        }
        if (command === 'logout') {
          this.$confirm('注销登录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            _this.currentUserName = '游客';
            _this.$router.replace({path: '/'});
          }, function () {
            //取消
          })
        }
      },
      websocketonopen: function(){
        console.log("连接成功");
      },
      websocketonclose: function(){
        console.log("连接关闭");
      },
      websocketonerror: function(){
        console.log("连接错误");
      },
      websocketonmessage: function(e){
        this.$notify({
          title: '消息',
          message: e.data,
        });
        // var da = JSON.parse(e.data);
        console.log(e);
      },
      initWebSocket: function () {
        this.websock = new WebSocket("ws://localhost:8080/websocket/" + this.email);
        this.websock.onopen = this.websocketonopen;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketonclose;
        this.websock.onerror = this.websocketonerror;
      }
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      this.websocketonclose();
    },
    mounted: function () {
      this.$alert(sessionStorage.getItem('nickname') + '欢迎您', '友情提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      let _this = this;
      this.currentUserName = sessionStorage.getItem("nickname");

    },
    data(){
      return {
        currentUserName: '',
        email: sessionStorage.getItem('email')
      }
    },
  }
</script>
<style>
  .home_container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .el-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-aside {
    background-color: #ECECEC;
  }

  .el-main {
    background-color: #fff;
    color: #000;
    text-align: center;
  }

  .home_title {
    /*color: #fff;*/
    color: aquamarine;
    font-size: 28px;
    display: inline;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }
</style>
