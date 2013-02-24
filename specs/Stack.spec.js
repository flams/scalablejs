/**
 * Scalable http://flams.github.com/scalable
 * The MIT License (MIT)
 * Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
 */

require(["Stack"], function (Stack) {

	describe("Stack Init", function () {

		var stack = null,
			parentDom = null;

		beforeEach(function () {
			stack = new Stack;
			parentDom = document.createElement("div");
		});

		it("should be a constructor function", function () {
			expect(Stack).toBeInstanceOf(Function);
		});

		it("should have a function to set the Parent element", function () {
			expect(stack.setParent).toBeInstanceOf(Function);
			expect(stack.setParent({})).toBe(false);
			expect(stack.setParent(parentDom)).toBe(parentDom);

			expect(stack.getParent()).toBe(parentDom);
		});

		it("should have a function to get the parent element", function () {
			expect(stack.getParent).toBeInstanceOf(Function);
			expect(stack.getParent().nodeName).toBe("#document-fragment");
		});

	});

	describe("Stack API", function () {

		var stack = null,
			parentDom = null,
			childDom = null;

		beforeEach(function () {
			stack = new Stack;
			parentDom = document.createElement("div");
			childDom = document.createElement("p");

			spyOn(parentDom, "appendChild");
			stack.setParent(parentDom);
		});

		it("should have a function for adding a DOM element", function () {
			expect(stack.add).toBeInstanceOf(Function);

			expect(stack.add(childDom)).toBe(childDom);

			expect(parentDom.appendChild.wasCalled).toBe(true);
			expect(parentDom.appendChild.mostRecentCall.args[0]).toBe(childDom);
		});

		it("shouldn't add an element that is already in the stack", function () {
			expect(stack.add(childDom)).toBe(true);
			expect(stack.remove(childDom)).toBe(false);
		});

		it("should have a function for removing a DOM element", function () {
			expect(stack.remove).toBeInstanceOf(Function);
			expect(stack.remove(document.createElement("div"))).toBe(false);

			stack.add(childDom);
			expect(stack.remove(childDom)).toBe(childDom);

			expect(parentDom.removeChild.wasCalled).toBe(true);
			expect(parentDom.removeChild.mostRecentCall.args[0]).toBe(childDom);
		});

		it("should have a function for appending the stack to a parent DOM element", function () {
			expect(stack.place).toBeInstanceOf(Function);

			stack.place(parentDom)
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

		it("should have a function for telling if a DOM element is in the stack", function () {
			expect(stack.has).toBeInstanceOf(Function);
			var myDom = {};


		});

	});

});
