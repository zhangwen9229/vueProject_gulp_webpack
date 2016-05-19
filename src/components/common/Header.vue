<template>
	<div class="appheader"  v-bind:class="classheader"></div>
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
		  }
	}
</script>