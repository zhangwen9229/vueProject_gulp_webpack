require('normalize.css')
require('./style/animate.css')
require('./lib/lib-flexible/flexible.css')
require('./lib/lib-flexible/flexible.js')
require('./lib/zepto/zepto.min.js')



var Vue = require("vue")
window.Vue = Vue;
import Router from 'vue-router'
// import { domain, fromNow } from './filters'
import App from './components/App.vue'
import ListView from './components/ListView.vue'
import My from './components/rootviews/My.vue'
import Test from './components/rootviews/test.vue'

import HomePage from './components/HomePage.vue'
Vue.transition('trans', {
	enterClass: 'slideInRight',
	leaveClass: 'slideOutRight'
})


var transitionClassArr = ["fadeOutLeft", "fadeOutRight", "slideInRight", "slideInLeft"];

Vue.transition('expand', {
	css: false,
	beforeEnter: function(el) {
		var classArr = $(el).attr("class").split(/\s+/);
		$.each(classArr, function() {
			if ($.inArray(this, transitionClassArr) != -1) {
				$(el).removeClass(this);
			}
		});
		if (Vue.isBack) {
			$(el).addClass("slideInLeft");
		} else {
			$(el).addClass("slideInRight");
		}
	},
	enter: function(el) {

	},
	afterEnter: function(el) {

	},
	enterCancelled: function(el) {
		// handle cancellation
	},

	beforeLeave: function(el) {
		var classArr = $(el).attr("class").split(/\s+/);
		console.log(classArr)
		for (var i = classArr.length - 1; i >= 0; i--) {
			if ($.inArray(classArr[i], transitionClassArr) != -1) {
				console.log(classArr[i])
				$(el).removeClass(classArr[i]);
				break;
			}
		}
		if (Vue.isBack) {
			$(el).addClass("fadeOutRight");
		} else {
			$(el).addClass("fadeOutLeft");
		}
		// $(el).animate({ opacity: 0 }, 1000, done)
	},
	leave: function(el, done) {
		setTimeout(function() {
			done();
		}, 800)
	},
	afterLeave: function(el) {

	},
	leaveCancelled: function(el) {
		// handle cancellation
	}
})


var g_uri_stack = [];

// install router
Vue.use(Router)
var router = new Router({
	transitionOnLoad: false
})

router.afterEach(function(transition) {
	console.log(3)
	var toPath = transition.to.path,
		index = $.inArray(toPath, g_uri_stack);
	if (index != -1 && index == g_uri_stack.length - 2) {
		g_uri_stack.pop();
		Vue.isBack = true;
	} else {
		Vue.isBack = false;
	}
	console.log('成功浏览到: ' + transition.to.path)
	if (g_uri_stack[g_uri_stack.length - 1] != toPath) {
		g_uri_stack.push(toPath)
	}
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
			},
			'/test': {
				component: Test
			}
		}
	},
	'/ListView': {
		component: ListView
	}
})


// var App = Vue.extend({
// 	ready: function() {
// 		// this.fetchUsers();
// 	},

// 	data: function() {
// 		return {
// 			users: [],
// 		};
// 	},

// methods: {
// 	fn_SetVueTransform: function() {
// 		this.transition('expand', {
// 			css: false,
// 			beforeEnter: function(el) {
// 				if (isBack) {
// 					$(el).removeClass("slideOutRight").addClass("slideInLeft");
// 				} else {
// 					$(el).removeClass("slideOutLeft").addClass("slideInRight");
// 				}
// 			},
// 			enter: function(el) {

// 			},
// 			afterEnter: function(el) {

// 			},
// 			enterCancelled: function(el) {
// 				// handle cancellation
// 			},

// 			beforeLeave: function(el) {
// 				if (isBack) {
// 					$(el).removeClass("slideInLeft").addClass("slideOutRight");
// 				} else {
// 					$(el).removeClass("slideInRight").addClass("slideOutLeft");
// 				}
// 				// $(el).animate({ opacity: 0 }, 1000, done)
// 			},
// 			leave: function(el, done) {
// 				setTimeout(function() {
// 					done();
// 				}, 800)
// 			},
// 			afterLeave: function(el) {

// 			},
// 			leaveCancelled: function(el) {
// 				// handle cancellation
// 			}
// 		})
// 	}
// }
// });

router.start(App, '#app')