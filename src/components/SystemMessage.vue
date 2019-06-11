<template>
  <el-row>
    <el-radio-group v-model="radio" @change="handleRadio">
      <el-radio :label="1">仅看未读</el-radio>
      <el-radio :label="2">查看全部</el-radio>
<!--      <el-radio :label="3">仅看最近1天</el-radio>-->
    </el-radio-group>
  <el-table
    ref="multipleTable"
    :data="messages"
    tooltip-effect="dark"
    :stripe="true"
    style="width: 100%;overflow-x: hidden; overflow-y: hidden;"
    max-height="390"
    @selection-change="handleSelectionChange" >
    <el-table-column type="selection" width="60"> </el-table-column>
    <el-table-column
      label="消息" prop="message"
      width="600" align="left">
    </el-table-column>
    <el-table-column
      label="时间" prop="publish"
      width="200" align="left">
      <template slot-scope="scope">{{ scope.row.publish | formatDateTime}}</template>
    </el-table-column>
    <el-table-column
      label="状态" prop="handle"
      width="100" align="left">
      <template slot-scope="scope">{{ scope.row.handle | handleFilter}}</template>
    </el-table-column>
  </el-table>
    <el-button type="success" @click="handleMessageAll">全部已读</el-button>
    <el-button type="primary"  @click="handleMessage" :disabled="item.length===0">选中已读</el-button>
    <el-button type="warning"  @click="handleDelete" :disabled="item.length===0">删除选中</el-button>
    <el-button type="danger"  @click="handleDeleteAll">删除全部</el-button>
    <el-pagination
      background
      :page-size="pageSize"
      :pager-count="7"
      :total="totalCount"
      layout="prev, pager, next, jumper"
      @current-change="handlePage">
    </el-pagination>
  </el-row>
</template>

<script>
  import {deleteRequest, getRequest, putRequest} from "../utils/api";

    export default {
        mounted: function() {
          let _this = this;
          this.loadMessage(1, _this.pageSize);
          window.bus.$on('messageReload', function () {
            _this.loadMessage(1, _this.pageSize);
          });
        },
        data: function () {
          return {
            messages: [],
            radio: 1,
            page: 1,
            pageSize: 5,
            totalCount: 0,
            item: [],
          }
        },
        methods:{
          handleRadio: function () {
            window.bus.$emit('messageReload');
          },
          handlePage: function (currentPage) {
            this.loadMessage(currentPage, this.pageSize);
          },
          handleMessage: function(){
            let _this = this;
            let idList = "";
            for(let i = 0; i < this.item.length; i++){
              idList += this.item[i].id + "&";
            }
            putRequest("/message",{},{id: idList})
              .then(resp=>{
                if (resp.data.code === 0) {
                  _this.$alert("操作成功");
                  window.bus.$emit('messageReload');
                } else {
                  _this.$alert("操作失败");
                }
              });

          },
          handleMessageAll: function(){
            let _this = this;
            putRequest("/message/all",{},{email: sessionStorage.getItem("email")})
              .then(resp=>{
                if (resp.data.code === 0) {
                  _this.$alert("操作成功");
                  window.bus.$emit('messageReload');
                } else {
                  _this.$alert("操作失败");
                }
              });
          },
          handleDelete: function(){
            let idList = "";
            let _this = this;
            for(let i = 0; i < this.item.length; i++){
              idList += this.item[i].id + "&";
            }
            deleteRequest("/message",{id: idList})
              .then(resp=>{
              if (resp.data.code === 0) {
                _this.$alert("删除成功");
                window.bus.$emit('messageReload');
              } else {
                _this.$alert("删除失败");
              }
            });
          },
          handleDeleteAll: function(){
            let _this = this;
            deleteRequest("/message/all",{email: sessionStorage.getItem("email")})
              .then(resp=>{
                if (resp.data.code === 0) {
                  _this.$alert("删除成功");
                  window.bus.$emit('messageReload');
                } else {
                  _this.$alert("删除失败");
                }
              });
          },
          loadMessage: function (page, size) {
            let _this = this;
            if(_this.radio === 1) {
              getRequest("/message",
                {email: sessionStorage.getItem("email"),
                page: page,
                size: size})
                .then(resp => {
                  if (resp.data.code === 0) {
                    _this.messages = resp.data.data.list;
                    _this.totalCount = resp.data.data.total;
                  } else {
                    _this.$alert("暂无消息");
                  }
                })
            }else{
              getRequest("/message/all",
                {email: sessionStorage.getItem("email"),
                  page: page,
                  size: size})
                .then(resp => {
                  if (resp.data.code === 0) {
                    _this.messages = resp.data.data.list;
                    _this.totalCount = resp.data.data.total;
                  } else {
                    _this.$alert("暂无消息");
                  }
                })
            }
          },
          handleSelectionChange: function (value) {
            this.item  = value;
          }
        }
    }
</script>

<style scoped>

</style>
