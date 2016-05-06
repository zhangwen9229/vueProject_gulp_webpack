require('normalize.css')
require('./style/animate.css')
require('./lib/lib-flexible/flexible.css')
require('./lib/lib-flexible/flexible.js')



var Vue = require("vue")
import Router from 'vue-router'
// import { domain, fromNow } from './filters'
import App from './components/App.vue'
import ListView from './components/ListView.vue'

import HomePage from './components/HomePage.vue'
Vue.transition('trans', {
		enterClass: 'slideInRight',
		leaveClass: 'slideOutRight'
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
		component: HomePage
	},
	'/ListView': {
		component: ListView
	}
})

router.start(App, '#app')