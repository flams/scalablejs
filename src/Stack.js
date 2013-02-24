/**
 * Scalable http://flams.github.com/scalable
 * The MIT License (MIT)
 * Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
 */

define(

/**
 * A Stack is a tool for managing DOM elements as groups. Within a group, dom elements
 * can be added, removed, moved around. The group can be moved to another parent node
 * while keeping the DOM elements in the same order, excluding the parent dom elements's
 * children that are not in the Stack.
 * @class
 */
function Stack() {

	return function StackConstructor($parent) {

		/**
		 * The parent DOM element is a documentFragment by default
		 * @private
		 */
		var _parent = document.createDocumentFragment(),

		/**
		 * The list of dom elements that are part of the stack
		 * Helps for excluding elements that are not part of it
		 * @private
		 */
		_childNodes = [];

		/**
		 * Add a DOM element to the stack. It will be appended.
		 * @param {HTMLElement} dom the DOM element to add
		 * @returns {HTMLelement} dom
		 */
		this.add = function add(dom) {
			if (!this.has(dom) && dom instanceof HTMLElement) {
				_parent.appendChild(dom);
				_childNodes.push(dom);
				return dom;
			} else {
				return false;
			}
		};

		/**
		 * Add a DOM element to the stack. It will be appended.
		 * @param {HTMLElement} dom the DOM element to add
		 * @returns {HTMLelement} dom
		 */
		this.remove = function remove(dom) {
			var index;
			if (this.has(dom)) {
				index = _childNodes.indexOf(dom);
				_parent.removeChild(dom);
				_childNodes.splice(index, 1);
				return dom;
			} else {
				return false;
			}
		};

		this.place = function place(newParentDom) {
			if (newParentDom instanceof HTMLElement) {
				[].slice.call(_parent.childNodes).forEach(function (childDom) {
					if (this.has(childDom)) {
						newParentDom.appendChild(childDom);
					}
				}, this);
				return this._setParent(newParentDom);
			} else {
				return false;
			}
		};

		this.up = function up(dom) {
			if (this.has(dom)) {
				var domPosition = this.getPosition(dom);
				this.move(dom, domPosition-1);
				return dom;
			} else {
				return false;
			}
		};

		this.down = function down(dom) {
			if (this.has(dom)) {
				var domPosition = this.getPosition(dom);
				this.move(dom, domPosition+2);
				return dom;
			} else {
				return false;
			}
		};

		this.move = function move(dom, position) {
			if (this.has(dom)) {
				_parent.insertBefore(dom, _parent.childNodes[position]);
				return dom;
			} else {
				return false;
			}
		};

		this.insert = function insert(dom, position) {
			if (!this.has(dom) && dom instanceof HTMLElement) {
				_childNodes.push(dom);
				_parent.insertBefore(dom, _parent.childNodes[position]);
				return dom;
			} else {
				return false;
			}
		};

		this.getPosition = function getPosition(dom) {
			return [].slice.call(_parent.childNodes).indexOf(dom);
		};

		this.count = function count() {
			return _parent.childNodes.length;
		};

		this.has = function has(childDom) {
			return _childNodes.indexOf(childDom) >= 0;
		};

		this.getParent = function _getParent() {
				return _parent;
		};

		this._setParent = function _setParent(parent) {
			if (parent instanceof HTMLElement) {
				return _parent = parent;
			} else {
				return false;
			}
		};

		this._setParent($parent);

	};

});
