/**
 * @license ScalableJS <VERSION> http://flams.github.com/scalablejs
 * The MIT License (MIT)
 * Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
 */

/**
 * Scalable http://flams.github.com/scalable
 * The MIT License (MIT)
 * Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
 */

define('Iframe',[],

/**
* @class
* iframe for managing iframes, one at a time
*/
function Iframe() {

	return function IframeConstructor() {

		/**
		 * The internal iframe
		 * @private
		 */
		var _iframe = null,

		/**
		 * If the "iframe" walks like a duck
		 * @private
		 */
		_isValidIframe = function _isValidIframe(iframe) {
			return !!(iframe &&
					typeof iframe.addEventListener == "function" &&
					typeof iframe.removeEventListener == "function");
		};

		/**
		 * Create an iframe and attach it and onLoad listener
		 * @param {Function} callback the callback to call on Load
		 * @param {Object} scope the scope in which to execute the callback
		 * @returns {Iframe} the created iframe
		 */
		this.create = function create(callback, scope) {
			var _iframe = document.createElement("iframe");

			if (typeof callback == "function") {
				this.onLoad(callback, scope);
			}

			return _iframe;
		};

		/**
		 * Allows for setting an iframe that is not created by this tool
		 * @param {Iframe} iframe the iframe to set
		 * @returns {Boolean} true if it's an iframe
		 */
		this.set = function set(iframe) {
			if (_isValidIframe(iframe)) {
				_iframe = iframe;
				return true;
			} else {
				return false;
			}
		};

		/**
		 * Returns the current internal iframe
		 * @returns {Iframe} the iframe that is currently used internally
		 */
		this.get = function get() {
			return _iframe;
		};

		/**
		 * Add an event listener on the "load" event to know when the iframe
		 * was successfully loaded. This method is automatically called on create()
		 * @param {Function} callback the callback to call on Load
		 * @param {Object} scope the scope in which to execute the callback
		 * @returns {Boolean} false if the current iframe is not set
		 */
		this.onLoad = function onLoad(callback, scope) {
			if (_isValidIframe(_iframe) && typeof callback == "function") {
				_iframe.addEventListener("load", function _onLoad(event) {
					callback.call(scope, event, this);

					_iframe.removeEventListener("load", _onLoad, true);
				}, true);
				return true;
			} else {
				return false;
			}
		};
	};
});

/**
 * Scalable http://flams.github.com/scalable
 * The MIT License (MIT)
 * Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
 */

define('Stack',[],

/**
* @class
*/
function Stack() {

	return function StackConstructor() {

		var _parent = document.createDocumentFragment(),
			_childNodes = [];

		this.add = function add(dom) {
			if (!this.has(dom) && dom instanceof HTMLElement) {
				_parent.appendChild(dom);
				_childNodes.push(dom);
				return dom;
			} else {
				return false;
			}
		};

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

	};

});
