<template>
  <el-container v-loading="loading" class="post-article">
    <el-header class="header">
      <el-input v-model="article.title" placeholder="请输入标题..." style="width: 400px;margin-left: 10px"></el-input>
      <el-tag
        :key="tag"
        v-for="tag in article.dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)" style="margin-left: 10px">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="tagInputVisible"
        v-model="tagValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" type="primary" size="small" @click="showInput">+Tag</el-button>
    </el-header>
    <el-main class="main">
      <div id="editor">
        <mavon-editor style="height: 100%;width: 100%;" ref=md @imgAdd="imgAdd"
                      @imgDel="imgDel" v-model="article.mdContent"></mavon-editor>
      </div>
      <div style="display: flex;align-items: center;margin-top: 15px;justify-content: flex-end">
        <el-button @click="cancelEdit" v-if="from!=undefined">放弃修改</el-button>
        <template v-if="from==undefined || from=='draft'">
          <el-button @click="saveBlog(0)">保存到草稿箱</el-button>
          <el-button type="primary" @click="saveBlog()">发表文章</el-button>
        </template>
        <template v-else="from==post">
          <el-button type="primary" @click="updateBlog()">保存修改</el-button>
        </template>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import {postRequest} from '../utils/api'
  import {putRequest} from '../utils/api'
  import {deleteRequest} from '../utils/api'
  import {getRequest} from '../utils/api'
  import {uploadFileRequest} from '../utils/api'
  // Local Registration
  import {mavonEditor} from 'mavon-editor'
  // 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象
  import 'mavon-editor/dist/css/index.css'
  import {isNotNullORBlank} from '../utils/utils'

  export default {
    mounted: function () {
      this.getCategories();
      var from = this.$route.query.from;
      this.from = from;
      var _this = this;
      if (from != null && from != '' && from != undefined) {
        this.article.id = this.$route.query.id;
        this.loading = true;
        getRequest("/discussion",{id: this.article.id}).then(resp=> {
          _this.loading = false;
          if (resp.status == 200) {
            _this.article = resp.data.data;
            var tags = resp.data.tags;
            _this.article.dynamicTags = [];
            //_this.article.mdContent = _this.article.mdContent;
            for (var i = 0; i < tags.length; i++) {
              _this.article.dynamicTags.push(tags[i].tagName)
            }
          } else {
            _this.$message({type: 'error', message: '页面加载失败!'})
          }
        }, resp=> {
          _this.loading = false;
          _this.$message({type: 'error', message: '页面加载失败!'})
        })
      }
    },
    components: {
      mavonEditor
    },
    methods: {
      cancelEdit(){
        this.$router.go(-1)
      },
      updateBlog(){
        if (!(isNotNullORBlank(this.article.title, this.article.mdContent))) {
          this.$message({type: 'error', message: '数据不能为空!'});
          return;
        }
        let _this = this;
        _this.loading = true;
        putRequest("/discussion",{
          id: _this.article.id,
          title: _this.article.title,
          mdContent: _this.article.mdContent,
          htmlContent: _this.$refs.md.d_render,
        },{token: sessionStorage.getItem("token")})
          .then(resp=>{
            _this.loading = false;
            if(resp.data.code === 0){
              _this.$alert("修改成功");
            }else{
              _this.$alert("修改失败");
            }
          },resp=>{
            _this.$alert("服务器繁忙");
          })
      },
      saveBlog(state){
        if (!(isNotNullORBlank(this.article.title, this.article.mdContent))) {
          this.$message({type: 'error', message: '数据不能为空!'});
          return;
        }
        let _this = this;
        _this.loading = true;
        postRequest("/discussion", {
          title: _this.article.title,
          mdContent: _this.article.mdContent,
          majorName: "软件工程",
          htmlContent: _this.$refs.md.d_render,
          // cid: _this.article.cid,
          // dynamicTags: _this.article.dynamicTags
        },{token: sessionStorage.getItem("token")})
          .then(resp=> {
          _this.loading = false;
          if (resp.status == 200 && resp.data.status == 'success') {
//             _this.article.id = resp.data.msg;
//             _this.$message({type: 'success', message: state == 0 ? '保存成功!' : '发布成功!'});
// //            if (_this.from != undefined) {
//             window.bus.$emit('blogTableReload')
// //            }
//             if (state == 1) {
//               _this.$router.replace({path: '/articleList'});
//             }
            _this.$alert("发表成功");
          }else{
            _this.alert("未知错误");
          }
        }, resp=> {
          _this.loading = false;
          _this.$message({type: 'error', message: state == 0 ? '保存草稿失败!' : '博客发布失败!'});
        })
      },

      getCategories(){
        let _this = this;
        getRequest("/admin/category/all").then(resp=> {
          _this.categories = resp.data;
        });
      },
      handleClose(tag) {
        this.article.dynamicTags.splice(this.article.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.tagInputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let tagValue = this.tagValue;
        if (tagValue) {
          this.article.dynamicTags.push(tagValue);
        }
        this.tagInputVisible = false;
        this.tagValue = '';
      }
    },
    data() {
      return {
        categories: [],
        tagInputVisible: false,
        tagValue: '',
        loading: false,
        from: '',
        article: {
          id: '',
          dynamicTags: [],
          title: '',
          mdContent: '',
          htmlContent: "",
          cid: '',
        }
      }
    }
  }
</script>
<style>
  .post-article > .main > #editor {
    width: 100%;
    height: 450px;
    text-align: left;
  }

  .post-article > .header {
    background-color: #ececec;
    margin-top: 10px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .post-article > .main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    background-color: #ececec;
    padding-top: 0px;
  }

  .post-article > .header > .el-tag + .el-tag {
    margin-left: 10px;
  }

  .post-article > .header > .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .post-article > .header > .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .post-article {
  }
</style>
