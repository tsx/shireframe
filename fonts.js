define(['$', 'webFontLoader'], function($, webFontLoader){
	var fontDeferred = $.Deferred();
	webFontLoader.load({
		active: function(){
			fontDeferred.resolve();
			console.log('a');
		},
		inactive: function(){
			fontDeferred.reject();
			console.log('f');
		},
		custom: {
			families: ['FontAwesome', 'Kalam', 'Glyphicons Halflings'],
			testStrings: {
				'FontAwesome': '\uf00c\uf000',
				'Glyphicons Halflings': '\uf00c\uf000'
			}
		}
	});
	return fontDeferred.promise();
});
