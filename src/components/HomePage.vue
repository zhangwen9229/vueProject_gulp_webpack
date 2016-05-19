<template >
  <app-header :classheader="classheader"></app-header>
  <div class="appcontent" :class="classcontent">
	<router-view class="animated   rootcontent"  :transition="trans" 
		 ></router-view>
  </div>
  <app-bottom></app-bottom>
</template>

<script type="text/javascript">
import msg from "../javascripts/test"

import appHeader from "./common/Header.vue"
import appBottom from "./common/Bottom.vue"
export default{
     name:'HomePage', 
     props:{
  		classheader:Object,
  		classcontent:Object
      },
      components: {
	   	appHeader,
	   	appBottom
 	},
  	data(){  	    
		return {
			viewName:'ListView26',
			items:msg.getMsgs(),
			trans:"expand"
		}
	  },
  	route:{
		data:function(transition){
			 //  transition.next({
				// viewName:"testList"
			 //  })
		},activate ({ next }) {
			// when done:
			next()
		 }
  	},
	 methods:{
		aclick(){
			alert("test alert666");
		}
	  }
}
</script>

<style type="text/css" scoped>
	div{
		color: blue;
		cursor: pointer;
	}
</style>