
class Canvas {

	constructor(element) {
		var self = this;

		this.element = element;

		// Fetch a context
		this.context = this.element.getContext("2d");

		// Turn off scaling so that pixels!
		this.context.imageSmoothingEnabled = false;

		for (var prefix of ["ms", "webkit", "moz"]) {
			this.context[`${prefix}ImageSmoothingEnabled`] = false;
		}

	}

	width() {
		return this.element.width;
	}

	height() {
		return this.element.height; 
	}

	clear() {
		this.context.clearRect(0, 0, this.element.width, this.element.height);
		return this;
	}

	rotate(degrees, originX, originY) {
		this.context.save();
        this.context.translate(originX, originY);
        this.context.rotate(degrees * (Math.PI / 180));
        this.context.translate(-originX, -originY);

		return this;
	}

	reset() {
		this.context.restore();
		return this;
	}

	sprite(image, width, height, spriteX = 0, spriteY = 0, positionX = 0, positionY = 0) {

		this.context.drawImage(
			image,
			width * spriteX, height * spriteY,
			width, height,
			positionX, positionY,
			width, height
		);

		return this;
	}

}
