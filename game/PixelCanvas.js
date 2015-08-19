// An example of a class you might right for your game

class PixelCanvas {

	constructor(width, height, scale) {
		this.width = width;
		this.height = height;
		this.scale = scale;

		// Draw to the canvas small, display large on the canvas
		this.domCanvas = new DomCanvas();
		this.canvas = new VirtualCanvas(this.height, this.width);

		// Make it easy to grab the context
		this.context = this.canvas.context;
	}

	/**
	 * Clear the canvas
	 */
	clear() {

		// Clear the virtual canvas
		this.canvas.clear();
	}

	/**
	 * Draw to the screen
	 */
	draw() {

		// Enlarge onto the screen
		this.domCanvas.clear();
		this.domCanvas.context.drawImage(this.canvas.element, 0, 0, this.width * this.scale, this.height * this.scale);

	}

}