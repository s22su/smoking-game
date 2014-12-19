var Snus = {

	preload: function() {
	},

	init: function(params) {
		console.log(params);

		this.lastParams = params;
	},

	create: function() {
		var bg = game.add.tileSprite(0, 0, 800, 600, 'alertBG');
		bg.fixedToCamera = true;

		game.add.bitmapText(220 , 100, '8bitWonder','YOU NEED TO SMOKE', 24);
		game.add.bitmapText(215 , 150, '8bitWonder','YOU CANNOT DO SNUS', 24);
		game.add.bitmapText(250 , 300, '8bitWonder','GAME OVER', 35);
		game.add.bitmapText(140 , 450, '8bitWonder','CLICK TO TRY AGAIN', 35);

		game.input.onDown.add(function() {
			game.state.start(this.lastParams.lastState, true, false);
		},this);
	},
};