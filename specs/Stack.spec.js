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
			expect(stack._setParent).toBeInstanceOf(Function);
			expect(stack._setParent({})).toBe(false);
			expect(stack._setParent(parentDom)).toBe(parentDom);

			expect(stack.getParent()).toBe(parentDom);
		});

		it("should have a function to get the parent element", function () {
			expect(stack.getParent).toBeInstanceOf(Function);
			expect(stack.getParent().nodeName).toBe("#document-fragment");
		});

		it("can be initialised with a parent element", function () {
			var parent = document.createElement("div"),
				newStack = new Stack(parent);

			expect(newStack.getParent()).toBe(parent);
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

			spyOn(parentDom, "appendChild").andCallThrough();
			spyOn(parentDom, "removeChild").andCallThrough();
			spyOn(parentDom, "insertBefore").andCallThrough();
			stack._setParent(parentDom);
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
			var newPlace = document.createElement("div"),
				dom1 = document.createElement("p"),
				dom2 = document.createElement("p"),
				dom3 = document.createElement("p");

			stack.add(dom1);
			stack.add(dom2);

			// dom3 is not part of the stack, placing the stack somewhere else
			// shouldn't move this one
			parentDom.appendChild(dom3);

			stack.place(newPlace);

			expect(newPlace.childNodes[0]).toBe(dom1);
			expect(newPlace.childNodes[1]).toBe(dom2);
			expect(parentDom.childNodes[0]).toBe(dom3);
		});

		it("should have a function for moving an element up in the stack", function () {
			var dom1 = document.createElement("p"),
				dom2 = document.createElement("p");

			expect(stack.up).toBeInstanceOf(Function);

			expect(stack.up(document.createElement("div"))).toBe(false);
			stack.add(dom1);
			stack.add(dom2);

			expect(stack.up(dom2)).toBe(dom2);

			expect(parentDom.childNodes[0]).toBe(dom2);
			expect(parentDom.childNodes[1]).toBe(dom1);
		});

		it("should have a function for moving an element down in the stack", function () {
			var dom1 = document.createElement("p"),
				dom2 = document.createElement("p");

			expect(stack.down).toBeInstanceOf(Function);

			expect(stack.down(document.createElement("div"))).toBe(false);
			stack.add(dom1);
			stack.add(dom2);

			expect(stack.down(dom1)).toBe(dom1);

			expect(parentDom.childNodes[0]).toBe(dom2);
			expect(parentDom.childNodes[1]).toBe(dom1);
		});

		it("should have a function for moving an element at a specific position in the stack", function () {
			var dom1 = document.createElement("p"),
				dom2 = document.createElement("p");
				dom3 = document.createElement("p");

			expect(stack.move).toBeInstanceOf(Function);
			stack.add(dom1);
			stack.add(dom2);
			stack.add(dom3);

			expect(stack.move(dom3, 0)).toBe(dom3);
			expect(parentDom.childNodes[0]).toBe(dom3);
		});

		it("should have a function for inserting a new element at a specific position in the stack", function () {
			var dom1 = document.createElement("p"),
				dom2 = document.createElement("p");
				dom3 = document.createElement("p");

			expect(stack.insert).toBeInstanceOf(Function);
			stack.add(dom1);
			stack.add(dom3);

			expect(stack.insert(dom2, 1)).toBe(dom2);

			expect(parentDom.childNodes[1]).toBe(dom2);
			expect(stack.getPosition(dom2)).toBe(1);
		});

		it("should have a function for getting the current position in the stack", function () {
			var dom1 = document.createElement("p"),
				dom2 = document.createElement("p");
				dom3 = document.createElement("p");

			expect(stack.getPosition).toBeInstanceOf(Function);
			stack.add(dom1);
			stack.add(dom2);
			stack.add(dom3);

			expect(stack.getPosition(dom3)).toBe(2);
		});

		it("should have a function for getting the length of the stack", function () {
			expect(stack.count).toBeInstanceOf(Function);
			stack.add(document.createElement("div"));
			stack.add(document.createElement("div"));

			expect(stack.count()).toBe(2);
		});

		it("should have a function for telling if a DOM element is in the stack", function () {
			var dom = document.createElement("p");

			expect(stack.has).toBeInstanceOf(Function);
			stack.add(dom);
			expect(stack.has(dom)).toBe(true);
		});

	});

});
