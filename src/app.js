// var Vue = require('vue') ;
// var Router = require("vue-router");
require('./style/animate.css')
require('./style/style.css')
	// require("./javascripts/test")

var Vue = require("vue")
import Router from 'vue-router'
// import { domain, fromNow } from './filters'
import App from './components/App.vue'
import ListView from './components/ListView.vue'
Vue.transition('trans', {
  enterClass: 'bounceInRight',
  leaveClass: 'bounceOutRight'
})
// install router
Vue.use(Router)

// routing
var router = new Router({transitionOnLoad: false})

router.map({
	'/ListView': {
		component: ListView
	},
	'/test': {
		component: ListView
	}
})

router.start(App, '#app')