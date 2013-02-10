###############################################################################################
# ScalableJS http://flams.github.com/scalablejs
# The MIT License (MIT)
# Copyright (c) 2013 Olivier Scherrer <pode.fr@gmail.com>
#
# Targets:
#
# make tests: runs the JsTestDriver tests
#
# make docs: generates the documentation into docs/latest
# make build: generates Scalable.js and Scalable.min.js as they appear in the release
#
# make all: tests + docs + build
#
# #make release VERSION=x.x.x: make all, then creates the package and pushes to github
#
################################################################################################

SRC := $(wildcard src/*.js)
JsTestDriver = $(shell find tools -name "JsTestDriver-*.jar" -type f)

all: tests docs build

clean-docs:
	-rm -rf docs/latest/

clean-build:
	-rm -rf build/

clean-temp:
	rm -f temp.js

docs: clean-docs
	java -jar tools/JsDoc/jsrun.jar \
		tools/JsDoc/app/run.js src \
		-r=2 \
		-d=docs/latest/ \
		-t=tools/JsDoc/templates/jsdoc

tests: temp.js
	java -jar $(JsTestDriver) \
		--tests all

build: clean-build Scalable.js
	cp LICENSE build/
	cp -rf src/ build/src/

release: all
ifndef VERSION
	@echo "You must give a VERSION number to make release"
	@exit 2
endif

	mkdir -p release/tmp/Scalable-$(VERSION)
	cp -rf build/* release/tmp/Scalable-$(VERSION)

	cd release/tmp/Scalable-$(VERSION); \
	sed -i .bak 's#<VERSION>#'$(VERSION)'#' Scalable.js Scalable.min.js; \
	rm Scalable.js.bak Scalable.min.js.bak

	cd release/tmp/; \
	tar czf ../Scalable-$(VERSION).tgz Scalable-$(VERSION)

	rm -rf release/tmp/

	cp -rf docs/latest/ docs/$(VERSION)/

	git add build docs release

	git commit -am "released version $(VERSION)"

	git push

	git tag $(VERSION)

	git push --tags

temp.js: clean-temp
	r.js -o tools/build.js

Scalable.js: temp.js
	mkdir -p build
	cat LICENSE-MINI temp.js > build/$@

	java -jar tools/GoogleCompiler/compiler.jar \
		--js build/Scalable.js \
		--js_output_file build/Scalable.min.js \
		--create_source_map build/Scalable-map

clean: clean-build clean-docs clean-temp

.PHONY: docs clean-docs clean-build build tests release clean
