var Level2 = {

	preload: function() {

	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var bg = game.add.tileSprite(0, 0, 800, 600, 'background2');
		bg.fixedToCamera = true;

		this.map = game.add.tilemap('level2');
		this.map.addTilesetImage('smoking-game', 'tiles-1');

		// colision
		this.map.setCollisionBetween(21, 24);

		this.map.setTileIndexCallback(4, this.hitSmoke, this);
		this.map.setTileIndexCallback(6, this.hitSnus, this);
		this.map.setTileIndexCallback(10, this.hitPortal, this);

		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		//this.layer.debug = true;

		game.physics.arcade.gravity.y = 350;

		this.smokeSound = game.add.audio('smokeSound');
		this.snusSound = game.add.audio('snusSound');
		this.policeSound = game.add.audio('policeSound');

		console.log(this.policeSound);
		console.log(this.snusSound);

		this.playerObject = new Player(game);
		this.player = this.playerObject.init();
		this.player.reset(80, 450);

		this.juststarted = true;

		this.utils = new Utils(game);

		this.smokeCount = this.utils.findTilesByProperty('type', 'smoke', this.layer).length;
		this.smokesCollected = 0;

		this.smokesCollectedText = game.add.bitmapText(100 , 30,
			'8bitWonder','0 smokes collected of ' + this.smokeCount, 24);
		this.smokesCollectedText.fixedToCamera = true;

		console.debug('Smokes in this level', this.smokeCount);

		// add moving enemies
		this.enemyObj = new Enemy(game);
		this.enemyOne = this.enemyObj.init(350, 300, 'enemy-police');
		this.enemyObj.tweenXmoveR(this.enemyOne, 80, 2500);

		this.enemyTwo = this.enemyObj.init(200, 500, 'enemy-police');
		this.enemyObj.tweenXmoveR(this.enemyTwo, 80, 1500);

		this.enemyThree = this.enemyObj.init(1660, 500, 'enemy-police');
		this.enemyObj.tweenXmoveR(this.enemyThree, 240, 3000);

		this.enemyFour = this.enemyObj.init(1820, 310, 'enemy-police');
		this.enemyObj.tweenXmoveR(this.enemyFour, 210, 3000);

		this.enemyFive = this.enemyObj.init(2800, 310, 'enemy-police');
		this.enemyObj.tweenXmoveR(this.enemyFive, 240, 3000);
	},

	update: function() {
		this.layer.dirty = true;
		game.physics.arcade.collide(this.player, this.layer);

		if(this.juststarted) {
			this.player.reset(80, 450);
			this.juststarted = false;
		}

		// enemies collisions
		game.physics.arcade.collide(this.enemyOne, this.layer);
		game.physics.arcade.collide(this.enemyTwo, this.layer);
		game.physics.arcade.collide(this.enemyThree, this.layer);
		game.physics.arcade.collide(this.enemyFour, this.layer);
		game.physics.arcade.collide(this.enemyFive, this.layer);

		this.playerObject.processMovement();
		
    	this.smokesCollectedText.setText(this.smokesCollected + 
    		' smokes collected of ' + this.smokeCount);

    	this.smokesCollectedText.visible = true;

    	game.physics.arcade.collide(this.player, this.enemyOne, this.hitMent, null, this);
    	game.physics.arcade.collide(this.player, this.enemyTwo, this.hitMent, null, this);
    	game.physics.arcade.collide(this.player, this.enemyThree, this.hitMent, null, this);
    	game.physics.arcade.collide(this.player, this.enemyFour, this.hitMent, null, this);
    	game.physics.arcade.collide(this.player, this.enemyFive, this.hitMent, null, this);
	},

	render: function() {
		this.utils.showFPS();
	},

	hitSmoke: function(sprite, tile) {
		if(sprite.key === 'player') {
			if(tile.alpha !== 0.2) {
				if(!this.smokeSound.isPlaying) {
					this.smokeSound.play();	
				}

				tile.alpha = 0.2;
				this.smokesCollected++;
			}
		}	
		return false;
	},

	hitMent: function(sprite, tile) {
		if(sprite.key === 'player') {
			if(!this.policeSound.isPlaying) {
				this.policeSound.play();	
			}
			game.state.start('Ment', true, false, {lastState: 'Level2'});
		}
		return false;
	},

	hitPortal: function(sprite, tile) {
		if(this.smokesCollected === this.smokeCount) {
			game.state.start('Princess', true, false, {lastState: 'Level1'});
		}
		return false;
	},

	hitSnus: function(sprite, tile) {
		if(!this.snusSound.isPlaying) {
			this.snusSound.play();	
		}
		game.state.start('Snus', true, false, {lastState: 'Level2'});
		return false;
	}
};
