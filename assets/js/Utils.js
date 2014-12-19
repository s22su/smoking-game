// some helper funcs will be here
var Utils = function(game) {};

Utils.prototype = {
	/**
	 * Show FPS in upper left corner, for this to work
	 * game.time.advancedTiming = true; should be present in preload
	 */
	showFPS: function() {
		if(game.time.fps) {
			game.debug.text(game.time.fps + ' FPS', 2, 14, '#00ff00');
		}
		else {
			game.debug.text('-- FPS', 2, 14, '#00ff00');
		}
	},	

	findTilesByProperty: function(property, value, layer) {
	    var result = [];

	    layer.layer.data.forEach(function (v) {
	    	v.forEach(function (tile) {
	    		if(tile.properties[property] === value) {
	    			result.push(tile);
	    		}
	    	});
	    });

	    return result;
	}
};
