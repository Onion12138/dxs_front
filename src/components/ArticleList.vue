<template>
  <el-container class="article_list">
    <el-main class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="最新发布" name="publishTime">
          <blog_table state="-1" :showEdit="false" :showDelete="true" :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane label="最新编辑" name="lastEditTime">
          <blog_table state="1" :showEdit="true" :showDelete="true" :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane label="最热" name="visits">
          <blog_table state="0" :showEdit="true" :showDelete="true" :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane label="精华" name="thumbs">
          <blog_table state="2" :showEdit="false" :showDelete="true" :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane label="我关注的" name="follow">
        <blog_table state="-2" :showEdit="false" :showDelete="true" :activeName="activeName"></blog_table>
        </el-tab-pane>
        <el-tab-pane label="我发布的" name="mine">
          <blog_table state="-3" :showEdit="false" :showDelete="true" :activeName="activeName"></blog_table>
        </el-tab-pane>
      </el-tabs>
    </el-main>


  </el-container>

</template>
<script>
  import BlogTable from '@/components/BlogTable'
  export default {
    mounted: function () {

    },
    data() {
      return {
        activeName: 'publishTime',
        isAdmin: false
      };
    },
    methods: {
      handleClick(tab, event) {
//        console.log(tab, event);
      }
    },
    components: {
      'blog_table': BlogTable,
    }
  };
</script>
<style>
  .article_list > .header {
    background-color: #ececec;
    margin-top: 10px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .article_list > .main {
    display: flex;
    flex-direction: column;
    padding-left: 0px;
    background-color: #fff;
    padding-top: 0px;
    margin-top: 8px;
  }
</style>
