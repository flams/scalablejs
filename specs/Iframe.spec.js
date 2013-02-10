/**
 * Scalable http://flams.github.com/scalable
 * The MIT License (MIT)
 * Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
 */

require(["Iframe"], function (Iframe) {

	describe("Iframe", function () {

		it("should be a constructor function", function () {
			expect(Iframe).toBeInstanceOf(Function);
		});

		it("should create an iframe", function () {
			var iframeElement = {},
				iframe;

			spyOn(document, "createElement").andReturn(iframeElement);

			iframe = new Iframe();

			expect(iframe.create).toBeInstanceOf(Function);
		});

	});

});
