'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highlight = highlight;
exports.encode = encode;
exports.getType = getType;
exports.objId = objId;
exports.loadLanguages = loadLanguages;
exports.clone = clone;
exports.extend = extend;
exports.insertBefore = insertBefore;
exports.DFS = DFS;
exports.matchGrammar = matchGrammar;
exports.tokenize = tokenize;
exports.addHook = addHook;
exports.runHook = runHook;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uniqueID = 0;

var languages = exports.languages = {
  extend: extend,
  insertBefore: insertBefore,
  DFS: DFS
};
var plugins = exports.plugins = {};
var hooks = exports.hooks = {
  all: {},
  add: addHook,
  run: runHook
};

var Token = function Token(type, content, alias, matchedStr, greedy) {
  _classCallCheck(this, Token);

  this.type = type;
  this.content = content;
  this.alias = alias;
  // Copy of the full string this token was created from
  this.length = (matchedStr || '').length | 0;
  this.greedy = !!greedy;
};

Token.stringify = function (o, language, parent) {
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
};

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

exports.default = Prism;
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