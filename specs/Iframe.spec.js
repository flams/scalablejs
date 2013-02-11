/**
 * Scalable http://flams.github.com/scalable
 * The MIT License (MIT)
 * Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
 */

require(["Iframe"], function (Iframe) {

	describe("Iframe", function () {

		var iframe = null,
			duckIframe = null;

		beforeEach(function () {
			iframe = new Iframe();
			duckIframe = {
				addEventListener: jasmine.createSpy(),
				removeEventListener: jasmine.createSpy()
			};
		});

		it("should be a constructor function", function () {
			expect(Iframe).toBeInstanceOf(Function);
		});

		it("should create an iframe", function () {
			spyOn(document, "createElement").andReturn(duckIframe);

			expect(iframe.create).toBeInstanceOf(Function);
			expect(iframe.create()).toBe(duckIframe);
		});

		it("should add an event listener on load if create is given a callback", function () {
			var callback = jasmine.createSpy(),
				scope = {};

			spyOn(iframe, "onLoad");

			iframe.create();

			expect(iframe.onLoad.wasCalled).toBe(false);

			iframe.create(callback, scope);

			expect(iframe.onLoad.wasCalled).toBe(true);
			expect(iframe.onLoad.mostRecentCall.args[0]).toBe(callback);
			expect(iframe.onLoad.mostRecentCall.args[1]).toBe(scope);
		});

		it("should allow for setting its own internal iframe", function () {
			expect(iframe.get()).toBe(null);

			expect(iframe.set({})).toBe(false);

			expect(iframe.set(duckIframe)).toBe(true);

			expect(iframe.get()).toBe(duckIframe);
		});

		it("should allow for setting the on load callback with a scope", function () {
			var spy = jasmine.createSpy(),
				onLoad;

			expect(iframe.onLoad()).toBe(false);
			expect(iframe.onLoad(jasmine.createSpy(), {})).toBe(false);
			iframe.set(duckIframe);

			expect(iframe.onLoad(spy)).toBe(true);

			expect(duckIframe.addEventListener.wasCalled).toBe(true);
			expect(duckIframe.addEventListener.mostRecentCall.args[0]).toBe("load");
			expect(duckIframe.addEventListener.mostRecentCall.args[2]).toBe(true);

			onLoad = duckIframe.addEventListener.mostRecentCall.args[1];
			expect(onLoad).toBeInstanceOf(Function);
		});

		it("should call the given callback on load", function () {
			var spy = jasmine.createSpy(),
				callbackScope = {},
				iframeScope = {},
				event = {},
				onLoad;

			iframe.set(duckIframe);
			iframe.onLoad(spy, callbackScope);

			onLoad = duckIframe.addEventListener.mostRecentCall.args[1];
			onLoad.call(iframeScope, event);

			expect(spy.wasCalled).toBe(true);
			expect(spy.mostRecentCall.args[0]).toBe(event);
			expect(spy.mostRecentCall.args[1]).toBe(iframeScope);
			expect(spy.mostRecentCall.object).toBe(callbackScope);
		});

		it("should remove the event listener after onLoad", function () {
			var spy = jasmine.createSpy(),
				callbackScope = {},
				iframeScope = {},
				event = {},
				onLoad;

			iframe.set(duckIframe);
			iframe.onLoad(spy, callbackScope);

			onLoad = duckIframe.addEventListener.mostRecentCall.args[1];
			onLoad.call(iframeScope, event);

			expect(duckIframe.removeEventListener.wasCalled).toBe(true);
			expect(duckIframe.removeEventListener.mostRecentCall.args[0]).toBe("load");
			expect(duckIframe.removeEventListener.mostRecentCall.args[2]).toBe(true);
		});

	});

});
