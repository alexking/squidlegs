class Mouse {

	constructor(canvas) {
		this.canvas = canvas;

		this.resize();
		this.addEvent("resize", this.resize);
		this.addEvent("mousemove", this.move);
		this.addEvent("mousedown", this.down);
		this.addEvent("mouseup", this.up);

		this.addEvent("contextmenu", function(e) {
			e.preventDefault();
		});

		this.scale = 1;
		this.x = 0;
		this.y = 0;
		this.leftButton = false;
		this.rightButton = false;
	}

	/**
	 * Add event listener with context
	 */
	addEvent(event, callback) {
		var self = this;
		window.addEventListener(event, function(e) {
			return callback.apply(self, [e]);
		});
	}

	down(e) {
		this[e.button == 2 ? "rightButton" : "leftButton"] = true;
	}

	up(e) {
		this[e.button == 2 ? "rightButton" : "leftButton"] = false;
	}

	resize() {

		this.bounds = this.canvas.element.getBoundingClientRect();
		this.left = this.bounds.left;
		this.top  = this.bounds.top;

	}

	move(e) {
		this.x = Math.floor( (e.clientX - this.bounds.left) / this.scale);
		this.y = Math.floor( (e.clientY - this.bounds.top)  / this.scale);
	}

}
