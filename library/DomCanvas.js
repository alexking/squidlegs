class DomCanvas extends Canvas {

	constructor() {

		// Find the element
		var elements = document.getElementsByTagName("canvas");
		var element = elements[0];

		super(element);
	}

}
