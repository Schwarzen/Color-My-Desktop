'use strict';

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _markup = require('./snippets/markup');

var _markup2 = _interopRequireDefault(_markup);

var _css = require('./snippets/css');

var _css2 = _interopRequireDefault(_css);

var _clike = require('./snippets/clike');

var _clike2 = _interopRequireDefault(_clike);

var _javascript = require('./snippets/javascript');

var _javascript2 = _interopRequireDefault(_javascript);

var _elixir = require('./snippets/elixir');

var _elixir2 = _interopRequireDefault(_elixir);

var _ruby = require('./snippets/ruby');

var _ruby2 = _interopRequireDefault(_ruby);

var _jsx = require('../languages/jsx');

var _jsx2 = _interopRequireDefault(_jsx);

var _elixir3 = require('../languages/elixir');

var _elixir4 = _interopRequireDefault(_elixir3);

var _ruby3 = require('../languages/ruby');

var _ruby4 = _interopRequireDefault(_ruby3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _.loadLanguages)(_jsx2.default, _elixir4.default, _ruby4.default);

describe('Prism', function () {
  it('should export a global', function () {
    expect(_2.default).toBeDefined();
  });
  it('should highlight markup', function () {
    var res = (0, _.highlight)(_markup2.default, 'markup');
    expect(res).toMatchSnapshot();
  });
  it('should highlight css', function () {
    var res = (0, _.highlight)(_css2.default, 'css');
    expect(res).toMatchSnapshot();
  });
  it('should highlight clike', function () {
    var res = (0, _.highlight)(_clike2.default, 'clike');
    expect(res).toMatchSnapshot();
  });
  it('should highlight javascript', function () {
    var res = (0, _.highlight)(_javascript2.default, 'javascript');
    expect(res).toMatchSnapshot();
  });
  it('should highlight jsx', function () {
    var res = (0, _.highlight)(_javascript2.default, 'jsx');
    expect(res).toMatchSnapshot();
  });
  it('should highlight elixir', function () {
    var res = (0, _.highlight)(_elixir2.default, 'elixir');
    expect(res).toMatchSnapshot();
  });
  it('should highlight ruby', function () {
    var res = (0, _.highlight)(_ruby2.default, 'ruby');
    expect(res).toMatchSnapshot();
  });
});