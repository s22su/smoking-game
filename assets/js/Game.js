var game = new Phaser.Game(800, 600, Phaser.AUTO, 'smoking-div');

// Menus
game.state.add('Menu', Menu);


// Levels
game.state.add('Level1', Level1);
game.state.add('Level2', Level2);

// Alerts
game.state.add('Tutorial', Tutorial);
game.state.add('Snus', Snus);
game.state.add('Ment', Ment);
game.state.add('Princess', Princess);

game.state.start('Menu');