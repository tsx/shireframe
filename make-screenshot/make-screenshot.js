var page = require('webpage').create(),
	address, output, size;
var system = require('system');
var args = system.args;
var zoom = 2;
 
address = args[1];
output = args[2];
page.viewportSize = { width: 1024*zoom, height: 768*zoom };
page.zoomFactor = zoom;
page.onCallback = function(height){
	window.setTimeout(function(){
		page.clipRect = { width: 1024*zoom, height: height*zoom };
 		page.render(output);
		phantom.exit();
	}, 0);
};
page.onError = function(msg, trace) {
	var msgStack = ['ERROR: ' + msg];
	if (trace && trace.length) {
		msgStack.push('TRACE:');
		trace.forEach(function(t) {
			msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
		});
	}
	console.error(msgStack.join('\n'));

};
page.onResourceError = function(resourceError) {
	console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
	console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};
page.open(address, function (status) {
	if (status !== 'success') {
		console.log('Unable to load the address!');
		phantom.exit();
	} else {
		page.evaluate(function () {
			window.require(['shireframe', '$'], function(done){
				done(function(){
					window.setTimeout(function(){
						window.callPhantom($('body').height());
					}, 5000); // wait a few sec for images
					// TODO implement image queue to notify loading finish
				});
			});
		});
	}
});

