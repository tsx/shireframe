define(['$', 'webFontLoader'], function($, webFontLoader){
	var fontDeferred = $.Deferred();
	webFontLoader.load({
		active: function(){
			fontDeferred.resolve();
		},
		inactive: function(){
			fontDeferred.reject();
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
