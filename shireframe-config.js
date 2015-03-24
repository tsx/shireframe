require.config({
	baseUrl: window.shireframeBaseUrl,
	paths: {
		'angular': 'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.min',
		'_': 'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.5.0/lodash.min',
		'$': 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
		'bootstrap': 'http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/js/bootstrap.min',
		'css': 'http://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.5/css',
		'bootstrap-css': 'http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap.min',
		'font': 'http://fonts.googleapis.com/css?family=Kalam:400,700,300',
		'style': 'shireframe',
		'font-awesome': 'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min'
	},
	shim: {
		'angular': {exports: 'angular'},
		'_': {exports: '_'},
		'$': {exports: '$'},
		'bootstrap': ['css!bootstrap-css', '$'], 
		'css!style': ['bootstrap', 'bootstrap', 'css!font', 'css!font-awesome'], 
	}
});
require(['shireframe']);
