const Controller = function() {
	this.esc = this.left = this.right = this.up = this.down = this.enter = false;

	this.update = function(key) {
		this.esc = this.left = this.right = this.up = this.down = this.enter = false;
		switch (key) {
			case "escape" : this.esc = true; break;
			case "left" : this.left = true; break;
			case "right" : this.right = true; break;
			case "up" : this.up = true; break;
			case "down" : this.down = true; break;
			case "return" : this.enter = true; break;
		}
	}

	this.addPlayerControls = function(players) {
		for (let p = 0; p < players.length; p++) {
			players[p].controller = new PlayerController(players[p].controls);
		}
	}

	this.updatePlayerControls = function(players, key) {
		for (let p = 0; p < players.length; p++) {
			players[p].controller.update(key);
		}
	}
}

const PlayerController = function(controls) {
	this.controls = controls;
	this.flip = this.slap = false;

	this.update = function(key) {
		this.flip = this.slap = false;
		switch (key) {
			case this.controls.flip : this.flip = true; break;
			case this.controls.slap : this.slap = true; break;
		}
	}
}

module.exports.Controller = Controller;
module.exports.PlayerController = PlayerController;
