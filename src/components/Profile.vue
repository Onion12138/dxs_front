<template>
  <div class="app-container">
    <div v-if="loading">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <el-card style="margin-bottom:20px;">
            <div slot="header" class="clearfix">
              <span>{{ nickname }}</span>
            </div>

            <div class="user-profile">
              <div class="box-center">
<!--                <pan-thumb   :height="'100px'" :width="'100px'" :hoverable="false">-->
<!--                  <div>Hello</div>-->
<!--&lt;!&ndash;                  {{ user.role }}&ndash;&gt;-->
<!--                  111-->
<!--                </pan-thumb>-->
                <div><img src="https://mpy634.cn/img/ironman-draw.png" alt="头像" style="width: 70px;height: 70px"></div>
              </div>

            </div>
            <div class="clearfix">
            <div class="user-bio">
              <div class="user-education user-bio-section">
                <div align="left"><span><strong>Education</strong></span></div>
                <div class="user-bio-section-body" align="left" >
                  <span>学校: {{universityName}}</span><br>
                  <span>专业: {{majorName}}</span>
                </div>
              </div>
            </div>
              <div class="user-bio2">
                <div class="user-status user-bio-section">
                  <div align="left"><span><strong>Status</strong></span></div>
                  <div class="user-bio-section-body" align="left" >
                    <span>身份:{{role}}</span><br>
                    <span>followed: {{followedNum}}</span><br>
                    <span>following: {{followingNum}}</span><br>
                  </div>
                </div>
              </div>

              <div class="user-skills user-bio-section">
                <div  align="left" ><span><strong>Others</strong></span></div>
                <div class="user-bio-section-body">
                  <div class="progress-item">
                    <span>愉悦值</span>
                    <el-progress :percentage="70" status="exception"/>
                  </div>
                  <div class="progress-item">
                    <span>活跃度</span>
                    <el-progress :percentage="18" status="warning"/>
                  </div>
                  <div class="progress-item">
                    <span>信息完善</span>
                    <el-progress :percentage="100" status="success"/>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab" @click.native="loadMoreData">
              <el-tab-pane label="发布的文章" name="article">
                <el-timeline>
                  <el-timeline-item v-for="(item,index) of postArticles" :key="index" :timestamp="item.publishTime | formatDateTime" placement="top">
                    <el-card>
                      <h4>{{ item.title }}</h4>
                      <div v-html="item.htmlContent"></div>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </el-tab-pane>
              <el-tab-pane label="关注我的" name="followed" >
                <el-table
                  :data="followedList"
                  style="width: 100%">
                  <el-table-column
                    prop="followingEmail"
                    label="邮箱"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                    <el-button type="success" @click="jumpToProfile(scope.row.followingEmail)">查看主页</el-button>
                    </template>
                  </el-table-column>
                </el-table>

              </el-tab-pane>
              <el-tab-pane label="我关注的" name="following" >
                <el-table
                  :data="followingList"
                  style="width: 100%">
                  <el-table-column
                    prop="followedEmail"
                    label="邮箱"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="300">
                    <template slot-scope="scope">
                    <el-button type="success" @click="jumpToProfile(scope.row.followedEmail)">查看主页</el-button>
                    <el-button type="danger" @click="cancelFollow(scope.row.followedEmail)">取消关注</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>


<script>

  import {getRequest, postRequest, putRequest, deleteRequest} from "../utils/api";

  export default {
    mounted: function(){
      let _this = this;
      window.bus.$on("reload",function () {
        _this.loadMoreData();
      });
      _this.loadProfile();
      _this.loadMoreData();
    },
    name: "Profile",
    data: function () {
      return {
        email: '',
        nickname: '未知',
        universityName: '未知',
        majorName: '未知',
        role: '未知',
        followedNum: 2,
        followingNum: 3,
        feeling: "心情简单",
        activeTab: 'article',
        loading: true,
        postArticles: [],
        total: 0,
        followedList: [],
        followingList: [],
        page: 1,
        pageSize: 50,

      }
    },
    methods:{
      jumpToProfile: function(email){
        this.$router.push({path: "/otherProfile",query:{email: email}});
        window.bus.$emit('profileReload');
      },
      cancelFollow: function(followedEmail){
        let _this = this;
        deleteRequest("/follow/cancelFollow",
          {followingEmail: _this.email,
          followedEmail: followedEmail
          }).then(resp=>{
            if(resp.data.code === 0){
              window.bus.$emit("reload");
              _this.$alert("操作成功");

            }else {
              _this.$alert("操作失败");
            }
        })
      },
      loadMoreData: function(){
        let _this = this;

          getRequest("/discussion/mine",{
            page: 1,
            size: 100,//只展示最近一百条
            email: _this.email,
          }).then(resp=>{
            if (resp.data.code === 0){
              _this.postArticles = resp.data.data.content;
            }
          });
          getRequest("/follow/getInfo",{
            email: _this.email,
            page: _this.page,
            size: _this.pageSize
          }).then(resp=>{
              if(resp.data.code === 0){
                _this.followingNum = resp.data.data.followingCnt;
                _this.followedNum = resp.data.data.followedCnt;
                _this.followingList = resp.data.data.following.list;
                _this.followedList = resp.data.data.followed.list;
              }else{
                // _this.$alert("数据错误");
              }
            })
      },
      loadProfile: function () {
        let _this = this;
        _this.email = sessionStorage.getItem("email");
        getRequest("/user",{
          email: _this.email,
        }).then(resp=>{
            if(resp.data.code === 0){
              _this.majorName = resp.data.data.majorName;
              _this.universityName = resp.data.data.universityName;
              _this.role = resp.data.data.role;
              _this.nickname = resp.data.data.nickname;
            }else{
              _this.$alert("数据错误");
            }
          });
      }
    }
  }
</script>

