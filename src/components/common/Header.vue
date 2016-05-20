<template>
	<div class="appheader"  v-bind:class="classheader">
		<div class="appheadercontent">
			<div class="appback backpage"  @click="historyBack"></div>
			<h1 class="apptitle">这是一个测试App</h1>
			<!-- <div class="headeright"></div> -->
		<div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'appHeader',
		props:{
		  	classheader:Object
		},
		data(){  	    
			return {
				 viewName:'appheader',
			}
		},
		methods:{
			historyBack(){
				Vue.is_history_back = true;
				history.go(-1);
			}
		}
	}
</script>

<style type="text/css" scoped>
	.appheader{
		display: flex;
	}
	.iosheader .appheadercontent{
		margin-top: 0.56rem;
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
	}
	.backpage{
		border:solid #fff;
		border-width: 0.04rem 0.04rem 0 0 ;
		transform: rotate(-135deg);
		width: 0.38rem;
		height: 0.38rem;
		/*position: absolute;
		top: 0;
		bottom: 0;
		left: 0.266667rem;
		margin: auto;*/
		margin-left: 0.32rem;
		display: block;
		z-index: 5;
	}
	.apptitle{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		height: 1.173333rem;
		display: inline-block;
		line-height: 1.24rem;
		text-align: center;
		white-space: nowrap;
		color: #fff;
		font-size: 20px;
	}
	[data-dpr="2"] .apptitle{
		font-size: 40px;
	}
	[data-dpr="3"] .apptitle{
		font-size: 60px;
	}
</style>