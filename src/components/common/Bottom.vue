<template>
	  <div class="appbottom" >
	  	<ul>
	  		<li><a v-link="{ path: '/my' }">Go to My</a></li>
	  		<li><a v-link="{ path: '/' }">Go to Root</a></li>
	  		<li><a v-link="{ path: '/test' }">Go to test</a></li>
	  	</ul>
	  </div>
</template>

<script type="text/javascript">

	export default{
		  name:'appBottom',
		  data(){  	    
			return {
				 viewName:'appbottom'
				 
			}
		  }
	}
</script>

<style type="text/css">
	ul li{float: left;margin-left: 50px}
</style>