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
