var Level1 = {

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var bg = game.add.tileSprite(0, 0, 800, 600, 'background');
		bg.fixedToCamera = true;

		this.map = game.add.tilemap('level1');
		this.map.addTilesetImage('smoking-game', 'tiles-1');

		// colision
		this.map.setCollisionBetween(0, 3);

		//  This will set smoke tile to call the hitSmoke function when collided with
		this.map.setTileIndexCallback(4, this.hitSmoke, this);
		this.map.setTileIndexCallback(6, this.hitSnus, this);
		this.map.setTileIndexCallback(10, this.hitPortal, this);

		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		//this.layer.debug = true;

		game.physics.arcade.gravity.y = 350;

		this.smokeSound = game.add.audio('smokeSound');
		this.snusSound = game.add.audio('snusSound');

		this.playerObject = new Player(game);
		this.player = this.playerObject.init();

		this.utils = new Utils(game);

		this.smokeCount = this.utils.findTilesByProperty('type', 'smoke', this.layer).length;
		this.smokesCollected = 0;

		this.smokesCollectedText = game.add.bitmapText(150 , 30,
			'8bitWonder','0 smokes collected of ' + this.smokeCount, 24);
		this.smokesCollectedText.fixedToCamera = true;

		console.debug('Smokes in this level', this.smokeCount);
	},

	gofull: function() {
		if (game.scale.isFullScreen) {
			game.scale.stopFullScreen();
		}
		else
		{
			game.scale.startFullScreen(false);
		}
	},

	update: function() {
		this.layer.dirty = true;
		game.physics.arcade.collide(this.player, this.layer);
		this.playerObject.processMovement();
		
    	this.smokesCollectedText.setText(this.smokesCollected + 
    		' smokes collected of ' + this.smokeCount);

    	this.smokesCollectedText.visible = true;
	},

	render: function() {
		this.utils.showFPS();
	},

	hitSmoke: function(sprite, tile) {		
		if(tile.alpha !== 0.2) {
			if(!this.smokeSound.isPlaying) {
				this.smokeSound.play();	
			}

			tile.alpha = 0.2;
			this.smokesCollected++;
		}
		return false;
	},

	hitPortal: function(sprite, tile) {
		if(this.smokesCollected === this.smokeCount) {
			game.state.start('Level2', true, false, {lastState: 'Level2'});
		}
		return false;
	},

	hitSnus: function(sprite, tile) {
		if(!this.snusSound.isPlaying) {
			this.snusSound.play();	
		}

		game.state.start('Snus', true, false, {lastState: 'Level1'});
		return false;
	}
};
