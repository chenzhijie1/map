import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)
// 项目整体框架
import Layout from '@/views/dasboard/index'
// 项目左侧菜单框架
import LeftLayout from '@/views/leftMenuDashboard/index'
import 'babel-polyfill'
import {
  Promise
} from 'es6-promise-polyfill'
const router = new Router({
  routes: [ //配置路由，这里是个数组
    {
      path: '/',
      redirect: '/login',
      hidden: true
    },
    {
      path: '/login',
      // 异步加载组件
      component: () => import("@/views/login/index"),
      hidden: true
    },
    {
      path: '/dasboard',
      meta: {
        title: '首页',
        icon: 'nested'
      },
      component: Layout,
      // hidden: false
      children: [{
          path: '/',
          meta: {
            title: '首页',
            icon: 'link'
          },
          component: () => import('@/views/map/index'),
          hidden: true
        },

      ]
    },
    {
      path: '/user',
      meta: {
        title: '用户管理',
        icon: 'link'
      },
      component: Layout,
      // hidden: false
      children: [{
          path: '/user',
          meta: {
            title: '人员信息',
            icon: 'link'
          },
          component: () => import('@/views/user/index'),
        },
        {
          path: '/user/role',
          meta: {
            title: '角色管理',
            icon: 'link'
          },
          component: () => import('@/views/user/roles'),
        },
        {
          path: '/user/role',
          meta: {
            title: '权限管理',
            icon: 'link'
          },
          component: () => import('@/views/user/roles'),
        },

      ]
    },
    {
      path: '/ol',
      meta: {
        title: '二维地图',
        icon: 'link'
      },
      component: Layout,
      left: true,
      children: [{
          path: '/ol',
          meta: {
            title: '地图控件',
            icon: 'link'
          },
          component: LeftLayout,
          children: [{
              path: '/ol',
              meta: {
                title: '鼠标位置',
                icon: 'link'
              },
              component: () => import('@/views/ol/mapControl/mousePosition'),
              children: []
            },
            {
              path: '/ol/overviewMap',
              meta: {
                title: '鹰眼图',
                icon: 'link'
              },
              component: () => import('@/views/ol/mapControl/overviewMap'),
              children: []
            },
            {
              path: '/ol/NavigationControls',
              meta: {
                title: '缩放至指定范围',
                icon: 'link'
              },
              component: () => import('@/views/ol/mapControl/NavigationControls'),
              children: []
            }
          ]
        },
        {
          path: '/menu2',
          meta: {
            title: '地图操作',
            icon: 'link'
          },
          component: LeftLayout,
          children: [{
              path: '/menu2/menu',
              meta: {
                title: '地图操作',
                icon: 'link'
              },
              component: () => import('@/views/menus/index'),
              children: []
            }, {
              path: '/menu2/menu2',
              meta: {
                title: '加载Geoserver服务',
                icon: 'link'
              },
              component: () => import('@/views/user/roles'),
            }, {
              path: '/menu2/menu3',
              meta: {
                title: '地图',
                icon: 'link'
              },
              component: () => import('@/views/user/overlay'),
            },
            {
              path: '/menu2/menu4',
              meta: {
                title: '地图卷帘',
                icon: 'link'
              },
              component: () => import('@/views/user/LayerSwipe'),
            },
            {
              path: '/menu2/menu5',
              meta: {
                title: '绘制',
                icon: 'link'
              },
              component: () => import('@/views/user/drawFeature'),
            },
            {
              path: '/menu2/menu6',
              meta: {
                title: 'VectorLayer',
                icon: 'link'
              },
              component: () => import('@/views/user/vectorLayer'),
            },
            {
              path: '/menu2/menu7',
              meta: {
                title: '弹窗',
                icon: 'link'
              },
              component: () => import('@/views/user/popup'),
            },
            {
              path: '/menu2/menu8',
              meta: {
                title: '选择要素',
                icon: 'link'
              },
              component: () => import('@/views/user/selectFeature'),
            },
            {
              path: '/menu2/menu9',
              meta: {
                title: '标记图标',
                icon: 'link'
              },
              component: () => import('@/views/user/icon'),
            }
          ]
        },
      ]
    },
    {
      path: '/cesium',
      meta: {
        title: '三维地图',
        icon: 'link'
      },
      component: Layout,
      left: true,
      children: [{
        path: '/cesium',
        meta: {
          title: '地图控件',
          icon: 'link'
        },
        component: LeftLayout,
        children: [{
          path: '/cesium',
          meta: {
            title: '鼠标位置',
            icon: 'link'
          },
          component: () => import('@/views/ol/mapControl/mousePosition'),
          children: []
        }]
      }]
    }
  ]
})

export default router
