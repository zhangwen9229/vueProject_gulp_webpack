<template>
	  <div class="appmy "  >this is my page</div>
</template>

<script type="text/javascript">

	export default{
		name:'appMy',
		// props:{
		// 	transition:String
		// },
		data(){  	    
			return {
				 viewName:'appmy'
	 		}
		  },
		  route:{
			 canDeactivate:function(){	
			      return true;
			 },
		    	deactivate: function (transition) {	
			      transition.next()
		      }
	      },
	      beforeDestroy(){
	      		// console.log("beforeDestroy");
	      		// Vue.fn_SetVueTransform(true)
	      }
	}
</script>

<style type="text/css">
	.appmy{
		position: absolute;
		top:0;
		width: 100%;
		background: #fff;
	}
</style>