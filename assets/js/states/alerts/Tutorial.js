var Tutorial = {

	preload: function() {
	},

	init: function(params) {
		console.log(params);

		this.lastParams = params;
	},

	create: function() {
		var bg = game.add.tileSprite(0, 0, 800, 600, 'alertBG');
		bg.fixedToCamera = true;

		game.add.bitmapText(140 , 100, '8bitWonder','COLLECT SMOKES', 24);
		game.add.bitmapText(367 , 150, '8bitWonder','AVOID', 24);
		game.add.bitmapText(107 , 200, '8bitWonder','GET TO THE PORTAL', 24);

		game.add.bitmapText(210 , 300, '8bitWonder','MOVE WITH ARROWS', 24);
		game.add.bitmapText(220 , 350, '8bitWonder','JUMP WITH SPACE', 24);
		game.add.bitmapText(190 , 400, '8bitWonder','AND COLLECT SMOKES', 24);

		game.add.bitmapText(170 , 507, '8bitWonder','CLICK TO RETURN TO MENU', 24);

		game.add.sprite(500, 102, 'tutorial-image');

		game.input.onDown.add(function() {
			game.state.start(this.lastParams.lastState, true, false);
		},this);
	},
};