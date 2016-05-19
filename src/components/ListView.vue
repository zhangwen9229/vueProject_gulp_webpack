<template>
	<div class="" >
	<div @click="aclick">this is {{viewName}}2</div>
	<ul>
		<li v-for="item in items" track-by="$index">{{item}}</li>
	</ul>
	</div>
</template>

<script type="text/javascript">
import msg from "../javascripts/test"

 require.ensure([], function() { // 语法奇葩, 但是有用
    	require('../style/style.css'); // 函数调用后, 模块保证在同步请求下可用
  });

export default{
	name:'ListView',
	data(){
		return {
			viewName:'ListView26',
			items:msg.getMsgs()
		}
	},
	route:{
		data:function(transition){
			transition.next({
				viewName:"testList"
			})
		}
	},
	methods:{
		aclick(){
			alert("test alert888");
		}
	}
}
</script>

<style type="text/css" scoped>
	div{
		color: blue;
		cursor: pointer;
		width: 100%;
	}
</style>