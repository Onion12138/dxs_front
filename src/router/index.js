import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ArticleList from '@/components/ArticleList'
import PostArticle from '@/components/PostArticle'
import UserMana from '@/components/UserMana'
import Peers from '@/components/Peers'
import BlogDetail from '@/components/BlogDetail'
import Register from '@/components/Register'
import Reset from '@/components/Reset'
import LineChart from '@/components/LineChart'
import RingChart from '@/components/RingChart'
import MultiChart from '@/components/MultiChart'
import PieChart from '@/components/PieChart'
import PersonalInfo from '@/components/PersonalInfo'
import InfoDetail from '@/components/InfoDetail'
import Profile from '@/components/Profile'
import Begin from '@/components/Begin'
import OtherProfile from '@/components/OtherProfile'
import GraduateInfoDetail from "../components/GraduateInfoDetail";
import SystemMessage from "@/components/SystemMessage"
import CompanyList from "../components/CompanyList";
import Interview from "../components/Interview";
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
      name: "信息认证",
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
      component: Login,
      hidden: true
    }, {
      path: '/home',
      name: '',
      component: Home,
      hidden: true
    }, {
      path: '/home',
      name: '系统消息',
      component: Home,
      hidden: true,
      children: [
        {
          path: '/systemMessage',
          name: '系统消息',
          component: SystemMessage,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/begin',
          name: '开始页',
          component: Begin,
          hidden: true
        },
        {
          path: '/personalInfo',
          name: '个人信息',
          component: PersonalInfo,
          hidden: true
        },{
          path: '/profile',
          name: '我的主页',
          component: Profile,
          hidden: true
        },{
          path: '/otherProfile',
          name: '他的主页',
          component: OtherProfile,
          hidden: true
        },{
          path: '/homeInfo',
          name: '在校生信息认证',
          component: InfoDetail,
          hidden: true
        },{
          path: '/homeGraduateInfo',
          name: '毕业生信息认证',
          component: GraduateInfoDetail,
          hidden: true
        },{
          path: '/homeReset',
          name: '重置密码',
          component: Reset,
          hidden: true
        }

      ]
    },
    {
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
      name: '专业人脉',
      iconCls: 'fa fa-user-o',
      children: [
        {
          path: '/classmates',
          name: '同学校&专业',
          component: UserMana,
          meta: {
            keepAlive: true
          }
        },{
          path: '/peers',
          name: '同专业',
          component: Peers,
          meta: {
            keepAlive: false
          }
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '专业就业',
      iconCls: 'fa fa-reorder',
      children: [
        {
          path: '/companyList',
          iconCls: 'fa fa-reorder',
          name: '热门公司',
          component: CompanyList
        },
        {
          path: '/interview',
          name: '面试经验',
          component: Interview,
          hidden: true,
          meta: {
            keepAlive: false
          }
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
