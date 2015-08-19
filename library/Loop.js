class Loop {

	constructor(callback) {
		var self = this;

		self.lastTime = Date.now();
		self.ellapsed = 0;
		self.frames = 0;
		self.fps = 0;
		self.cap = 100;

		// We use a wrapper so we can automatically ask for another frame
		var wrapper = function() {

			// Enforce the frame cap
			if (self.fps < self.cap) {

				// Run the callback
				callback.apply(self);

				// Count as a frame
				self.frames ++;

			}

			// Update the timing info
			self.ellapsed = Date.now() - self.lastTime;
			self.fps = Math.floor(self.frames / (self.ellapsed / 1000));

			// Reset every second so we don't get big numbers
			if (self.ellapsed > 1000) {
				self.frames = 0;
				self.lastTime = Date.now();
			}


			// Request the next animation frame
			window.requestAnimationFrame(wrapper);



		};

		// Ask for an animation frame
		window.requestAnimationFrame(wrapper);

	}

	setCap(cap) {
		this.cap = cap;
	}

}
