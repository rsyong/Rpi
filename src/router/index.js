import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Forget from '../components/login/Forget'
import Register from '../components/login/Register'

import index from '../components/page/index'
import Pageshow from '../components/page/Pageshow'
import apiAdmin from '../components/page/apiAdmin'
Vue.use(Router)

export default new Router({
//	history:true,
mode: 'history',
	routes: [{
			path: '/',
			name: '登录',
			component: Login
		},
		{
			path: '/login/Forget',
			name: '忘记密码',
			component: Forget
		},
		{
			path: '/login/Register',
			name: '注册账号',
			component: Register
		},
		{
			path: '/index',
			name: 'index',
			component: index,
			redirect:'/index/Pageshow',
			children:[{
				path: '/index/Pageshow',
				name: '项目首页',
				component: Pageshow
			},{
				path: '/index/apiAdmin',
				name: '项目管理',
				component: apiAdmin
			}]
		}
	]
})