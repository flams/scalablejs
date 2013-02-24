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
			var index = _parent.indexOf(dom);
			if (index < 0) {
				_parent.appendChild(dom);
				_childNodes.push(_childNodes);
				return dom;
			} else {
				return false;
			}
		};

		this.remove = function remove(dom) {
			var index = _parent.indexOf(dom);
			if (index >= 0) {
				_parent.removeChild(dom);
				_childNodes.splice(_childNodes.indexOf(dom), 1);
				return dom;
			} else {
				return false;
			}
		};

		this.place = function place() {

		};

		this.up = function up() {

		};

		this.down = function down() {

		};

		this.insert = function insert() {

		};

		this.getPosition = function getPosition() {

		};

		this.count = function count() {

		};

		this.has = function has() {

		};

		this.getParent = function _getParent() {
				return _parent;
		};

		this.setParent = function setParent(parent) {
			if (parent instanceof HTMLElement) {
				_parent = parent;
				return parent;
			} else {
				return false;
			}
		};

		this._getAll = function _getAll() {

		};

	};

});
