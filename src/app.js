require('normalize.css')
require('./style/animate.css')
require('./lib/lib-flexible/flexible.css')
require('./lib/lib-flexible/flexible.js')


var Vue = require("vue")
import Router from 'vue-router'
// import { domain, fromNow } from './filters'
import App from './components/App.vue'
import ListView from './components/ListView.vue'
Vue.transition('trans', {
		enterClass: 'slideInRight',
		leaveClass: 'slideOutRight'
	})
	// install router
Vue.use(Router)

// routing
var router = new Router({
	transitionOnLoad: false
})

router.map({
	'/ListView': {
		component: ListView
	},
	'/test': {
		component: ListView
	}
})

router.start(App, '#app')