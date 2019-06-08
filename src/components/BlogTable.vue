<style type="text/css">
  .blog_table_footer {
    display: flex;
    box-sizing: content-box;
    padding-top: 10px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    justify-content: space-between;
  }
</style>
<template>
  <div>
    <div style="display: flex;justify-content: flex-start">
      <el-input
        placeholder="通过标题搜索该分类下的博客..."
        prefix-icon="el-icon-search"
        v-model="keywords" style="width: 400px" size="mini">
      </el-input>
      <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 3px" @click="searchClick">搜索
      </el-button>
    </div>
    <!--<div style="width: 100%;height: 1px;background-color: #20a0ff;margin-top: 8px;margin-bottom: 0px"></div>-->
    <el-table
      ref="multipleTable"
      :data="discussions"
      tooltip-effect="dark"
      :stripe="true"
      style="width: 100%;overflow-x: hidden; overflow-y: hidden;"
      max-height="390"
      @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column
        label="标题" prop="title"
        width="200" align="left">
        <template slot-scope="scope"><span style="color: #409eff;cursor: pointer" @click="itemClick(scope.row)">{{ scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间" prop="publishTime"
        width="140" align="left">
        <template slot-scope="scope">{{ scope.row.publishTime | formatDateTime}}</template>
      </el-table-column>
      <el-table-column
        label="最近编辑时间" prop="lastEditTime"
        width="140" align="left">
        <template slot-scope="scope">{{ scope.row.lastEditTime | formatDateTime}}</template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="作者"
        width="120" align="left">
      </el-table-column>
      <el-table-column
        prop="visits"
        label="浏览数"
        width="120" align="left">
      </el-table-column>
      <el-table-column
        prop="comments"
        label="评论数"
        width="120" align="left">
      </el-table-column>
      <el-table-column
        prop="thumbs"
        label="点赞数"
        width="120" align="left">
      </el-table-column>
      <el-table-column label="操作" align="left" v-if="showEdit || showDelete">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.email === email">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.email === email">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    <div class="blog_table_footer">-->
<!--      <el-button type="danger" size="mini" style="margin: 0px;" v-show="this.articles.length>0 && showDelete"-->
<!--                 :disabled="this.selItems.length==0" @click="deleteMany">批量删除-->
<!--      </el-button>-->
<!--      <span></span>-->
      <el-pagination
        background
        :page-size="pageSize"
        :page-count="totalPages"
        :pager-count="7"
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange" v-show="true">
      </el-pagination>
<!--    </div>-->
  </div>
</template>
<script>
  import {deleteRequest, putRequest} from '../utils/api'
  import {getRequest} from '../utils/api'
  import Vue from 'vue'
//  var bus = new Vue()

  export default{
    data() {
      return {
        discussions: [],
        selItems: [],
        loading: false,
        pageNumber: 1,
        pageSize: 5,
        totalPages: -1,
        totalElements: 0,
        keywords: '',
        dustbinData: [],
        email: "",
      }
    },
    mounted: function () {
      let _this = this; //修改
      this.loading = true;
      this.email = sessionStorage.getItem('email');
      this.loadBlogs(1, this.pageSize);
      window.bus.$on('blogTableReload', function () {
         _this.loading = true;
         _this.loadBlogs(_this.pageNumber, _this.pageSize);
       })
    },
    watch: {
        activeName: function () {
          this.loadBlogs(this.pageNumber,this.pageSize);
        }
    },
    methods: {
      searchClick(){
        this.loadBlogs(1, this.pageSize);
      },
      itemClick(row){
        this.$router.push({path: '/blogDetail', query: {id: row.id}})
      },
      handleCurrentChange(currentPage){
        this.pageNumber = currentPage;
        this.loading = true;
        this.loadBlogs(currentPage, this.pageSize);
      },
      loadBlogs(page, size){
        let _this = this;
        getRequest("/discussion/all",
          {majorName: sessionStorage.getItem('majorName'),
            property: _this.activeName,
            page: page,
            size: size,
          }).then(resp=> {
          _this.loading = false;
          if (resp.data.code === 0) {
            _this.discussions = resp.data.data.content;
            _this.totalPages = resp.data.data.totalPages;
            _this.totalElements = resp.data.data.totalElements;
          } else {
            _this.$message({type: 'error', message: '查询出错!'});
          }
        }, resp=> {
          _this.loading = false;
          _this.$message({type: 'error', message: '数据加载失败!'});
        }).catch(resp=> {
          //压根没见到服务器
          _this.loading = false;
          _this.$message({type: 'error', message: '服务器错误!'});
        })
      },
      handleSelectionChange(val) {
        this.selItems = val;
      },
      handleEdit(index, row) {
        this.$router.push({path: '/editBlog', query: {from: this.activeName,id:row.id}});
      },
      handleDelete(index, row) {
        // this.dustbinData.push(row.id);
        // this.deleteToDustBin(row.state);
        let _this = this;
        deleteRequest('/discussion',{id:row.id})
          .then(resp=>{
            if(resp.data.code === 0){
              _this.$alert("删除成功");
              window.bus.$emit('blogTableReload');
            }else{
              _this.$alert('删除失败');
            }},resp=>{
              _this.$alert('服务器繁忙');
          });
      },
    },
     props: ['state', 'showEdit', 'showDelete', 'activeName']
  }
</script>
