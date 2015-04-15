(function(){
var scripts = document.getElementsByTagName("script");
window.shireframeScript = scripts[ scripts.length - 1 ];
var path = window.shireframeScript.getAttribute('src').replace("-r", "-config");
var split = path.split('/');
window.shireframeBaseUrl = split.slice(0, split.length-1).join('/');
document.write('<script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.16/require.min.js"><' + '/script>');
document.write('<script src="' + path + '"><' + '/script>');
})();
