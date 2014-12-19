var Princess = {

	preload: function() {
	},

	init: function(params) {
		console.log(params);

		this.lastParams = params;
	},

	create: function() {
		var bg = game.add.tileSprite(0, 0, 800, 600, 'princessBG');
		bg.fixedToCamera = true;

		game.add.bitmapText(120 , 100, '8bitWonder','YOU WON', 35);
		game.add.bitmapText(120 , 150, '8bitWonder','HERE IS A PRINCESS', 24);
		game.add.bitmapText(120 , 220, '8bitWonder','SHE IS DEAD', 35);
		game.add.bitmapText(120 , 270, '8bitWonder','SHE WAS SMOKING TOO MUCH', 17);
		game.add.bitmapText(120 , 480, '8bitWonder','CLICK TO PLAY AGAIN', 35);
		
		game.add.bitmapText(120 , 320, '8bitWonder','QUIT SMOKING', 35);
		game.add.bitmapText(120 , 370, '8bitWonder','IF YOU WANT TO LIVE', 24);		

		game.input.onDown.add(function() {
			game.state.start(this.lastParams.lastState, true, false);
		},this);
	},
};