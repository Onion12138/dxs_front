<template>
  <div v-loading="loading">
    <div style="margin-top: 10px;display: flex;justify-content: center">
      <el-input
        placeholder="根据邮箱搜索用户..."
        prefix-icon="el-icon-search"
        v-model="keywords" style="width: 400px" size="small">
      </el-input>
      <el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 3px" @click="searchClick">搜索
      </el-button>
      <el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 3px" @click="searchClassmates">搜索同学
      </el-button>
    </div>
      <el-table
        ref="multipleTable"
        :data="discussions"
        tooltip-effect="dark"
        :stripe="true"
        style="width: 100%;overflow-x: hidden; overflow-y: hidden;"
        max-height="390"
        @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column
          label="邮箱" prop="email"
          width="200" align="left">
          <template slot-scope="scope"><span style="color: #409eff;cursor: pointer" @click="itemClick(scope.row)">{{ scope.row.title}}</span>
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          label="名称" prop="nickname"-->
<!--          width="140" align="left">-->
<!--          <template slot-scope="scope">{{ scope.row.publishTime | formatDateTime}}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          label="学校" prop="universityName"-->
<!--          width="140" align="left">-->
<!--          <template slot-scope="scope">{{ scope.row.lastEditTime | formatDateTime}}</template>-->
<!--        </el-table-column>-->
        <el-table-column
          prop="nickname"
          label="名称"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          prop="universityName"
          label="学校"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          prop="majorName"
          label="专业"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="年级"
          width="120" align="left">
        </el-table-column>
        <el-table-column label="操作" align="left" v-if="showEdit || showDelete">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleOpt1(scope.$index, scope.row)" v-if="scope.row.email === email">主页
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleOpt2(scope.$index, scope.row)" v-if="scope.row.email === email">举报
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

  export default{
    data() {
      return {
        classmates: [],
        // selItems: [],
        loading: false,
        pageNumber: 1,
        pageSize: 10,
        totalPages: -1,
        totalElements: 0,
        // keywords: '',
        // dustbinData: [],
        email: "",
      }
    },
    mounted: function () {
      let _this = this;
      this.loading = true;
      // this.email = sessionStorage.getItem('email');
      this.loadStudents(1, this.pageSize);
      window.bus.$on('studentTableReload', function () {
        _this.loading = true;
        _this.loadStudents(_this.pageNumber, _this.pageSize);
      })
    },
    watch: {
      activeName: function () {
        this.loadStudents(this.pageNumber,this.pageSize);
      }
    },
    methods: {
      searchClick(){
        this.loadStudents(1, this.pageSize);
      },
      itemClick(row){
        //个人主页
        this.$router.push({path: '/personalInfo', query: {id: row.id}})
      },
      handleCurrentChange(currentPage){
        this.pageNumber = currentPage;
        this.loading = true;
        this.loadStudents(currentPage, this.pageSize);
      },
      loadStudents(page, size){
        let _this = this;
        getRequest("/student/peers",
          {majorName: sessionStorage.getItem('token'),
            // property: _this.activeName,
            page: page,
            size: size,
          }).then(resp=> {
          _this.loading = false;
          if (resp.data.code === 0) {
            _this.classmates = resp.data.data.list;
            _this.totalPages = resp.data.data.pages;
            _this.totalElements = resp.data.data.size;
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
      handleOpt1(index, row) {
        this.$router.push({path: '/personalInfo', query: {from: this.activeName,id:row.id}});
      },
      handleOpt2(index, row) {
        // this.dustbinData.push(row.id);
        // this.deleteToDustBin(row.state);
        let _this = this;

      },
    },
    props: ['state', 'showEdit', 'showDelete', 'activeName']
  }
</script>


