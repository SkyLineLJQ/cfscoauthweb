const Vue = require('vue')
const VueRouter = require('vue-router')


const routes = [
  {
    path: '/',
    name: 'OauthLogin',
    redirect: '/cfsauth/login',
    component: () => import('../views/OauthLogin')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About')
  },
  {
    path: '/cfsauth/login',
    name: 'OauthLogin',
    component: () => import('../views/OauthLogin')
  },
  {
    path: '/cfsauth/Home',
    name: 'PortalHome',
    component: () => import('../views/PortalHome')
  },
  {
    name: '404',
    path: '/404',
    component: () => import('../components/NotFound')
  },
  {
    path: '*',    // 此处需特别注意至于最底部
    redirect: '/cfsauth/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
