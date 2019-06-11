<template>
  <el-form :model="registerForm" :rules="rules" ref="registerForm" class="login-container" label-position="left"
           label-width="20px" >
    <h3 class="login_title">毕业生信息认证</h3>
    <el-row >
      <el-select v-model="listQuery.provinceId" placeholder="省份" class="filter-item"
                 @change="queryCity" >
        <el-option v-for="(item,index) in provinceList" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
    </el-row>

    <el-row>
      <el-select v-model="listQuery.cityName" placeholder="城市" class="filter-item" @change="queryUniversity" >
        <el-option v-for="(item,index) in cityList" :key="item.id" :label="item.name" :value="item.name" />
      </el-select>
    </el-row>

    <el-row>
      <el-select v-model="listQuery.universityName" placeholder="大学" class="filter-item" @change="queryMajor" >
        <el-option v-for="(item,index) in universityList" :key="item.id" :label="item.universityName" :value="item.universityName" />
      </el-select>
    </el-row>

    <el-row>
      <el-select v-model="listQuery.majorName" placeholder="专业" class="filter-item" @change="" >
        <el-option v-for="(item,index) in majorList" :key="item.id" :label="item.majorName" :value="item.majorName" />
      </el-select>
    </el-row>

    <el-row>
      <el-select v-model="listQuery.graduateYear" placeholder="毕业年份" class="filter-item" @change="" >
        <el-option v-for="(item,index) in yearList" :key="index" :label="item.year" :value="item.year" />
      </el-select>
    </el-row>

    <el-row>
      <el-input type="text" v-model="listQuery.companyName" placeholder="公司名称" style="width: 200px"></el-input>
    </el-row>

    <el-row>
      <el-select v-model="listQuery.level" placeholder="薪资">
        <el-option v-for="item in salaryLevel" :key="item.id" :label="item.range" :value="item.id"></el-option>
      </el-select>
    </el-row>

    <el-row>
      <el-input type="text" v-model="listQuery.position" placeholder="职位" style="width: 200px"></el-input>
    </el-row>

    <el-row>
      <el-button type="primary" @click.native.prevent="submit" >保存信息</el-button>
    </el-row>

  </el-form>
</template>

<script>
  import {getRequest, postRequest} from "../utils/api";

  export default {
    name: "InfoDetail",
    data(){
      return {
        provinceList: [
          {id: 11, name: "北京市"},
          {id: 12, name: "天津市"},
          {id: 13, name: "河北省"},
          {id: 14, name: "山西省"},
          {id: 15, name: "内蒙古自治区"},
          {id: 21, name: "辽宁省"},
          {id: 22, name: "吉林省"},
          {id: 23, name: "黑龙江省"},
          {id: 31, name: "上海市"},
          {id: 32, name: "江苏省"},
          {id: 33, name: "浙江省"},
          {id: 34, name: "安徽省"},
          {id: 35, name: "福建省"},
          {id: 36, name: "江西省"},
          {id: 37, name: "山东省"},
          {id: 41, name: "河南省"},
          {id: 42, name: "湖北省"},
          {id: 43, name: "湖南省"},
          {id: 44, name: "广东省"},
          {id: 45, name: "广西壮族自治区"},
          {id: 46, name: "海南省"},
          {id: 51, name: "四川省"},
          {id: 52, name: "贵州省"},
          {id: 53, name: "云南省"},
          {id: 54, name: "西藏自治区"},
          {id: 50, name: "重庆市"},
          {id: 61, name: "陕西省"},
          {id: 62, name: "甘肃省"},
          {id: 63, name: "青海省"},
          {id: 64, name: "宁夏回族自治区"},
          {id: 65, name: "新疆维吾尔自治区"}
        ],
        salaryLevel: [
          {id: 1, range: "1000-6000" },
          {id: 2, range: "6000-10000"},
          {id: 3, range: "10000-15000"},
          {id: 4, range: "15000-20000"},
          {id: 5, range: "20000-25000"},
          {id: 6, range: "25000-30000"},
          {id: 7, range: "30000-35000"},
          {id: 8, range: "35000-40000"},
        ],
        cityList: [],
        universityList: [],
        majorList: [],
        yearList: [
          {year: 2010},
          {year: 2011},
          {year: 2012},
          {year: 2013},
          {year: 2014},
          {year: 2015},
          {year: 2016},
          {year: 2017},
          {year: 2018},
          {year: 2019},
        ],
        listQuery: {
          provinceId: "",
          cityName: "",
          universityName: "",
          majorName: "",
          companyName: "",
          level: "",
          position: "",
          graduateYear: "",
        },
      }
    },
    methods: {
      queryCity(){
        getRequest("/city",{provinceId: this.listQuery.provinceId})
          .then(resp=> {
              this.cityList = resp.data.data;
            },
            resp=> {
              this.$alert('服务器繁忙');
            });
      },
      queryUniversity(){
        getRequest("/university",{city: this.listQuery.cityName})
          .then(resp=>{
              this.universityList = resp.data.data;
            },
            resp=>{
              this.$alert('服务器繁忙');
            });
      },
      queryMajor(){
        getRequest("/major",{universityName: this.listQuery.universityName})
          .then(resp=>{
              this.majorList = resp.data.data;
            },
            resp=>{
              this.$alert('服务器繁忙');
            });
      },
      submit(){
        postRequest("/user/becomeGraduate",
          {universityName: this.listQuery.universityName,
            majorName: this.listQuery.majorName,
            companyName: this.listQuery.companyName,
            salary: this.listQuery.level,
            position: this.listQuery.position,
            graduateYear: this.listQuery.graduateYear,
          },
          {token: sessionStorage.getItem("token")})
          .then(resp=>{
            if(resp.data.code === 0){
              this.$alert("认证成功");
            }else{
              this.$alert("认证失败");
            }
          },resp=>{
            this.$alert('服务器繁忙');
          });
      }
    }
  }
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 80px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
