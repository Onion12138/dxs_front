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
<!--        <i style="width: 50%;margin-top: 5px;display: flex;justify-content: flex-end;align-items: center">-->
<!--          <div style="display: inline; color: #20a0ff;margin-left: 50px;margin-right:20px;font-size: 12px;">-->
<!--            发表人:{{discussion.nickname}}-->
<!--          </div>-->
        <i style="display: inline; color: #20a0ff;margin-left: 200px;margin-right:200px;font-size: 18px;">
          <i class="el-icon-user">{{discussion.nickname}}</i>
<!--          <div style="color: #20a0ff;margin-right:20px;font-size: 12px;">浏览次数 {{discussion.visits}}</div>-->
          <i class="el-icon-view"> {{discussion.visits}} </i>
<!--          <div style="color: #20a0ff;margin-right:20px;font-size: 12px;">发表时间 {{publish}}</div>-->
          <i class="el-icon-timer"> {{publish}}</i>
          <i class="el-icon-edit">{{edit}}</i>
<!--          <div style="color: #20a0ff;margin-right:20px;font-size: 12px;">修改时间 {{edit}}</div>-->
<!--          <el-tag type="success" v-for="(item,index) in discussion.tags" :key="index" size="small"-->
<!--                  style="margin-left: 8px">{{item.tagName}}-->
<!--          </el-tag>-->
          <span style="margin:0px 50px 0px 0px"></span>
        </i>
      </div>
    </el-col>
    <el-col>
      <div style="text-align: left" v-html="discussion.htmlContent">
      </div>
    </el-col>
    <el-col>
      <el-button type="primary" icon="el-icon-edit" v-if="discussion.email===user" @click="handleEdit">编辑</el-button>
      <el-button type="danger" icon="el-icon-delete" v-if="discussion.email===user" @click="handleDelete">删除</el-button>
      <el-button type="primary" icon="el-icon-star-off" v-if="discussion.email!==user && !star" @click="handleStar">点赞</el-button>
      <el-button type="primary" icon="el-icon-star-on" v-if="discussion.email!==user && star">你已赞过</el-button>
      <el-button type="primary" icon="el-icon-chat-dot-round" v-if="discussion.email!==user && !reply" @click="handleComment">回复</el-button>
      <el-button type="primary" icon="el-icon-chat-line-square" v-if="discussion.email!==user && reply" @click="handleConfirm">确认回复</el-button>
    </el-col>
    <el-col>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="content"
        v-if="reply">
      </el-input>
    </el-col>
    <el-col>
      <el-table
        ref="multipleTable"
        :data="comments"
        tooltip-effect="dark"
        :stripe="true"
        row-key="commentId"
        :tree-props="{children:'children'}"
        style="width: 100%;overflow-x: hidden; overflow-y: hidden;"
        max-height="390"
        @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column
          label="内容" prop="comment.content"
          width="600" align="left">
          <template slot-scope="scope"><span style="color: #409eff;cursor: pointer" @click="itemClick(scope.row)">{{ scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间" prop="lastEditTime"
          width="140" align="left">
          <template slot-scope="scope">{{ scope.row.lastEditTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="作者"
          width="120" align="left">
        </el-table-column>

        <el-table-column label="操作" align="left" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.email === user">编辑
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.email !== user">回复
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>


</template>
<script>
  import {getRequest, postRequest, putRequest} from '../utils/api'
  import {formatDate} from "../utils/filter_utils";
  import {deleteRequest} from "../utils/api";
  export default{
    methods: {
      goBack(){
        this.$router.go(-1);
        window.bus.$emit('blogTableReload');
      },
      handleEdit: function () {
        this.$router.push({path: '/editBlog', query: {from: "detail",id:this.discussion.id}});
      },
      handleDelete: function () {
        let _this = this;
        deleteRequest('/discussion',{id:this.discussion.id})
          .then(resp=>{
            if(resp.data.code === 0){
              _this.$alert("删除成功");
              window.bus.$emit('blogTableReload');
            }else{
              _this.$alert('删除失败');
            }},resp=>{
            _this.$alert('服务器繁忙');
          });
        _this.$router.push({path: '/articleList'});
      },
      handleStar: function () {
        this.star = true;
        putRequest('/discussion/thumb',{},{id:this.discussion.id});
        window.bus.$emit('blogTableReload');
      },
      handleComment: function () {
        this.content = "";
        this.reply = true;
      },
      handleConfirm: function () {
        let _this = this;
        if(this.content !== "") {
          postRequest('/discussion/comment', {
            discussionId: _this.discussion.id,
            email: sessionStorage.getItem("email"),
            content: _this.content,
          }).then(resp => {
            if (resp.data.code === 0) {
              _this.$alert("评论成功");
              window.bus.$emit('blogTableReload');
            } else {
              _this.$alert("评论失败");
            }
          }, resp => {
            _this.$alert('服务器繁忙');
          });
          _this.reply = false;
        }
        else{
          _this.$alert("评论不能为空");
        }
      }
    },
    mounted: function () {
      let discussionId = this.$route.query.id;
      //this.activeName = this.$route.query.an
      var _this = this;
      this.loading = true;
      this.user = sessionStorage.getItem("email");
      getRequest("/discussion",{id: discussionId}).then(resp=> {
        if (resp.data.code === 0) {
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
      getRequest("/discussion/comment",{id: discussionId}).then(resp=> {
        if (resp.data.code === 0) {
          _this.comments = resp.data.data.list;
          _this.$alert(_this.comments);

        }
        else{
          _this.$alert("找不到评论");
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
        comments: [],
        loading: false,
        activeName: '',
        user: "",
        star: false,
        reply: false,
        content: "",
      }
    },
    computed:{
      publish: function () {
          return formatDate(this.discussion.publishTime);
      },
      edit: function () {
          return formatDate(this.discussion.lastEditTime);
      }
    },
  }
</script>
