window.addEventListener("load", function() {

	// This is a custom canvas wrapper class just to demonstrate what you
	// can do VirtualCanvas - see ./PixelCanvas.js
	var canvas = new PixelCanvas(100, 100, 4);

	// Load a squid sprite
	var squid = new Sprite("images/squidlegs.png", 20, 20);

	var i = 0;
	new Loop(function() {
		i++;

		// Clear the canvas
		canvas.clear();

		// Draw the squid using a canvas context
		squid.draw(canvas.context, (i % 40) > 20, 0, 40, 40);

		// Done
		canvas.draw();

	});

});