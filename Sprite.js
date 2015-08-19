class Sprite {

	constructor(image, width, height) {

		// Load the image
		this.image = new Image;
		this.image.src = image;

		// Keep the width / height
		this.width = width;
		this.height = height;

		// We need a canvas to provide rotation
		this.canvas = new VirtualCanvas(width, height);

	}

	draw(context, sprite, rotation, x, y) {

		var spriteX, spriteY = 0;
		if (_.isArray(sprite)) {
			[spriteX, spriteY] = sprite;
		} else {
			spriteX = sprite;
		}

		// Draw to our canvas
		this.canvas.clear()
				   .rotate(rotation, this.width / 2, this.height / 2)
				   .sprite(this.image, this.width, this.height, spriteX, spriteY)
				   .reset();

		// Draw our canvas to the context
		context.drawImage(this.canvas.element, x, y);

	}

}
