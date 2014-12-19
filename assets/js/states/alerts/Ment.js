var Ment = {

	preload: function() {
	},

	init: function(params) {
		console.log(params);

		this.lastParams = params;
	},

	create: function() {
		var bg = game.add.tileSprite(0, 0, 800, 600, 'alertBG');
		bg.fixedToCamera = true;

		game.add.bitmapText(220 , 100, '8bitWonder','POLICE CAUGHT YOU', 24);
		game.add.bitmapText(115 , 150, '8bitWonder','AND TOOK ALL YOUR SMOKES', 24);
		game.add.bitmapText(250 , 300, '8bitWonder','GAME OVER', 35);
		game.add.bitmapText(140 , 450, '8bitWonder','CLICK TO TRY AGAIN', 35);

		game.input.onDown.add(function() {
			game.state.start(this.lastParams.lastState, true, false);
		},this);
	},
};