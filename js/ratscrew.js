const Game = require("./game.js");
game = new Game;
const display = new (require("./display.js"));
const Controller = require("./controller.js");
const controller = new Controller.Controller;

let x = Math.floor(process.stdout.columns / 2) - 7;
let y = Math.floor(process.stdout.rows / 2) - 5;

const controls = [
	{flip: "a", slap: "q"},
	{flip: "s", slap: "w"},
	{flip: "d", slap: "e"},
	{flip: "f", slap: "r"},
];

let cardChanged = false;
let menuChanged = true;
let playAgain = true;

const updateDynamic = function() {

	if (game.state == 0) {
		if (controller.left && game.playerNum > 2) { game.playerNum--; menuChanged = true; }
		if (controller.right && game.playerNum < 4) { game.playerNum++; menuChanged = true; }
		if (controller.enter) {
			game.addPlayers(game.playerNum, controls);
			controller.addPlayerControls(game.players);
			game.dealCards();
			game.state = 1;
			updateStatic();
		} else if (menuChanged) { // UPDATE IF NEEDED
			display.drawMenu(game.playerNum);
			menuChanged = false;
		}
	}

	else if (game.state == 1) {
		cardChanged = false;
		if (game.players[game.turn].controller.flip && !game.faceOver) { game.flipCard(); cardChanged = true; }
		// if (game.flipCard()) { game.state = 'takeCards'; updateDynamic(); updateStatic(); return }

		for (let p in game.players) {
			if (game.players[p].controller.slap) {
				if (game.evalSlap(p)) game.takeCards(p); cardChanged = true;
				if (game.faceOver && p == game.faceInst) {
					game.takeCards(p);
					cardChanged = true;
					game.faceOver = false;
				}
			}
		}

		if (game.faceOver) {
			display.updateStats(game.players, game.faceInst, game.faceChances, true);
			display.updateTopCard(game.inPlay[game.inPlay.length - 1]);
			return;
		}

		if (cardChanged) { // UPDATE IF NEEDED
			display.updateTopCard(game.inPlay[game.inPlay.length - 1]);
			display.updateStats(game.players, game.turn, game.faceChances, false);
		}

		if (game.over()) { game.state = 2; updateDynamic(); updateStatic(); return }
		display.updateStats(game.players, game.turn, game.faceChances, false);
	}

	else if (game.state == 2) {
		if (controller.left && playAgain == false) playAgain = true;
		if (controller.right && playAgain == true) playAgain = false;
		if (controller.enter) {
			if (playAgain == false) { display.exit(); process.exit() }
			if (playAgain == true) {
				game.reset();
				display.reset();
				display.clear();
				controller.enter = false;
				updateStatic();
				updateDynamic();
				return;
			}
		}
		display.updateGameOver(playAgain);
	}

	else if (game.state == 'wut') {
		let randomCard = game.cards[Math.floor(Math.random() * game.cards.length)];
		if (controller.left) x -= 4;
		if (controller.right) x += 4;
		if (controller.up) y -= 2;
		if (controller.down) y += 2;
		display.drawCard(randomCard, x, y);
	}

	if (controller.esc) {
		display.exit();
		process.exit();
	}
}

const updateStatic = function() {
	if (game.state == 0) {
		display.drawLogo();
		setTimeout(display.moveLogoDown, 800);
	}

	if (game.state == 1) {
		display.clear();
		display.drawTable(game.players);
		display.updateStats(game.players, game.turn, game.faceChances, false);
	}

	if (game.state == 2) {
		display.drawGameOver();
	}
}

game.buildDeck().shuffle();
display.init();
updateStatic();
updateDynamic();

let keypress = require("keypress");
keypress(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", function(chunk, key) {
	let keyPressed = (key == undefined) ? chunk : key.name;
	controller.update(keyPressed);
	if (game.players.length > 0) controller.updatePlayerControls(game.players, keyPressed);
	updateDynamic();
});

let rows = process.stdout.rows;
let columns = process.stdout.columns;
setInterval(() => {
	if (rows != process.stdout.rows || columns != process.stdout.columns) {
		display.resize();
		updateStatic();
		updateDynamic();
		rows = process.stdout.rows;
		columns = process.stdout.columns;
	}
}, 17);
