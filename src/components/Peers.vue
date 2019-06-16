<template>
  <div v-loading="loading">
    <div style="margin-top: 10px;display: flex;justify-content: center">
      <el-input
        placeholder="通过邮箱或用户名查找..."
        prefix-icon="el-icon-search"
        v-model="keywords" style="width: 400px" size="small">
      </el-input>
      <el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 3px" @click="loadOneUserByEmail(keywords)">搜索邮箱
      </el-button>
      <el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 3px" @click="loadOneUserByNickname(keywords)">搜索昵称
      </el-button>
    </div>
    <div style="display: flex;justify-content: space-around;flex-wrap: wrap">
      <el-card style="width:330px;margin-top: 10px;" v-for="(user,index) in users" :key="index"
               v-loading="loading" >
        <div slot="header" style="text-align: left" @click="goToProfile(user.email)">
          <span style="background-color: bisque" ><a href="#">{{user.nickname}}</a></span>
          <!--<el-button style="float: right; padding: 3px 0;color: #ff0509" type="text" icon="el-icon-delete"
                     @click="deleteUser(user.id)">删除
          </el-button>-->
        </div>
        <div>
          <div><img src="https://mpy634.cn/img/ironman-draw.png" alt="头像" style="width: 70px;height: 70px"></div>
          <div style="text-align: left;color:#20a0ff;font-size: 15px;margin-top: 5px;">
            <span>用户名:&#8194;</span><span>{{user.nickname}}</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 15px;margin-top: 5px;">
            <span>角色:&#8194;</span><span>{{user.role}}</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 15px;margin-top: 8px">
            <span>电子邮箱:&#8194;</span><span>{{user.email}}</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 15px;margin-top: 8px">
            <span>学校名字:&#8194;</span><span>{{user.universityName}}</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 15px;margin-top: 8px">
            <span>专业名字:&#8194;</span><span>{{user.majorName}}</span>
          </div>
          <div
            style="text-align: left;color:#20a0ff;margin-top: 8px;display: flex;align-items: center">
            <span>关注状态:&#12288;</span>
            <el-row>
              <el-button type="success" size="mini" @click="followUser(user.email)">关注</el-button>
              <el-button type="danger" size="mini" @click="unfollowUser(user.email)">取消关注</el-button>
            </el-row>
            <!--<el-switch
              v-model= ""
              active-text="关注"
              active-color="#13ce66"
              @change="enabledChange(user.enabled,user.id,index)"
              inactive-text="取消关注" style="font-size: 12px">
            </el-switch>-->
          </div>
        </div>
      </el-card>
    </div>
    <el-pagination
      background
      :page-size="pageSize"
      :pager-count="7"
      :total="total"
      layout="prev, pager, next, jumper"
      @current-change="handlePage" v-show="true">
    </el-pagination>
  </div>
</template>
<script>
  import {getRequest,postRequest,deleteRequest,putRequest} from '../utils/api'
  // import axios from 'axios'
  export default{
    mounted: function () {
      // this.loading = true;
      let page = this.pageNum;
      let size = this.pageSize;
      this.loadUserList(page,size);
    },
    methods: {
      followUser(email) {
        let _this = this;
        postRequest("/follow/addFollow",{},{
          followingEmail: sessionStorage.getItem("email"),
          followedEmail: email,
        }).then(resp=>{
          if (resp.data.code === 0) {
            _this.$alert("操作成功");
          }else if(resp.data.code !== -1 ) {
            _this.$message({type: 'error', message: resp.data.msg});
          }
          else
          {
            _this.$message({type: 'error', message: '操作失败!'});
          }
        });
      },
      goToProfile(email){
        this.$router.push({path: '/otherProfile', query: {email: email}});
      },
      unfollowUser(email) {
        let _this = this;
        deleteRequest("/follow/cancelFollow",{
          followingEmail: sessionStorage.getItem("email"),
          followedEmail: email,
        }).then(resp=>{
          if (resp.data.code === 0){
            _this.$alert("操作成功");
          } else if(resp.data.code !== -1){
            _this.$message({type: 'error', message: resp.data.msg});
          }
          else{
            _this.$message({type: 'error', message: '操作失败!'});
          }
        });
      },
      handlePage: function (currentPage){
        this.loadUserList(currentPage,this.pageSize);
      },
      loadOneUserByNickname(nickname) {
        let _this = this;
        if (nickname === '') {
        } else {
          getRequest("/student/findOneByNickname", {
            nickname: nickname,
          }).then(resp => {
            //这里返回格式不一样了
            if (resp.data.code === 0) {
              _this.users = resp.data.data;
              if (resp.data.data.length === 0){
                _this.$message({type: 'error', message: '无匹配结果!'});
              }
              _this.total = resp.data.data.length;


            } else {
              _this.$message({type: 'error', message: '数据加载失败!'});
            }
          });
        }

      },
      loadOneUserByEmail(email) {
        let _this = this;
        if (email === ''){
        } else{
          getRequest("/student/findOneByEmail", {
            email: email,
          }).then(resp => {
            if (resp.data.code === 0) {
              if (resp.data.data.email!==null){
                _this.users = {};
                _this.users[0] = resp.data.data;
                _this.total = 1;
              } else{
                _this.users = {};
                _this.total = 0;
                _this.$message({type: 'error', message: '无匹配结果!'});
              }

            } else {
              _this.$message({type: 'error', message: '数据加载失败!'});
            }
          });
        }
      },
      loadUserList(pageNum, pageSize) {
        let _this = this;
        let token = sessionStorage.getItem("token");
        getRequest("/student/peers", {
          token: token,
          page: pageNum,
          size: pageSize,
        }).then(resp => {
          // _this.loading = false;
          if (resp.data.code === 0) {
            _this.users = resp.data.data.list;
            _this.total = resp.data.data.total;

          } else if (resp.data.code === -3) {
            _this.$message({type: 'error', message: resp.data.msg});
          } else {
            _this.$alert({type: 'error', message: '数据加载失败!'});
          }
        })
      }
    },
    data(){
      return {
        loading: false,
        users: [],
        pageNum: 1,
        pageSize: 18,
        pages: -1,
        total: 0,
        // allRoles: [],
        // roles: [],
        // cpRoles: []
        // eploading: [],
        // cardloading: [],
        keywords: ''
      }
    }
  }
</script>
