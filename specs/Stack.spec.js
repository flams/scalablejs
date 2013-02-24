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
			spyOn(parentDom, "removeChild");
			stack.setParent(parentDom);
		});

		it("should have a function for adding a DOM element", function () {
			expect(stack.add).toBeInstanceOf(Function);

			expect(stack.add(childDom)).toBe(childDom);

			expect(parentDom.appendChild.wasCalled).toBe(true);
			expect(parentDom.appendChild.mostRecentCall.args[0]).toBe(childDom);
		});

		it("shouldn't add an element that is already in the stack", function () {
			expect(stack.add(childDom)).toBe(childDom);
			expect(stack.add(childDom)).toBe(false);
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
			var newPlace = document.createElement("div");

			expect(stack.place({})).toBe(false);
			expect(stack.place(newPlace)).toBe(newPlace);

			expect(stack.getParent()).toBe(newPlace);
		});

		it("should carry over the dom nodes from the previous place", function () {
			var place1 = document.createElement("div"),
				place2 = document.createElement("div"),
				dom1 = document.createElement("p"),
				dom2 = document.createElement("p"),
				dom3 = document.createElement("p");

			// The stack is placed at place1
			stack.place(place1);
			// It has two child dom nodes
			stack.add(dom1);
			stack.add(dom2);

			// dom3 is not part of the stack, placing the stack somewhere else
			// shouldn't move this one
			place1.appendChild(dom3);

			stack.place(place2);

			expect(place2.childNodes[0]).toBe(dom1);
			expect(place2.childNodes[1]).toBe(dom2);
			expect(place1.childNodes[0]).toBe(dom3);
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
