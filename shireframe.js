define('shireframeUrl', function(){
	return require.toUrl('.');
});
define(['angular', '_', '$', 'shireframeUrl', 'fonts','css!style'], function(angular, _, $, url, fontsPromise){
sh = angular.module("Shireframe", []);
sh.service('templateUrl', ['$sce', function($sce){
	return function(u){
		return $sce.trustAsResourceUrl(url + u);
	};
}]);

function linkedDirective(name, f){
	sh.directive(name, function(){
		return {restrict: 'AEC', link: f};
	});
}

function blockyClass(name, cls, inline){
	linkedDirective(name, function(s, e){
		e.addClass(inline ? "display-inline-block" : "display-block");
		e.addClass(cls ? cls : _.kebabCase(name));
	});
}

function iconicDirective(name){
	linkedDirective(name, function(s, e, a){
		e.addClass(name);
		for(var k in a){
			if(a.hasOwnProperty(k) && k.indexOf("$") === -1){
				e.addClass(name + "-" + _.kebabCase(k));
				e.addClass(name + "-" + k);
			}
		}
	});
}

function textDirective(service){
	sh.directive("text" + _.capitalize(service), [service, function(s){
		return {
			restrict: 'AEC',
			link: function(scope, elem){
				elem.html(s());
			}
		};
	}]);
}

blockyClass("box", null, true);

iconicDirective("glyphicon");
iconicDirective("fa");

blockyClass("row");
[1,2,3,4,5,6,7,8,9,10,11,12].forEach(function(e){
	blockyClass("col" + e, "col-xs-" + e);
	blockyClass("colOffset" + e, "col-xs-offset-" + e);
});

var seed = 1;

function srand(){
	seed = (seed * 9301 + 49297) % 233280;
	return seed / 233280;
}

function srandInt(max){
	return Math.floor(srand() * max);
}

function srandIntMin(min, maxOffset){
	return srandInt(maxOffset) + min;
}

function srandLetterCode(){
	return srandInt(10) + '0'.charCodeAt(0);
}

linkedDirective("kitten", function(s, e, a){
	var id = String.fromCharCode(srandLetterCode(), srandLetterCode(), srandLetterCode());
	var size = a.size;
	e.addClass('kitten');
	e.css('background-image', 'url(http://thecatapi.com/api/images/get?size=small&image_id=' + id + ')');
	if(size) {
		e.css('width', size);
		e.css('height', size);
	}
});
sh.directive("browserChrome", ['templateUrl', function(templateUrl){
	return {
		transclude: true,
		templateUrl: templateUrl("browserChrome.html"),
	};
}]);

sh.directive("cheerfulComment", ['cheerfulCommentService', function(cheerfulCommentService) {
	return {
		restrict: "EA",
		controller: function() {
			this.comment = cheerfulCommentService();
		},
		controllerAs: "ccCtrl",
		template: "{{ccCtrl.comment}}"
	};
}]);

sh.directive("angryComment", ['angryCommentService', function(angryCommentService) {
	return {
		restrict: "EA",
		controller: function() {
			this.comment = angryCommentService();
		},
		controllerAs: "acCtrl",
		template: "{{acCtrl.comment}}"
	};
}]);

sh.directive("loremIpsum", function() {
	return {
		restrict: 'EA',
		template: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.'
	};
});

textDirective("title");
textDirective("url");

sh.service("title", function($window){
	return function(){
		return $window.document.title ? $window.document.title : "AWESOME";
	};
});

sh.service("url", function(title){
	return function(){
		return "http://" + _.kebabCase(title()) + ".com";
	};
});

function commentService(comments) {
	var commentIndex = -1;

	return function() {
		++commentIndex;

		if (commentIndex >= comments.length) {
			commentIndex = 0;
		}

		return comments[commentIndex];
	};
}


sh.service("cheerfulCommentService", function() {
	var comments = [
		"Purrrr!",
		"Hey, this is awesome!  Keep it up!",
		":D",
		"This makes me all warm and fuzzy.  If only more people could save kittens like you.",
		"Lorem ipsum happy happy joy joy, etc.",
		"=^.^="
	];

	return commentService(comments);
});

sh.service("angryCommentService", function() {
	var comments = [
		"How could you do this?  This is terrible!",
		"I really hate this.  Please fix it.",
		"WHARRGARBL",
		"I'm going to express my anger quietly and eloquently.  But I'm really angry and will burn down your house.",
		">.<"
	];

	return commentService(comments);
});

sh.run(function($rootScope){
	$rootScope._ = _;
});
var bootstrapDeferred = $.Deferred();
$(function(){
	$('body').append('<svg xmlns="http://www.w3.org/2000/svg" height="10"><defs><filter id="sketchy-filter" x="0" y="0" height="100%" width="100%" color-interpolation-filters="sRGB"><feTurbulence result="turbulenceresult" type="fractalNoise" numOctaves="2" baseFrequency="0.015" in="SourceGraphic" /><feDisplacementMap in2="turbulenceresult" in="SourceGraphic" xChannelSelector="R" yChannelSelector="B" scale="7" /></filter></defs></svg>');
			
	$('body').css("filter", "url('#sketchy-filter')");
	$('body').css("-webkit-filter", "url('#sketchy-filter')");
	angular.bootstrap(document, ["Shireframe"]);
	done = true;
	setTimeout(function(){
		bootstrapDeferred.resolve();
	}, 0);
});
var loadPromise = $.when(fontsPromise, bootstrapDeferred.promise());
return function(f){
	loadPromise.then(f);
};
});
