/**
 * Scalable http://flams.github.com/scalable
 * The MIT License (MIT)
 * Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
 */

beforeEach(function () {
	this.addMatchers({
		toBeInstanceOf: function(expected) {
			return this.actual instanceof expected;
		}
	});
});
