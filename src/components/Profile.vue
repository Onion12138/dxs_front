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
                  <el-timeline-item v-for="(item,index) of postArticles" :key="index" :timestamp="item.publishTime" placement="top">
                    <el-card>
                      <h4>{{ item.title }}</h4>
                      <p>{{ item.content }}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </el-tab-pane>
              <el-tab-pane label="关注我的" name="followed" >

              </el-tab-pane>
              <el-tab-pane label="我关注的" name="following" >

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
      // window.bus.$on('interviewReload', function () {
      //   _this.loadInterview();
      // });
      _this.loadProfile();
    },
    name: "Profile",
    data: function () {
      return {
        email: sessionStorage.getItem("email"),
        nickname: sessionStorage.getItem("nickname"),
        universityName: sessionStorage.getItem("universityName"),
        majorName: sessionStorage.getItem("majorName"),
        role: sessionStorage.getItem("role"),
        followedNum: 2,
        followingNum: 3,
        feeling: "心情简单",
        activeTab: 'article',
        loading: true,
        postArticles: [
          {
            publishTime: '2019/4/20',
            title: '修仙',
            content: '呜呜呜呜呜呜呜呜'
          },
          {
            publishTime: '2019/4/21',
            title: '一男子竟然。。。',
            content: '了解了坎坎坷坷'
          },
          {
            publishTime: '2019/4/22',
            title: '在机场当众',
            content: '我 i 了佛教认为'
          },
          {
            publishTime: '2019/4/23',
            title: '作出这种事',
            content: '喔呃我问老虎'
          },
        ],
        total: 0,
      }
    },
    methods:{
      loadMoreData: function(){
        let _this = this;
        // _this.$alert("那是真的牛皮!"+ _this.activeTab);
        if (_this.activeTab === 'article'){
          getRequest("/discussion/mine",+{
            page: 1,
            size: 100,//只展示最近一百条
            email: _this.email,
          }).then(resp=>{
            if (resp.data.code === 0){
              _this.postArticles = {};
              _this.postArticles = resp.data.data.list;
            }else{
              _this.$alert("数据错误");
            }
          })
        }
        else if (_this.activeTab === 'followed'){

        } else{

        }
      },
      loadProfile: function () {
        let _this = this;

        getRequest("/user",{
          email: _this.email,
          role: _this.role,
        })
          .then(resp=>{
            if(resp.data.code === 0){
              _this.followingNum = resp.data.data.followingNum;
              _this.followedNum = resp.data.data.followedNum;
            }else{
              _this.$alert("数据错误");
            }
          });
        if (_this.universityName === null){
          _this.universityName = '未知';
          _this.majorName = '未知';
          _this.role = '未认证用户';
        }
      }
    }
  }
</script>

