var Menu = {

	preload: function() {
		game.load.tilemap('level1', 'assets/tilemaps/smoking-game.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level2', 'assets/tilemaps/smoking-game2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('player', 'assets/images/player-sprites-new.png', 35, 43);
		
		game.load.image('tiles-1', 'assets/images/smoking-game.png');
		game.load.image('background', 'assets/images/bg1.png');
		game.load.image('background2', 'assets/images/bg2.png');
		game.load.image('splash', 'assets/images/splash.png');
		game.load.image('alertBG', 'assets/images/alertBG.png');
		game.load.image('princessBG', 'assets/images/princessBG.png');
		game.load.image('tutorial-image', 'assets/images/tutorial-image.png');

		game.load.image('enemy-police', 'assets/images/police.png');

		// sounds
		game.load.audio('jumpSound', 'assets/sound/jump.wav');
		game.load.audio('smokeSound', 'assets/sound/smoke.wav');
		game.load.audio('snusSound', 'assets/sound/snus-is-bad.wav');
		game.load.audio('policeSound', 'assets/sound/police.wav');

		// font
		game.load.bitmapFont('8bitWonder', 'assets/font/8-bit-wonder/8-bit-wonder.png', 'assets/font/8-bit-wonder/8-bit-wonder.fnt');

		game.time.advancedTiming = true;

		//  This sets a limit on the up-scale
		//  remove to scale automatically
		game.scale.maxWidth = 800;
		game.scale.maxHeight = 600;

		//  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setScreenSize();

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();
	},

	create: function() {
		game.stage.backgroundColor = '#000';
		var bg = game.add.tileSprite(0, 0, 800, 600, 'splash');
		bg.fixedToCamera = true;

		this.gameNameText = game.add.bitmapText(190 , 50, '8bitWonder','Smoking Game', 35);
		this.gameNameText2 = game.add.bitmapText(205 , 100, '8bitWonder','your way to the grave', 20);
		
		this.startText = game.add.bitmapText(150 , 500,
			'8bitWonder','START', 24);
		this.startText.inputEnabled = true;
		this.startText.buttonMode = true;

		this.tutorialText = game.add.bitmapText(500 , 500,
			'8bitWonder','TUTORIAL', 24);
		this.tutorialText.inputEnabled = true;
		this.tutorialText.buttonMode = true;

		// add listeners
		this.tutorialText.events.onInputDown.add(this.tutorialState, this);
		this.startText.events.onInputDown.add(this.startGame, this);


		// to test individual states
		//game.state.start('Snus', true, false, {lastState: 'Menu'});
		//game.state.start('Level1', true, false, {lastState: 'Level2'});
		//game.state.start('Level2', true, false, {lastState: 'Level2'});
		//game.state.start('Ment', true, false, {lastState: 'Level2'});
		//game.state.start('Princess', true, false, {lastState: 'Level2'});
		//game.state.start('Menu', true, false, {lastState: 'Tutorial'});
	},

	startGame: function() {
		game.state.start('Level1', true, false);
	},

	tutorialState: function() {
		game.state.start('Tutorial', true, false, {lastState: 'Menu'});
	}
};