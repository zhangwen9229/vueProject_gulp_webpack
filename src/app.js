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
// var test = require('./views/ListView')
import testview from './views/ListView'

var template = require('./components/test.html');
var MyComponent = Vue.extend({
  template: template,
  data(){
  	return {
  		viewName:"list in appj55"
  	}
  }
})

// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
	'/ListView': {
		component: ListView
	},
	'/test': {
		component: testview
	}
})

router.start(App, '#app')