/**
 * Uses a keyboard c
 */
class KeyboardMovement {

	/**
	 * @param Keyboard
	 */
	constructor(keyboard) {

		// Track movement keys
		keyboard.track("up", ["w", "up"]);
		keyboard.track("down", ["s", "down"]);
		keyboard.track("left", ["a", "left"]);
		keyboard.track("right", ["d", "right"]);

		// Save the keyboard for later
		this.keyboard = keyboard;

		this.degrees = 0;
	}


	direction() {

		// If anything is pressed
		if (this.keyboard.latest) {

			if (this.keyboard.latest == "up") {
				this.degrees = 0;
			} else if (this.keyboard.latest == "down") {
				this.degrees = 180;
			} else if (this.keyboard.latest == "left") {
				this.degrees = 270;
			} else if (this.keyboard.latest == "right") {
				this.degrees = 90;
			}

		}

		// Always return the degrees
		return this.degrees;

	}

	moving() {
		return this.keyboard.any(["up", "down", "left", "right"]);
	}

	name() {
		return this.keyboard.latest; 
	}

	/**
	 * Provides an x, y delta
	 * @return Array
	 */
	delta() {

		var delta = [0, 0];

		// If anything is pressed
		if (this.keyboard.latest) {

			if (this.keyboard.latest == "up") {
				delta = [0, -1];
			} else if (this.keyboard.latest == "down") {
				delta = [0,  1];
			} else if (this.keyboard.latest == "left") {
				delta = [-1, 0];
			} else if (this.keyboard.latest == "right") {
				delta = [ 1, 0];
			}

		}

		// Always return the degrees
		return delta;
	}

}
