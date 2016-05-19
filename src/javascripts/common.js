// export default {
// 	jugeStyle() {
// 		var u = navigator.userAgent,
// 			app = navigator.appVersion;
// 		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
// 		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

// 		// if (isiOS) {
// 		// 	$('.appheader').addClass("iosheader");
// 		// 	$('.appcontent').addClass('ioscontent');
// 		// }
// 		return {
// 			isAndroid: isAndroid,
// 			isIOS: isIOS
// 		}
// 	}
// }

exports.jugeStyle = function() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

	return {
		isAndroid: isAndroid,
		isIOS: isIOS
	}
};