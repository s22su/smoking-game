var Enemy = function(game) {};

Enemy.prototype = {
	initX: 0,
	initY: 0,

	init: function(initX, initY, spriteName) {
		this.enemy = game.add.sprite(initX, initY, spriteName);
		this.enemy.anchor.setTo(0.5, 0.5);
		this.initX = initX;
		this.initY = initY;

		console.log('init');
		
		game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
		this.enemy.body.collideWorldBounds = true;
		return this.enemy;
	},


	tweenXmoveR: function(enemy, length, time) {
		game.add.tween(enemy)
		  .to({x: this.initX + length}, time, Phaser.Easing.Quadratic.In) 
		  .to({x: this.initX}, time, Phaser.Easing.Quadratic.Out)
		  .loop().start();
	},
};