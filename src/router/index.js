import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/home'
import mailList from '../pages/mailList/mailList'
import department from '../pages/department/department'
import token from '../pages/token/token'

import memberInfo from '../pages/memberInfo/memberInfo'
import duanXin from '../pages/DuanXin/duanxin'
import faDuanXin from '../pages/faDuanXin/faduanxin'
import daiBanFaWen from '../pages/daiBanFaWen/daiBanFaWen'
import daiBanShouWen from '../pages/daiBanShouWen/daiBanShouWen'
import faWenXiangQing from '../pages/faWenXiangQing/faWenXiangQing'
import faWenXiangQing2 from '../pages/faWenXiangQing/faWenXiangQing2'
import faWenXiangQing3 from '../pages/faWenXiangQing/faWenXiangQing3'
import shouWenXiangQing from '../pages/shouWenXiangQing/shouWenXiangQing'
import shouWenXiangQing2 from '../pages/shouWenXiangQing/shouWenXiangQing2'
import test from '../pages/test/test'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'token',
      component: token,
      meta: {
        title: '获取token'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '移动OA'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {
        title: '测试'
      }
    },
    {
      path: '/mailList',
      name: 'mailList',
      component: mailList,
      meta: {
        title: '通讯录'
      }
    },
    {
      path: '/department',
      name: 'department',
      component: department,
      meta: {
        title: '通讯录'
      }
    },

    {
      path: '/memberInfo',
      name: 'memberInfo',
      component: memberInfo,
      meta: {
        title: '通讯录'
      }
    },
    {
      path: '/duanxin',
      name: 'duanXin',
      component: duanXin,
      meta: {
        title: '短信'
      }
    },
    {
      path: '/faduanxin',
      name: 'faDuanXin',
      component: faDuanXin,
      meta: {
        title: '发短信'
      }
    },
    {
      path: '/daibanfawen',
      name: 'daiBanFaWen',
      component: daiBanFaWen,
      meta: {
        title: '待办发文'
      }
    },
    {
      path: '/daibanshouwen',
      name: 'daiBanShouWen',
      component: daiBanShouWen,
      meta: {
        title: '待办收文'
      }
    },
    {
      path: '/fawenxiangqing',
      name: 'faWenXiangQing',
      component: faWenXiangQing,
      meta: {
        title: '发文详情'
      }
    },
    {
      path: '/fawenxiangqing2',
      name: 'faWenXiangQing2',
      component: faWenXiangQing2,
      meta: {
        title: '发文详情'
      }
    },
    {
      path: '/fawenxiangqing3',
      name: 'faWenXiangQing3',
      component: faWenXiangQing3,
      meta: {
        title: '发文详情'
      }
    },
    {
      path: '/shouwenxiangqing',
      name: 'shouWenXiangQing',
      component: shouWenXiangQing,
      meta: {
        title: '收文详情'
      }
    },
    {
      path: '/shouwenxiangqing2',
      name: 'shouWenXiangQing2',
      component: shouWenXiangQing2,
      meta: {
        title: '收文详情'
      }
    },
    {
      path: '/token',
      name: 'shouWenXiangQing',
      component: token,
      meta: {
        title: '获取token'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
