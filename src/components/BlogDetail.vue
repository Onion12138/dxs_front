<template>
  <el-row v-loading="loading">
    <el-col :span="24">
      <div style="text-align: left;">
        <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <div>
        <div><h3 style="margin-top: 0px;margin-bottom: 0px">{{discussion.title}}</h3></div>
        <div style="width: 100%;margin-top: 5px;display: flex;justify-content: flex-end;align-items: center">
          <div style="display: inline; color: #20a0ff;margin-left: 50px;margin-right:20px;font-size: 12px;">
            发表人:{{discussion.nickname}}
          </div>
          <div style="color: #20a0ff;margin-right:20px;font-size: 12px;">浏览次数 {{discussion.visits}}</div>
          <div style="color: #20a0ff;margin-right:20px;font-size: 12px;">发表时间 {{publish}}</div>
          <div style="color: #20a0ff;margin-right:20px;font-size: 12px;">修改时间 {{edit}}</div>
<!--          <el-tag type="success" v-for="(item,index) in discussion.tags" :key="index" size="small"-->
<!--                  style="margin-left: 8px">{{item.tagName}}-->
<!--          </el-tag>-->
          <span style="margin:0px 50px 0px 0px"></span>
        </div>
      </div>
    </el-col>
    <el-col>
      <div style="text-align: left" v-html="discussion.htmlContent">
      </div>
    </el-col>
  </el-row>

</template>
<script>
  import {getRequest} from '../utils/api'
  import {formatDate} from "../utils/filter_utils";
  export default{
    methods: {
      goBack(){
        this.$router.go(-1);
      }
    },
    mounted: function () {
      let discussionId = this.$route.query.id;
      //this.activeName = this.$route.query.an
      var _this = this;
      this.loading = true;
      getRequest("/discussion",{id: discussionId}).then(resp=> {
        if (resp.status == 200) {
          _this.discussion = resp.data.data;
        }
        else{
          _this.$alert("找不到文章");
        }
        _this.loading = false;
      }, resp=> {
        _this.loading = false;
        _this.$message({type: 'error', message: '页面加载失败!'});
      });
    },
    data(){
      return {
        discussion: {
          id: "",
          title: "",
          mdContent: "",
          htmlContent: "",
          majorName: "",
          publishTime: "",
          lastEditTime: "",
          email: "",
          nickname: "",
          visits: "",
          comments: "",
          thumbs: "",
        },
        loading: false,
        activeName: ''
      }
    },
    computed:{
      publish: function () {
          return formatDate(this.discussion.publishTime);
      },
      edit: function () {
          return formatDate(this.discussion.lastEditTime);
      }
    }
  }
</script>
