class Keyboard {

    /**
     * Setup events
     */
    constructor() {
        this.keycodes = new Map();

        this.namedKeys = {
            up : 38,
            down : 40,
            left : 37,
            right : 39,
            space : 32
        };

        this.keys = new Set();

        this.latest = false;

        var self = this;

        window.onkeydown = function(event) {

            if (self.keycodes.has(event.which)) {
                var name = self.keycodes.get(event.which);

                // Add the key
                self.keys.add(name);

                // Set as the latest
                self.latest = name;

                return false;
            }
        };

        window.onkeyup = function(event) {

            if (self.keycodes.has(event.which)) {
                var name = self.keycodes.get(event.which);

                // Remove the key
                self.keys.delete(name);

                // Recalculate latest
                if (self.keys.size == 0) {
                    self.latest = false;
                } else {
                    self.latest = Array.from(self.keys).pop();
                }

                return false;
            }

        };

        window.onblur = function(event) {

            // No keys can be held down while we're not in the window
            self.keys.clear();

            self.latest = false;
        }
    }

    pressed(name) {
        return this.keys.has(name);
    }

    /**
     * True if any of the keys are pressed
     * @param Array     names of keys
     * @return bool
     */
    any(names) {
        for (var name of names) {
            if (this.keys.has(name)) {
                return true;
            }
        }
    }

    filter(names) {
        var keys = new Set(this.keys.values());

        for (var key of keys) {
            if (names.indexOf(key) == -1) {
                keys.delete(key);
            }
        }

        return keys;
    }

    /**
     * What keys should we track?
     */
    track(name, keys) {

        this[name] = false;

        for (var key of keys) {

            // Single characters
            if (key.length == 1) {
                this.keycodes.set(key.toUpperCase().charCodeAt(), name);

            // Named keys
            } else if (key in this.namedKeys) {
                this.keycodes.set(this.namedKeys[key], name);
            }


        }

    }

}
