class Font extends Sprite {

	constructor(sprite, width, height, extras) {
		super(sprite, width, height);

		this.extras = extras;
	}

	draw(context, text, x, y) {

		// Cast to string
		text += "";

		// Line height (from height)
		var lineHeight = this.height + 1;
		var charWidth = this.width - 2;

		// Split into lines
		var lines = text.split("\n");

		// Keep track of initial x
		var initialX = x;

		// Each line
		for (var line of lines) {

			// Separate into characters
			var characters = line.split("");

			// Each character
			for (var character of characters) {

				var code = character.charCodeAt(0);

				var col, row = 0;

				// Check for numerics (48 is 0, 57 is 9)
				if (code >= 48 && code <= 57) {
					col = code - 48;
					row = 0;

				// Check for alpha (65 is A, 90 is Z)
				} else if (code >= 65 && code <= 90) {

					col = code - 65;
					row = 1;

				// Check for extras
				} else if (this.extras.indexOf(character) != -1) {

					col = this.extras.indexOf(character);
					row = 2;
				}

				if (character != " ") {
					super.draw(context, [col, row], 0, x, y);
				}

				x += charWidth;
			}

			// Move down another line
			y += lineHeight;
			x = initialX;

		}
	}

}
