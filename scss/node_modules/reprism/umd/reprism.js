/*!
 * reprism v0.0.11 - https://github.com/tannerlinsley/reprism
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReactSyntax"] = factory();
	else
		root["ReactSyntax"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__languages_markup__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__languages_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__languages_clike__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__languages_javascript__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "highlight", function() { return __WEBPACK_IMPORTED_MODULE_4__core__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "loadLanguages", function() { return __WEBPACK_IMPORTED_MODULE_4__core__["c"]; });







Object(__WEBPACK_IMPORTED_MODULE_4__core__["c" /* loadLanguages */])([__WEBPACK_IMPORTED_MODULE_0__languages_markup__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__languages_css__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__languages_clike__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__languages_javascript__["a" /* default */]]);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_4__core__["a" /* default */]);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  language: 'markup',
  init: function init(Prism) {
    Prism.languages.markup = {
      comment: /<!--[\s\S]*?-->/,
      prolog: /<\?[\s\S]+?\?>/,
      doctype: /<!DOCTYPE[\s\S]+?>/i,
      cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        greedy: true,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/i,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          'attr-value': {
            pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
            inside: {
              punctuation: [/^=/, {
                pattern: /(^|[^\\])["']/,
                lookbehind: true
              }]
            }
          },
          punctuation: /\/?>/,
          'attr-name': {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      entity: /&#?[\da-z]{1,8};/i
    };

    Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity;

    // Plugin to make entity title show the real entity, idea by Roman Komarov
    Prism.hooks.add('wrap', function (env) {
      if (env.type === 'entity') {
        env.attributes.title = env.content.replace(/&amp;/, '&');
      }
    });

    Prism.languages.xml = Prism.languages.markup;
    Prism.languages.html = Prism.languages.markup;
    Prism.languages.mathml = Prism.languages.markup;
    Prism.languages.svg = Prism.languages.markup;
  }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  language: 'css',
  init: function init(Prism) {
    Prism.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
        inside: {
          rule: /@[\w-]+/
          // See rest below
        }
      },
      url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
      selector: /[^{}\s][^{};]*?(?=\s*\{)/,
      string: {
        pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
      important: /\B!important\b/i,
      function: /[-a-z0-9]+(?=\()/i,
      punctuation: /[(){};:]/
    };

    Prism.languages.css.atrule.inside.rest = Prism.languages.css;

    if (Prism.languages.markup) {
      Prism.languages.insertBefore('markup', 'tag', {
        style: {
          pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
          lookbehind: true,
          inside: Prism.languages.css,
          alias: 'language-css',
          greedy: true
        }
      });

      Prism.languages.insertBefore('inside', 'attr-value', {
        'style-attr': {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            'attr-name': {
              pattern: /^\s*style/i,
              inside: Prism.languages.markup.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            'attr-value': {
              pattern: /.+/i,
              inside: Prism.languages.css
            }
          },
          alias: 'language-css'
        }
      }, Prism.languages.markup.tag);
    }
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  language: 'clike',
  init: function init(Prism) {
    Prism.languages.clike = {
      comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true
      }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      'class-name': {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
        lookbehind: true,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
      boolean: /\b(?:true|false)\b/,
      function: /[a-z0-9_]+(?=\()/i,
      number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
      punctuation: /[{}[\];(),.:]/
    };
  }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  language: 'javascript',
  init: function init(Prism) {
    Prism.languages.javascript = Prism.languages.extend('clike', {
      keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
      number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
      operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
    });

    Prism.languages.insertBefore('javascript', 'keyword', {
      regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: true,
        greedy: true
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      'function-variable': {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
        alias: 'function'
      },
      constant: /\b[A-Z][A-Z\d_]*\b/
    });

    Prism.languages.insertBefore('javascript', 'string', {
      'template-string': {
        pattern: /`(?:\\[\s\S]|[^\\`])*`/,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /\$\{[^}]+\}/,
            inside: {
              'interpolation-punctuation': {
                pattern: /^\$\{|\}$/,
                alias: 'punctuation'
              },
              rest: Prism.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      }
    });

    if (Prism.languages.markup) {
      Prism.languages.insertBefore('markup', 'tag', {
        script: {
          pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
          lookbehind: true,
          inside: Prism.languages.javascript,
          alias: 'language-javascript',
          greedy: true
        }
      });
    }

    Prism.languages.js = Prism.languages.javascript;
  }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export languages */
/* unused harmony export plugins */
/* unused harmony export hooks */
/* harmony export (immutable) */ __webpack_exports__["b"] = highlight;
/* unused harmony export encode */
/* unused harmony export getType */
/* unused harmony export objId */
/* harmony export (immutable) */ __webpack_exports__["c"] = loadLanguages;
/* unused harmony export clone */
/* unused harmony export extend */
/* unused harmony export insertBefore */
/* unused harmony export DFS */
/* unused harmony export matchGrammar */
/* unused harmony export tokenize */
/* unused harmony export addHook */
/* unused harmony export runHook */
var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uniqueID = 0;

var languages = {
  extend: extend,
  insertBefore: insertBefore,
  DFS: DFS
};
var plugins = {};
var hooks = {
  all: {},
  add: addHook,
  run: runHook
};

var Token = (_temp = _class = function Token(type, content, alias, matchedStr, greedy) {
  _classCallCheck(this, Token);

  this.type = type;
  this.content = content;
  this.alias = alias;
  // Copy of the full string this token was created from
  this.length = (matchedStr || '').length | 0;
  this.greedy = !!greedy;
}, _class.stringify = function (o, language, parent) {
  if (getType(o) === 'String') {
    return o;
  }

  if (getType(o) === 'Array') {
    return o.map(function (element) {
      return Token.stringify(element, language, o);
    }).join('');
  }

  var env = {
    type: o.type,
    content: Token.stringify(o.content, language, parent),
    tag: 'span',
    classes: ['token', o.type],
    attributes: {},
    language: language,
    parent: parent
  };

  if (o.alias) {
    var aliases = Array.isArray(o.alias) ? o.alias : [o.alias];
    Array.prototype.push.apply(env.classes, aliases);
  }

  hooks.run('wrap', env);

  var attributes = Object.keys(env.attributes).map(function (name) {
    return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
  }).join(' ');

  return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
}, _temp);


var Prism = {
  languages: languages,
  plugins: plugins,
  insertBefore: insertBefore,
  matchGrammar: matchGrammar,
  tokenize: tokenize,
  hooks: hooks,
  util: {
    encode: encode,
    type: getType,
    objId: objId,
    clone: clone
  },
  Token: Token
};

/* harmony default export */ __webpack_exports__["a"] = (Prism);

function highlight(text, language) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$component = _ref.component,
      component = _ref$component === undefined ? 'pre' : _ref$component;

  if (!languages[language]) {
    if (!language) {
      throw new Error('A language is required!');
    }
    throw new Error('The language: ' + language + ' hasn\'t been loaded yet!');
  }
  var env = {
    code: text,
    grammar: languages[language],
    language: language
  };
  hooks.run('before-tokenize', env);
  env.tokens = tokenize(env.code, env.grammar);
  hooks.run('after-tokenize', env);
  return '' + (component ? '<' + component + ' class=\'reprism ' + language + ' language-' + language + '\'>' : '') + Token.stringify(encode(env.tokens), env.language) + (component ? '</' + component + '>' : '');
}

function encode(tokens) {
  if (tokens instanceof Token) {
    return new Token(tokens.type, encode(tokens.content), tokens.alias);
  } else if (getType(tokens) === 'Array') {
    return tokens.map(encode);
  }
  return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
}

function getType(o) {
  return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
}

function objId(obj) {
  if (!obj.__id) {
    uniqueID += 1;
    Object.defineProperty(obj, '__id', { value: uniqueID });
  }
  return obj.__id;
}

function loadLanguages() {
  for (var _len = arguments.length, langs = Array(_len), _key = 0; _key < _len; _key++) {
    langs[_key] = arguments[_key];
  }

  langs.forEach(function (lang) {
    if (getType(lang) === 'Array') {
      lang.forEach(function (subLang) {
        subLang.init(Prism);
      });
    } else {
      lang.init(Prism);
    }
  });
}

// Deep clone a language definition (e.g. to extend it)
function clone(o, visited) {
  visited = visited || {};

  if (getType(o) === 'Array') {
    if (visited[objId(o)]) {
      return visited[objId(o)];
    }
    var c = [];
    visited[objId(o)] = c;

    o.forEach(function (v, i) {
      c[i] = clone(v, visited);
    });

    return c;
  }

  if (getType(o) === 'Object') {
    if (visited[objId(o)]) {
      return visited[objId(o)];
    }
    var _c = {};
    visited[objId(o)] = _c;

    Object.keys(o).forEach(function (key) {
      _c[key] = clone(o[key], visited);
    });

    return _c;
  }

  return o;
}

function extend(id, redef) {
  var lang = clone(languages[id]);
  Object.keys(redef).forEach(function (key) {
    lang[key] = redef[key];
  });
  return lang;
}

function insertBefore() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var inside = args[0],
      before = args[1],
      insert = args[2],
      _args$ = args[3],
      base = _args$ === undefined ? languages : _args$;


  var grammar = base[inside];
  var resolvedInsert = insert;

  if (args.length === 2) {
    resolvedInsert = args[1];

    Object.keys(resolvedInsert).forEach(function (key) {
      grammar[key] = resolvedInsert[key];
    });

    return grammar;
  }

  var ret = {};

  Object.keys(grammar).forEach(function (key) {
    if (key === before) {
      Object.keys(insert).forEach(function (newKey) {
        ret[newKey] = insert[newKey];
      });
    }
    ret[key] = grammar[key];
  });

  // Update references in other language definitions
  DFS(languages, function callback(key, value) {
    if (value === base[inside] && key !== inside) {
      this[key] = ret;
    }
  });

  base[inside] = ret;

  return base[inside];
}

// Traverse a language definition with Depth First Search
function DFS() {
  var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments[1];
  var type = arguments[2];
  var visited = arguments[3];

  visited = visited || {};
  Object.keys(o).forEach(function (i) {
    callback.call(o, i, o[i], type || i);
    if (getType(o[i]) === 'Object' && !visited[objId(o[i])]) {
      visited[objId(o[i])] = true;
      DFS(o[i], callback, i, visited);
    } else if (getType(o[i]) === 'Array' && !visited[objId(o[i])]) {
      visited[objId(o[i])] = true;
      DFS(o[i], callback, null, visited);
    }
  });
}

function matchGrammar(text, strarr) {
  var grammar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var index = arguments[3];
  var startPos = arguments[4];
  var oneshot = arguments[5];
  var target = arguments[6];

  Object.keys(grammar).forEach(function (token) {
    if (!grammar[token]) {
      return;
    }

    if (token === target) {
      return;
    }

    var patterns = grammar[token];
    patterns = Array.isArray(patterns) ? patterns : [patterns];

    patterns.forEach(function (pattern) {
      var inside = pattern.inside;
      var lookbehind = !!pattern.lookbehind;
      var greedy = !!pattern.greedy;
      var lookbehindLength = 0;
      var alias = pattern.alias;

      if (greedy && !pattern.pattern.global) {
        // Without the global flag, lastIndex won't work
        var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
        pattern.pattern = RegExp(pattern.pattern.source, flags + 'g');
      }

      pattern = pattern.pattern || pattern;

      // Don’t cache length as it changes during the loop
      for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, i += 1) {
        var str = strarr[i];

        if (strarr.length > text.length) {
          // Something went terribly wrong, ABORT, ABORT!
          return;
        }

        if (str instanceof Token) {
          // eslint-disable-next-line
          continue;
        }

        var delNum = 0;
        var match = void 0;

        if (greedy && i !== strarr.length - 1) {
          pattern.lastIndex = pos;
          match = pattern.exec(text);
          if (!match) {
            break;
          }

          var _from = match.index + (lookbehind ? match[1].length : 0);
          var _to = match.index + match[0].length;
          var k = i;
          var p = pos;

          for (var len = strarr.length; k < len && (p < _to || !strarr[k].type && !strarr[k - 1].greedy); ++k) {
            p += strarr[k].length;
            // Move the index i to the element in strarr that is closest to from
            if (_from >= p) {
              i += 1;
              pos = p;
            }
          }

          // If strarr[i] is a Token, then the match starts inside another Token, which is invalid
          if (strarr[i] instanceof Token) {
            // eslint-disable-next-line
            continue;
          }

          // Number of tokens to delete and replace with the new match
          delNum = k - i;
          str = text.slice(pos, p);
          match.index -= pos;
        } else {
          pattern.lastIndex = 0;

          match = pattern.exec(str);
          delNum = 1;
        }

        if (!match) {
          if (oneshot) {
            break;
          }

          // eslint-disable-next-line
          continue;
        }

        if (lookbehind) {
          lookbehindLength = match[1] ? match[1].length : 0;
        }

        var from = match.index + lookbehindLength;
        match = match[0].slice(lookbehindLength);
        var to = from + match.length;
        var before = str.slice(0, from);
        var after = str.slice(to);

        var _args = [i, delNum];

        if (before) {
          i += 1;
          pos += before.length;
          _args.push(before);
        }

        var wrapped = new Token(token, inside ? tokenize(match, inside) : match, alias, match, greedy);

        _args.push(wrapped);

        if (after) {
          _args.push(after);
        }

        Array.prototype.splice.apply(strarr, _args);

        if (delNum !== 1) matchGrammar(text, strarr, grammar, i, pos, true, token);

        if (oneshot) break;
      }
    });
  });
}

function tokenize(text, grammar) {
  var strarr = [text];

  var rest = grammar.rest;

  if (rest) {
    Object.keys(rest).forEach(function (token) {
      grammar[token] = rest[token];
    });

    delete grammar.rest;
  }

  matchGrammar(text, strarr, grammar, 0, 0, false);

  return strarr;
}

function addHook(name, callback) {
  var allHooks = hooks.all;

  allHooks[name] = allHooks[name] || [];

  allHooks[name].push(callback);
}

function runHook(name, env) {
  var callbacks = hooks.all[name];

  if (!callbacks || !callbacks.length) {
    return;
  }

  callbacks.forEach(function (callback) {
    return callback(env);
  });
}

/***/ })
/******/ ])["default"];
});