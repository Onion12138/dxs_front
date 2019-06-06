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
import InfoDetail from "../components/InfoDetail";
import GraduateInfoDetail from "../components/GraduateInfoDetail";

Vue.use(Router)

export default new Router({
  routes: [
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
      name: '文章管理',
      iconCls: 'fa fa-file-text-o',
      children: [
        {
          path: '/articleList',
          name: '文章列表',
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        }, {
          path: '/postArticle',
          name: '发表文章',
          component: PostArticle,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/blogDetail',
          name: '博客详情',
          component: BlogDetail,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/editBlog',
          name: '编辑博客',
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
      name: '用户管理',
      children: [
        {
          path: '/user',
          iconCls: 'fa fa-user-o',
          name: '用户管理',
          component: UserMana
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '栏目管理',
      children: [
        {
          path: '/cateMana',
          iconCls: 'fa fa-reorder',
          name: '栏目管理',
          component: CateMana
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '数据统计',
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
