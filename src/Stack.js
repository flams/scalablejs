/**
 * Scalable http://flams.github.com/scalable
 * The MIT License (MIT)
 * Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
 */

define(

/**
* @class
*/
function Stack() {

	return function StackConstructor() {

		var _parent = document.createDocumentFragment(),
			_childNodes = [];

		this.add = function add(dom) {
			var index = _childNodes.indexOf(dom);
			if (index < 0) {
				_parent.appendChild(dom);
				_childNodes.push(dom);
				return dom;
			} else {
				return false;
			}
		};

		this.remove = function remove(dom) {
			var index = _childNodes.indexOf(dom);
			if (index >= 0) {
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
				return this.setParent(newParentDom);
			} else {
				return false;
			}
		};

		this.up = function up() {

		};

		this.down = function down() {

		};

		this.insert = function insert() {

		};

		this.getPosition = function getPosition(dom) {
		};

		this.count = function count() {

		};

		this.has = function has(childDom) {
			return _childNodes.indexOf(childDom) >= 0;
		};

		this.getParent = function _getParent() {
				return _parent;
		};

		this.setParent = function setParent(parent) {
			if (parent instanceof HTMLElement) {
				return _parent = parent;
			} else {
				return false;
			}
		};

		this._getAll = function _getAll() {

		};

	};

});
