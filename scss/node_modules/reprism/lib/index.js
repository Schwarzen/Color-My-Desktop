'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadLanguages = exports.highlight = undefined;

var _markup = require('./languages/markup');

var _markup2 = _interopRequireDefault(_markup);

var _css = require('./languages/css');

var _css2 = _interopRequireDefault(_css);

var _clike = require('./languages/clike');

var _clike2 = _interopRequireDefault(_clike);

var _javascript = require('./languages/javascript');

var _javascript2 = _interopRequireDefault(_javascript);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _core.loadLanguages)([_markup2.default, _css2.default, _clike2.default, _javascript2.default]);

exports.default = _core2.default;
exports.highlight = _core.highlight;
exports.loadLanguages = _core.loadLanguages;