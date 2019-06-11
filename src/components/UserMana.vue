<template>
  <div v-loading="loading">
    <div style="margin-top: 10px;display: flex;justify-content: center">
      <el-input
        placeholder="默认展示部分同学，可以通过用户名搜索同学..."
        prefix-icon="el-icon-search"
        v-model="keywords" style="width: 400px" size="small">
      </el-input>
      <el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 3px" @click="searchClick">搜索
      </el-button>
    </div>
    <div style="display: flex;justify-content: space-around;flex-wrap: wrap">
      <el-card style="width:330px;margin-top: 10px;" v-for="(user,index) in users" :key="index"
               v-loading="loading">
        <div slot="header" style="text-align: left">
          <span>{{user.nickname}}</span>
          <!--<el-button style="float: right; padding: 3px 0;color: #ff0509" type="text" icon="el-icon-delete"
                     @click="deleteUser(user.id)">删除
          </el-button>-->
        </div>
        <div>
          <div><img src="#" alt="#" style="width: 70px;height: 70px"></div>
          <div style="text-align: left;color:#20a0ff;font-size: 15px;margin-top: 5px;">
            <span>用户名:&#8194;</span><span>{{user.nickname}}</span>
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
  </div>
</template>
<script>
  import {getRequest,postRequest,deleteRequest,putRequest} from '../utils/api'
  // import axios from 'axios'
  export default{
    mounted: function () {
      // this.loading = true;
      this.page = 1;
      this.size = 20;
      this.loadUserList();
      // this.cardloading = Array.apply(null, Array(20)).map(function (item, i) {
      //   return false;
      // });
      // this.eploading = Array.apply(null, Array(20)).map(function (item, i) {
      //   return false;
      // });
    },
    methods: {

      showRole(aRoles, id, index) {
        this.cpRoles = aRoles;
        this.roles = [];
        this.loadRoles(index);
        for (var i = 0; i < aRoles.length; i++) {
          this.roles.push(aRoles[i].id);
        }
      },
      followUser(email) {

      },
      unfollowUser(email) {

      },

      /*deleteUser(followingEmail){
        var _this = this;
          this.$confirm('取消关注该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.loading = true;
          var myEmail = sessionStorage.getItem("email");
          deleteRequest("/follow/cancelFollow?followingEmail=" + followingEmail+"&followedEmail="+myEmail).then(resp=> {
            if (resp.status == 200 && resp.data.status == 'success') {
              _this.$message({type: 'success', message: '删除成功!'})
              _this.loadUserList();
              return;
            }
            _this.loading = false;
            _this.$message({type: 'error', message: '删除失败!'})
          }, resp=> {
            _this.loading = false;
            _this.$message({type: 'error', message: '删除失败!'})
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      enabledChange(enabled, id, index){
        var _this = this;
        _this.cardloading.splice(index, 1, true)
        putRequest("/admin/user/enabled", {enabled: enabled, uid: id}).then(resp=> {
          if (resp.status != 200) {
            _this.$message({type: 'error', message: '更新失败!'})
            _this.loadOneUserById(id, index);
            return;
          }
          _this.cardloading.splice(index, 1, false)
          _this.$message({type: 'success', message: '更新成功!'})
        }, resp=> {
          _this.$message({type: 'error', message: '更新失败!'})
          _this.loadOneUserById(id, index);
        });
      },*/

      /**留**/


      loadRoles(index) {
        var _this = this;
        // _this.eploading.splice(index, 1, true)
        getRequest("/admin/roles").then(resp => {
          _this.eploading.splice(index, 1, false)
          if (resp.status == 200) {
            _this.allRoles = resp.data;
          } else {
            _this.$message({type: 'error', message: '数据加载失败!'});
          }
        }, resp => {
          _this.eploading.splice(index, 1, false)
          if (resp.response.status == 403) {
            var data = resp.response.data;
            _this.$message({type: 'error', message: data});
          }
        });
      },
      loadOneUserBynickname(nickname, index) {
        var _this = this;
        getRequest("/admin/user/" + nickname).then(resp => {
          // _this.cardloading.splice(index, 1, false)
          if (resp.status == 200) {
            _this.users.splice(index, 1, resp.data);
          } else {
            _this.$message({type: 'error', message: '数据加载失败!'});
          }
        }, resp => {
          // _this.cardloading.splice(index, 1, false)
          if (resp.response.status == 403) {
            var data = resp.response.data;
            _this.$message({type: 'error', message: data});
          }
        });
      },
      loadOneUserByEmail(email, index) {
        var _this = this;
        getRequest("/admin/user/" + id).then(resp => {
          _this.cardloading.splice(index, 1, false)
          if (resp.status == 200) {
            _this.users.splice(index, 1, resp.data);
          } else {
            _this.$message({type: 'error', message: '数据加载失败!'});
          }
        }, resp => {
          _this.cardloading.splice(index, 1, false)
          if (resp.response.status == 403) {
            var data = resp.response.data;
            _this.$message({type: 'error', message: data});
          }
        });
      },
      loadUserList() {
        let _this = this;
        let token = sessionStorage.getItem("token");
        getRequest("/student/classmates", {
          token: token,
          page: _this.page,
          size: _this.size,
        }).then(resp => {
          // _this.loading = false;
          if (resp.data.code === 0) {
            _this.users = resp.data.data.list;
            _this.total = resp.data.data.total;

          } else if (resp.data.code === -3) {
            _this.$message({type: 'error', message: resp.data.msg});
          } else {
            _this.$message({type: 'error', message: '数据加载失败!'});
          }
        })
      },
      searchClick() {
        this.loading = true;
        //this.loadOneUserById();
      }
    },
    data(){
      return {
        loading: false,
        users: [],
        page: 1,
        size: 20,
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
