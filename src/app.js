// var Vue = require('vue') ;
// var Router = require("vue-router");
require('./style/animate.css')
require('./style/style.css')
// require("./javascripts/test")


import Vue from 'vue'
import Router from 'vue-router'
// import { domain, fromNow } from './filters'
var App =  require('./components/App.vue')
import ListView from './components/ListView.vue'

// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
	'/ListView':{
		component:ListView
	}
})

router.start(App, '#app')