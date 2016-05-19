<template>
	<div id="wrapper">
		<!-- main view -->
	 <!--  <router-view keep-alive   transition="trans"
			 class="animated " transition-mode="out-in"></router-view> -->
		<router-view keep-alive
		 :classheader="classheader" 
		 :classcontent="classcontent"></router-view>
	</div>
</template> 
<script type="text/javascript">
import com from '../javascripts/common.js'
var m_obj= com.jugeStyle();
export default{
	name:'HomePage',
	ready: function() {
		// this.fn_SetVueTransform();
	},
	data(){       
		return {
			classheader:{
				'iosheader':m_obj.isIOS
			},
			classcontent:{      
				'ioscontent':m_obj.isIOS
			}
		}
	},
	methods: {
		
	}
}
</script>