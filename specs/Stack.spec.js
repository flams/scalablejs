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

		it("should have a function for removing a DOM element", function () {
			expect(stack.remove).toBeInstanceOf(Function);
		});

		it("should have a function for appending the stack to a parent DOM element", function () {
			expect(stack.place).toBeInstanceOf(Function);
		});

		it("should have a function for moving an element up in the stack", function () {
			expect(stack.up).toBeInstanceOf(Function);
		});

		it("should have a function for moving an element down in the stack", function () {
			expect(stack.down).toBeInstanceOf(Function);
		});

		it("should have a function for placing the element at a specific position", function () {
			expect(stack.insert).toBeInstanceOf(Function);
		});

		it("should have a function for getting the current position in the stack", function () {
			expect(stack.getPosition).toBeInstanceOf(Function);
		});

		it("should have a function for getting the length of the stack", function () {
			expect(stack.count).toBeInstanceOf(Function);
		});

	});

});
