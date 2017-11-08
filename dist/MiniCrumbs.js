"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Crumb = require("./Crumb");

var _Crumb2 = _interopRequireDefault(_Crumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MiniCrumbs = function () {
    function MiniCrumbs(req) {
        var fm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "standard";
        var home = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "home";

        _classCallCheck(this, MiniCrumbs);

        this.breadcrumbs = null;
        this.wordsPattern = /([+\-_$%{}()])|(%20)/g;
        this.trailingSlash = /\/$/;
        var uri = req.url;

        if (home) {
            this.home = home;
        }

        uri = uri.replace(this.trailingSlash, "");

        //cache the original slugs
        this.origin = uri.split("/");
        this.slugs = uri.split("/");
        this.uri = uri;

        if (fm !== "upper" && fm !== "lower" && fm !== "standard") {
            throw "Format Exception: no format specified for Minicrumbs";
        } else {
            this.format = fm;
        }
    }

    _createClass(MiniCrumbs, [{
        key: "formatCrumbs",
        value: function formatCrumbs(words) {
            var result = [];

            switch (this.format) {
                case "upper":
                    for (var i = 0; i < words.length; i++) {
                        result.push(words[i].toUpperCase());
                    }
                    break;

                case "lower":
                    for (var i = 0; i < words.length; i++) {
                        result.push(words[i].toLowerCase());
                    }
                    break;

                default:
                    for (var i = 0; i < words.length; i++) {
                        result.push(this.capitalizeFirstLetter(words[i]));
                    }
                    break;
            }

            return result;
        }
    }, {
        key: "formatSpecials",
        value: function formatSpecials() {
            var _this = this;

            for (var i = 0; i < this.slugs.length; i++) {
                var words = this.slugs[i].split(this.wordsPattern);
                words = words.filter(function (word, index) {
                    if (word === undefined) return false;
                    return !word.match(_this.wordsPattern);
                });
                words = this.formatCrumbs(words);
                this.slugs[i] = words.join(" ");
            }
        }
    }, {
        key: "buildLinks",
        value: function buildLinks() {
            var currentUri = "";
            var result = [];

            this.origin.forEach(function (uri, index) {
                if (uri === "") return;
                if (uri !== "/") {
                    currentUri += "/" + uri;
                } else {
                    currentUri += uri + "/";
                }
                result.push(currentUri);
            });

            return result;
        }
    }, {
        key: "capitalizeFirstLetter",
        value: function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }, {
        key: "cleanSlugs",
        value: function cleanSlugs() {
            var cleanSlugs = [];
            for (var slug in this.slugs) {
                if (this.slugs[slug] === "") continue;
                cleanSlugs.push(this.slugs[slug]);
            };

            this.slugs = cleanSlugs;
        }
    }, {
        key: "parse",
        value: function parse() {
            var breadcrumbs = [];
            this.cleanSlugs();
            this.formatSpecials();
            var links = this.buildLinks();

            if (this.home) {
                var homeStr = this.formatCrumbs([this.home]);
                breadcrumbs.push(new _Crumb2.default(homeStr[0], "/"));
            }

            for (var i = 0; i < this.slugs.length; i++) {
                breadcrumbs.push(new _Crumb2.default(this.slugs[i], links[i]));
            }

            this.breadcrumbs = breadcrumbs;
            return breadcrumbs;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.breadcrumbs === null) {
                throw "Breadcrumb Error: No Breadcrumb instantiated with the 'parse()' method";
            }

            var html = "<div id='bread'><ul>";

            for (var i = 0; i < this.breadcrumbs.length - 1; i++) {
                html += "<li><a href='" + this.breadcrumbs[i].getUri() + "'>" + this.breadcrumbs[i].getName() + "</a></li>";
            }

            html += "<li>" + this.breadcrumbs[this.breadcrumbs.length - 1].getName() + "</li>" + "</ul>" + "</div>";

            return html;
        }
    }]);

    return MiniCrumbs;
}();

exports.default = MiniCrumbs;