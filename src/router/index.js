import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ArticleList from '@/components/ArticleList'
import CateMana from '@/components/CateMana'
import PostArticle from '@/components/PostArticle'
import UserMana from '@/components/UserMana'
import BlogDetail from '@/components/BlogDetail'
import Register from '@/components/Register'
import Reset from '@/components/Reset'
import LineChart from '@/components/LineChart'
import RingChart from '@/components/RingChart'
import MultiChart from '@/components/MultiChart'
import PieChart from '@/components/PieChart'
import PersonalInfo from '@/components/PersonalInfo'
import InfoDetail from "../components/InfoDetail";
import GraduateInfoDetail from "../components/GraduateInfoDetail";
import Test from "@/components/Test"
import SystemMessage from "@/components/SystemMessage"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      component: Test,
      hidden: true

    },
    {
      path: '/systemMessage',
      component: SystemMessage,
      hidden: true

    },
    {
      path: '/register',
      name: '注册',
      component: Register,
      hidden: true
    },
    {
      path: '/reset',
      name: '重置',
      component: Reset,
      hidden: true
    },
    {
      path: '/info',
      name: '信息',
      component: InfoDetail,
      hidden: true
    },
    //add
    {
      path: '/personalInfo',
      name: '个人主页',
      component: PersonalInfo,
      hidden: true
    },
    {
      path: '/graduateInfo',
      name: '毕业生信息',
      component: GraduateInfoDetail,
      hidden: true
    },
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: Login
    }, {
      path: '/home',
      name: '',
      component: Home,
      hidden: true
    }, {
      path: '/home',
      component: Home,
      name: '专业讨论区',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/articleList',
          name: '讨论区列表',
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        }, {
          path: '/postArticle',
          name: '发表讨论',
          component: PostArticle,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/blogDetail',
          name: '讨论详情',
          component: BlogDetail,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/editBlog',
          name: '编辑讨论',
          component: PostArticle,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '主页',
      children: [
        {
          path: '/user',
          iconCls: 'fa fa-user-o',
          name: '专业人脉',
          component: UserMana
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '专业详情',
      children: [
        {
          path: '/cateMana',
          iconCls: 'fa fa-reorder',
          name: '专业详情',
          component: CateMana
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '专业数据',
      iconCls: 'fa fa-bar-chart',
      children: [
        {
          path: '/linechart',
          name: '平均薪资',
          component: LineChart
        },
        {
          path: '/ringchart',
          name: '工作城市',
          component: RingChart
        },
        {
          path: '/multichart',
          name: '毕业选择',
          component: MultiChart
        },
        {
          path: '/piechart',
          name: '工作公司',
          component: PieChart
        }
      ]
    }
  ]
})
