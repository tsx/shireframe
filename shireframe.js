define('shireframeUrl', function(){
	return require.toUrl('.');
});
define(['angular', '_', '$', 'shireframeUrl', 'fonts','css!style'], function(angular, _, $, url, fontsPromise){

var sh = angular.module("Shireframe", []);

var script = window.shireframeScript;

sh.service('templateUrl', ['$sce', function($sce){
	return function(u){
		return $sce.trustAsResourceUrl(url + u);
	};
}]);

function nonInjectedDirective(name, obj){
	sh.directive(name, function(){
		return obj;
	});
}

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

function textServiceDirective(service){
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

function commentGenerator(comments) {
	var commentIndex = -1;

	return function() {
		++commentIndex;

		if (commentIndex >= comments.length) {
			commentIndex = 0;
		}

		return comments[commentIndex];
	};
}

function textGeneratorDirective(name, generator){
	sh.directive(name, function(){
		return {
			restrict: 'AEC',
			link: function(scope, elem, attrs){
				elem.text(generator());
			}
		}
	});
}

textGeneratorDirective("cheerfulComment", commentGenerator([
	"Purrrr!",
	"Hey, this is awesome!  Keep it up!",
	":D",
	"This makes me all warm and fuzzy.  If only more people could save kittens like you.",
	"Lorem ipsum happy happy joy joy, etc.",
	"=^.^="
]));


textGeneratorDirective("angryComment", commentGenerator([
	"How could you do this?  This is terrible!",
	"I really hate this.  Please fix it.",
	"WHARRGARBL",
	"I'm going to express my anger quietly and eloquently.  But I'm really angry and will burn down your house.",
	">.<"
]));

sh.directive("loremIpsum", function() {
	return {
		restrict: 'EA',
		link: function(scope, elem, attr){
			elem.text('xLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.'.substring(0, attr.loremIpsum));
		}
	};
});

sh.directive("tooltip", function(){
	return {
		restrict: 'A',
		transclude: true,
		template: '<div class="tooltip-wrapper"><ng-transclude></ng-transclude><div class="tooltip-arrow"></div><div class="tooltip-content">{{title}}</div></div>',
		link: function(scope, elem, attr){
			scope.title = attr.title;
		}
	}
});

textServiceDirective("title");
textServiceDirective("url");

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

if(script && script.hasAttribute('partials')){
	script.getAttribute('partials').split(" ").forEach(function(e){
		nonInjectedDirective(_.camelCase(e), {
			transclude: true,
			templateUrl: e + ".html"
		});
	});
}

sh.run(function($rootScope){
	$rootScope._ = _;
});

var bootstrapDeferred = $.Deferred();

$(function(){
	var body = $('body');
	$('body').append('<svg xmlns="http://www.w3.org/2000/svg" height="10"><defs><filter id="sketchy-filter" x="0" y="0" height="100%" width="100%" color-interpolation-filters="sRGB"><feTurbulence result="turbulenceresult" type="fractalNoise" numOctaves="2" baseFrequency="0.015" in="SourceGraphic" /><feDisplacementMap in2="turbulenceresult" in="SourceGraphic" xChannelSelector="R" yChannelSelector="B" scale="7" /></filter></defs></svg>');
	if(!script || !script.hasAttribute('no-sketchy-filter')){
		body.css("filter", "url('#sketchy-filter')");
		body.css("-webkit-filter", "url('#sketchy-filter')");
	}
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
