"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Crumb = function () {
    function Crumb(name, uri) {
        _classCallCheck(this, Crumb);

        this.name = name;
        this.uri = uri;
    }

    _createClass(Crumb, [{
        key: "getUri",
        value: function getUri() {
            return this.uri;
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }]);

    return Crumb;
}();

exports.default = Crumb;