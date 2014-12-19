var Player = function(game) {};

Player.prototype = {
	init: function() {

		p = game.add.sprite(100, 45, 'player');
		game.physics.enable(p, Phaser.Physics.ARCADE);

		p.body.bounce.y = 0;
		p.body.collideWorldBounds = true;
		p.facing = 'idle';

		p.anchor.setTo(0.5, 0.5);

		p.animations.add('left', [0], 60, true);
		p.animations.add('right', [1], 60, true);
		p.animations.add('jumpRight', [2], 60, true);
		p.animations.add('jumpLeft', [3], 60, true);
		

		game.camera.follow(p);

		this.player = p;
		this.cursors = game.input.keyboard.createCursorKeys();
		this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.jumpTimer = 0;
		this.jumpSound = game.add.audio('jumpSound');
		p.facing = 'left';
		return p;
	},

	animatePlayer: function() {		
		if(this.player.body.velocity.y !== 0 && this.player.facing == 'left') {
			this.player.animations.play('jumpLeft');
		}

		if(this.player.body.velocity.y !== 0 && this.player.facing == 'right') {
			this.player.animations.play('jumpRight');
		}

		if(this.player.body.onFloor()) {
			if(this.player.facing == 'right') {
				this.player.animations.play('right');
			}
			else {
				this.player.animations.play('left');	
			}
		}
	},

	processMovement: function() {

		this.player.body.velocity.x = 0;

		if (this.cursors.left.isDown) {
			this.player.body.velocity.x = -200;
			this.player.facing = 'left';
		}
		else if (this.cursors.right.isDown) {
			this.player.body.velocity.x = 200;
			this.player.facing = 'right';
		}


		if (this.jumpButton.isDown && this.player.body.onFloor() && game.time.now > this.jumpTimer) {
			this.jumpSound.play();
			this.player.body.velocity.y = -340;
			this.jumpTimer = game.time.now + 750;
		}

		this.animatePlayer();
	}
};