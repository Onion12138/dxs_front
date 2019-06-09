<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

    <el-table
      :data="tableData1"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

    <el-table
      :data="tableData3"
      style="width: 100%"
      row-key="commentId"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="content"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lastEditTime"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData3: [
          {"children":[],
            "discussionId":"1559916623416473477","commentId":"1559962874934112068","parentId":"1559963158151170132","content":"mybatis框架和jpa那个更好？","email":"969023017@qq.com","lastEditTime":1559883600000},
          {"children":[],
            "discussionId":"1559916623416473477","commentId":"1559963017608792271","parentId":null,"content":"vue.js是最好的框架","email":"969023017@qq.com","lastEditTime":1559883600000},
          {"children":[{"discussionId":"1559916623416473477","commentId":"1559962874934112068","parentId":"1559963158151170132","content":"mybatis框架和jpa那个更好？","email":"969023017@qq.com","lastEditTime":1559883600000},
              {"discussionId":"1559916623416473477","commentId":"1559964917691831887","parentId":"1559963158151170132","content":"上面的都是我儿。圆周率是3.1415926535697932384626","email":"969023014@qq.com","lastEditTime":1559883600000}],
            "discussionId":"1559916623416473477","commentId":"1559963158151170132","parentId":null,"content":"mybatis与data jpa哪个更好？","email":"969023017@qq.com","lastEditTime":1559883600000},
          {"children":[],
              "discussionId":"1559916623416473477","commentId":"1559964917691831887","parentId":"1559963158151170132","content":"上面的都是我儿。圆周率是3.1415926535697932384626","email":"969023014@qq.com","lastEditTime":1559883600000}],
        tableData:[{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData1: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 1000)
      }
    },
  }
</script>
