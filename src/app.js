require('normalize.css')
require('./style/animate.css')
require('./lib/lib-flexible/flexible.css')
require('./lib/lib-flexible/flexible.js')
require('./lib/zepto/zepto.min.js')



var Vue = require("vue")
import Router from 'vue-router'
// import { domain, fromNow } from './filters'
import App from './components/App.vue'
import ListView from './components/ListView.vue'
import My from './components/rootviews/My.vue'

import HomePage from './components/HomePage.vue'
Vue.transition('trans', {
	enterClass: 'slideInRight',
	leaveClass: 'slideOutRight'
})

Vue.transition('expand', {
	css: false,
	beforeEnter: function(el) {
		$(el).removeClass("slideOutLeft").addClass("slideInRight");
	},
	enter: function(el) {

	},
	afterEnter: function(el) {

	},
	enterCancelled: function(el) {
		// handle cancellation
	},

	beforeLeave: function(el) {},
	leave: function(el, done) {
		$(el).removeClass("slideInRight").addClass("slideOutLeft");
		// $(el).animate({ opacity: 0 }, 1000, done)
		setTimeout(function(){
			done();
		},800)
		
	},
	afterLeave: function(el) {

	},
	leaveCancelled: function(el) {
		// handle cancellation
	}
})

// install router
Vue.use(Router)
var router = new Router({
	transitionOnLoad: false
})

router.afterEach(function(transition) {
		// com.jugeStyle();
		console.log('成功浏览到: ' + transition.to.path)
	})
	// routing

router.map({
	'/': {
		component: HomePage,
		subRoutes: {
			'/': {
				// 当匹配到/foo/bar时，会在Foo's <router-view>内渲染
				// 一个Bar组件
				component: ListView
			},
			'/my': {
				component: My
			}
		}
	},
	'/ListView': {
		component: ListView
	}
})

router.start(App, '#app')