class VirtualCanvas extends Canvas {

	constructor(width, height) {

		// Create the element
		var element = document.createElement("canvas");

		// Set the size
		element.width  = width;
		element.height = height;

		super(element);
	}

}
