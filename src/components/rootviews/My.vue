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
		    		console.log(1)    		
				// this.transition = "trans";
			      return true;
			 },
		    	deactivate: function (transition) {		
		    		console.log(2)    		
				// this.transition = "trans";
			      transition.next()
		      }
	      },
	      beforeDestroy(){
	      		console.log("beforeDestroy");
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