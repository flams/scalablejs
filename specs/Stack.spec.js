/**
 * Scalable http://flams.github.com/scalable
 * The MIT License (MIT)
 * Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
 */

require(["Stack"], function (Stack) {

	describe("Stack allows for stacking up DOM elements at a specific place in the DOM", function () {

		var stack  = null;

		beforeEach(function () {
			stack = new Stack;
		});

		it("should be a constructor function", function () {
			expect(Stack).toBeInstanceOf(Function);
		});

		it("should have a function for adding a DOM element", function () {
			expect(stack.add).toBeInstanceOf(Function);
		});

	});

});
