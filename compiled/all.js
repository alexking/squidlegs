"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = (function () {
	function Sprite(image, width, height) {
		_classCallCheck(this, Sprite);

		// Load the image
		this.image = new Image();
		this.image.src = image;

		// Keep the width / height
		this.width = width;
		this.height = height;

		// We need a canvas to provide rotation
		this.canvas = new VirtualCanvas(width, height);
	}

	_createClass(Sprite, [{
		key: "draw",
		value: function draw(context, sprite, rotation, x, y) {

			var spriteX,
			    spriteY = 0;
			if (typeof sprite[0] !== "undefined") {
				var _sprite = _slicedToArray(sprite, 2);

				spriteX = _sprite[0];
				spriteY = _sprite[1];
			} else {
				spriteX = sprite;
			}

			// Draw to our canvas
			this.canvas.clear().rotate(rotation, this.width / 2, this.height / 2).sprite(this.image, this.width, this.height, spriteX, spriteY).reset();

			// Draw our canvas to the context
			context.drawImage(this.canvas.element, x, y);
		}
	}]);

	return Sprite;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = (function () {
	function Canvas(element) {
		_classCallCheck(this, Canvas);

		var self = this;

		this.element = element;

		// Fetch a context
		this.context = this.element.getContext("2d");

		// Turn off scaling so that pixels!
		this.context.imageSmoothingEnabled = false;

		var _arr = ["ms", "webkit", "moz"];
		for (var _i = 0; _i < _arr.length; _i++) {
			var prefix = _arr[_i];
			this.context[prefix + "ImageSmoothingEnabled"] = false;
		}
	}

	_createClass(Canvas, [{
		key: "width",
		value: function width() {
			return this.element.width;
		}
	}, {
		key: "height",
		value: function height() {
			return this.element.height;
		}
	}, {
		key: "clear",
		value: function clear() {
			this.context.clearRect(0, 0, this.element.width, this.element.height);
			return this;
		}
	}, {
		key: "rotate",
		value: function rotate(degrees, originX, originY) {
			this.context.save();
			this.context.translate(originX, originY);
			this.context.rotate(degrees * (Math.PI / 180));
			this.context.translate(-originX, -originY);

			return this;
		}
	}, {
		key: "reset",
		value: function reset() {
			this.context.restore();
			return this;
		}
	}, {
		key: "sprite",
		value: function sprite(image, width, height) {
			var spriteX = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
			var spriteY = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
			var positionX = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
			var positionY = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];

			this.context.drawImage(image, width * spriteX, height * spriteY, width, height, positionX, positionY, width, height);

			return this;
		}
	}]);

	return Canvas;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = (function () {

    /**
     * Setup events
     */

    function Keyboard() {
        _classCallCheck(this, Keyboard);

        this.keycodes = new Map();

        this.namedKeys = {
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            space: 32
        };

        this.keys = new Set();

        this.latest = false;

        var self = this;

        window.onkeydown = function (event) {

            if (self.keycodes.has(event.which)) {
                var name = self.keycodes.get(event.which);

                // Add the key
                self.keys.add(name);

                // Set as the latest
                self.latest = name;

                return false;
            }
        };

        window.onkeyup = function (event) {

            if (self.keycodes.has(event.which)) {
                var name = self.keycodes.get(event.which);

                // Remove the key
                self.keys["delete"](name);

                // Recalculate latest
                if (self.keys.size == 0) {
                    self.latest = false;
                } else {
                    self.latest = Array.from(self.keys).pop();
                }

                return false;
            }
        };

        window.onblur = function (event) {

            // No keys can be held down while we're not in the window
            self.keys.clear();

            self.latest = false;
        };
    }

    _createClass(Keyboard, [{
        key: "pressed",
        value: function pressed(name) {
            return this.keys.has(name);
        }

        /**
         * True if any of the keys are pressed
         * @param Array     names of keys
         * @return bool
         */
    }, {
        key: "any",
        value: function any(names) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var name = _step.value;

                    if (this.keys.has(name)) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "filter",
        value: function filter(names) {
            var keys = new Set(this.keys.values());

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    if (names.indexOf(key) == -1) {
                        keys["delete"](key);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                        _iterator2["return"]();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return keys;
        }

        /**
         * What keys should we track?
         */
    }, {
        key: "track",
        value: function track(name, keys) {

            this[name] = false;

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var key = _step3.value;

                    // Single characters
                    if (key.length == 1) {
                        this.keycodes.set(key.toUpperCase().charCodeAt(), name);

                        // Named keys
                    } else if (key in this.namedKeys) {
                            this.keycodes.set(this.namedKeys[key], name);
                        }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                        _iterator3["return"]();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }]);

    return Keyboard;
})();
"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DomCanvas = (function (_Canvas) {
	_inherits(DomCanvas, _Canvas);

	function DomCanvas() {
		_classCallCheck(this, DomCanvas);

		// Find the element
		var elements = document.getElementsByTagName("canvas");
		var element = elements[0];

		_get(Object.getPrototypeOf(DomCanvas.prototype), "constructor", this).call(this, element);
	}

	return DomCanvas;
})(Canvas);
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Font = (function (_Sprite) {
	_inherits(Font, _Sprite);

	function Font(sprite, width, height, extras) {
		_classCallCheck(this, Font);

		_get(Object.getPrototypeOf(Font.prototype), "constructor", this).call(this, sprite, width, height);

		this.extras = extras;
	}

	_createClass(Font, [{
		key: "draw",
		value: function draw(context, text, x, y) {

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
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var line = _step.value;

					// Separate into characters
					var characters = line.split("");

					// Each character
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = characters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var character = _step2.value;

							var code = character.charCodeAt(0);

							var col,
							    row = 0;

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
								_get(Object.getPrototypeOf(Font.prototype), "draw", this).call(this, context, [col, row], 0, x, y);
							}

							x += charWidth;
						}

						// Move down another line
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}

					y += lineHeight;
					x = initialX;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}]);

	return Font;
})(Sprite);
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyboardMovement = (function () {

	/**
  * @param Keyboard
  */

	function KeyboardMovement(keyboard) {
		_classCallCheck(this, KeyboardMovement);

		// Track movement keys
		keyboard.track("up", ["w", "up"]);
		keyboard.track("down", ["s", "down"]);
		keyboard.track("left", ["a", "left"]);
		keyboard.track("right", ["d", "right"]);

		// Save the keyboard for later
		this.keyboard = keyboard;

		this.degrees = 0;
	}

	_createClass(KeyboardMovement, [{
		key: "direction",
		value: function direction() {

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
	}, {
		key: "moving",
		value: function moving() {
			return this.keyboard.any(["up", "down", "left", "right"]);
		}
	}, {
		key: "name",
		value: function name() {
			return this.keyboard.latest;
		}

		/**
   * Provides an x, y delta
   * @return Array
   */
	}, {
		key: "delta",
		value: function delta() {

			var delta = [0, 0];

			// If anything is pressed
			if (this.keyboard.latest) {

				if (this.keyboard.latest == "up") {
					delta = [0, -1];
				} else if (this.keyboard.latest == "down") {
					delta = [0, 1];
				} else if (this.keyboard.latest == "left") {
					delta = [-1, 0];
				} else if (this.keyboard.latest == "right") {
					delta = [1, 0];
				}
			}

			// Always return the degrees
			return delta;
		}
	}]);

	return KeyboardMovement;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loop = (function () {
	function Loop(callback) {
		_classCallCheck(this, Loop);

		var self = this;

		self.lastTime = Date.now();
		self.ellapsed = 0;
		self.frames = 0;
		self.fps = 0;
		self.cap = 100;

		// We use a wrapper so we can automatically ask for another frame
		var wrapper = function wrapper() {

			// Enforce the frame cap
			if (self.fps < self.cap) {

				// Run the callback
				callback.apply(self);

				// Count as a frame
				self.frames++;
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

	_createClass(Loop, [{
		key: "setCap",
		value: function setCap(cap) {
			this.cap = cap;
		}
	}]);

	return Loop;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mouse = (function () {
	function Mouse(canvas) {
		_classCallCheck(this, Mouse);

		this.canvas = canvas;

		this.resize();
		this.addEvent("resize", this.resize);
		this.addEvent("mousemove", this.move);
		this.addEvent("mousedown", this.down);
		this.addEvent("mouseup", this.up);

		this.addEvent("contextmenu", function (e) {
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

	_createClass(Mouse, [{
		key: "addEvent",
		value: function addEvent(event, callback) {
			var self = this;
			window.addEventListener(event, function (e) {
				return callback.apply(self, [e]);
			});
		}
	}, {
		key: "down",
		value: function down(e) {
			this[e.button == 2 ? "rightButton" : "leftButton"] = true;
		}
	}, {
		key: "up",
		value: function up(e) {
			this[e.button == 2 ? "rightButton" : "leftButton"] = false;
		}
	}, {
		key: "resize",
		value: function resize() {

			this.bounds = this.canvas.element.getBoundingClientRect();
			this.left = this.bounds.left;
			this.top = this.bounds.top;
		}
	}, {
		key: "move",
		value: function move(e) {
			this.x = Math.floor((e.clientX - this.bounds.left) / this.scale);
			this.y = Math.floor((e.clientY - this.bounds.top) / this.scale);
		}
	}]);

	return Mouse;
})();
"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VirtualCanvas = (function (_Canvas) {
	_inherits(VirtualCanvas, _Canvas);

	function VirtualCanvas(width, height) {
		_classCallCheck(this, VirtualCanvas);

		// Create the element
		var element = document.createElement("canvas");

		// Set the size
		element.width = width;
		element.height = height;

		_get(Object.getPrototypeOf(VirtualCanvas.prototype), "constructor", this).call(this, element);
	}

	return VirtualCanvas;
})(Canvas);
// An example of a class you might right for your game

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PixelCanvas = (function () {
	function PixelCanvas(width, height, scale) {
		_classCallCheck(this, PixelCanvas);

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

	_createClass(PixelCanvas, [{
		key: "clear",
		value: function clear() {

			// Clear the virtual canvas
			this.canvas.clear();
		}

		/**
   * Draw to the screen
   */
	}, {
		key: "draw",
		value: function draw() {

			// Enlarge onto the screen
			this.domCanvas.clear();
			this.domCanvas.context.drawImage(this.canvas.element, 0, 0, this.width * this.scale, this.height * this.scale);
		}
	}]);

	return PixelCanvas;
})();
"use strict";

window.addEventListener("load", function () {

	// This is a custom canvas wrapper class just to demonstrate what you
	// can do VirtualCanvas - see ./PixelCanvas.js
	var canvas = new PixelCanvas(100, 100, 4);

	// Load a squid sprite
	var squid = new Sprite("images/squidlegs.png", 20, 20);

	var i = 0;
	new Loop(function () {
		i++;

		// Clear the canvas
		canvas.clear();

		// Draw the squid using a canvas context
		squid.draw(canvas.context, i % 40 > 20, 0, 40, 40);

		// Done
		canvas.draw();
	});
});