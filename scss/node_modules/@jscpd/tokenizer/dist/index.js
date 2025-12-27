"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/tokenize.ts
var _reprism = require('reprism'); var reprism2 = _interopRequireWildcard(_reprism); var reprism = _interopRequireWildcard(_reprism);

// src/formats.ts
var _path = require('path');
var FORMATS = {
  abap: {
    exts: []
  },
  actionscript: {
    exts: ["as"]
  },
  ada: {
    exts: ["ada"]
  },
  apacheconf: {
    exts: []
  },
  apl: {
    exts: ["apl"]
  },
  applescript: {
    exts: []
  },
  arduino: {
    exts: []
  },
  arff: {
    exts: []
  },
  asciidoc: {
    exts: []
  },
  asm6502: {
    exts: []
  },
  aspnet: {
    exts: ["asp", "aspx"]
  },
  autohotkey: {
    exts: []
  },
  autoit: {
    exts: []
  },
  bash: {
    exts: ["sh", "ksh", "bash"]
  },
  basic: {
    exts: ["bas"]
  },
  batch: {
    exts: []
  },
  bison: {
    exts: []
  },
  brainfuck: {
    exts: ["b", "bf"]
  },
  bro: {
    exts: []
  },
  c: {
    exts: ["c", "z80"]
  },
  "c-header": {
    exts: ["h"],
    parent: "c"
  },
  clike: {
    exts: []
  },
  clojure: {
    exts: ["cljs", "clj", "cljc", "cljx", "edn"]
  },
  coffeescript: {
    exts: ["coffee"]
  },
  comments: {
    exts: []
  },
  cpp: {
    exts: ["cpp", "c++", "cc", "cxx"]
  },
  "cpp-header": {
    exts: ["hpp", "h++", "hh", "hxx"],
    parent: "cpp"
  },
  crystal: {
    exts: ["cr"]
  },
  csharp: {
    exts: ["cs"]
  },
  csp: {
    exts: []
  },
  "css-extras": {
    exts: []
  },
  css: {
    exts: ["css", "gss"]
  },
  d: {
    exts: ["d"]
  },
  dart: {
    exts: ["dart"]
  },
  diff: {
    exts: ["diff", "patch"]
  },
  django: {
    exts: []
  },
  docker: {
    exts: []
  },
  eiffel: {
    exts: ["e"]
  },
  elixir: {
    exts: []
  },
  elm: {
    exts: ["elm"]
  },
  erb: {
    exts: []
  },
  erlang: {
    exts: ["erl", "erlang"]
  },
  flow: {
    exts: []
  },
  fortran: {
    exts: ["f", "for", "f77", "f90"]
  },
  fsharp: {
    exts: ["fs"]
  },
  gedcom: {
    exts: []
  },
  gherkin: {
    exts: ["feature"]
  },
  git: {
    exts: []
  },
  glsl: {
    exts: []
  },
  go: {
    exts: ["go"]
  },
  graphql: {
    exts: ["graphql"]
  },
  groovy: {
    exts: ["groovy", "gradle"]
  },
  haml: {
    exts: ["haml"]
  },
  handlebars: {
    exts: ["hb", "hbs", "handlebars"]
  },
  haskell: {
    exts: ["hs", "lhs "]
  },
  haxe: {
    exts: ["hx", "hxml"]
  },
  hpkp: {
    exts: []
  },
  hsts: {
    exts: []
  },
  http: {
    exts: []
  },
  ichigojam: {
    exts: []
  },
  icon: {
    exts: []
  },
  inform7: {
    exts: []
  },
  ini: {
    exts: ["ini"]
  },
  io: {
    exts: []
  },
  j: {
    exts: []
  },
  java: {
    exts: ["java"]
  },
  javascript: {
    exts: ["js", "es", "es6", "mjs", "cjs"]
  },
  jolie: {
    exts: []
  },
  json: {
    exts: ["json", "map", "jsonld"]
  },
  jsx: {
    exts: ["jsx"]
  },
  julia: {
    exts: ["jl"]
  },
  keymap: {
    exts: []
  },
  kotlin: {
    exts: ["kt", "kts"]
  },
  latex: {
    exts: ["tex"]
  },
  less: {
    exts: ["less"]
  },
  liquid: {
    exts: []
  },
  lisp: {
    exts: ["cl", "lisp", "el"]
  },
  livescript: {
    exts: ["ls"]
  },
  lolcode: {
    exts: []
  },
  lua: {
    exts: ["lua"]
  },
  makefile: {
    exts: []
  },
  markdown: {
    exts: ["md", "markdown", "mkd", "txt"]
  },
  markup: {
    exts: ["html", "htm", "xml", "xsl", "xslt", "svg", "vue", "ejs", "jsp"]
  },
  matlab: {
    exts: []
  },
  mel: {
    exts: []
  },
  mizar: {
    exts: []
  },
  monkey: {
    exts: []
  },
  n4js: {
    exts: []
  },
  nasm: {
    exts: []
  },
  nginx: {
    exts: []
  },
  nim: {
    exts: []
  },
  nix: {
    exts: []
  },
  nsis: {
    exts: ["nsh", "nsi"]
  },
  objectivec: {
    exts: ["m", "mm"]
  },
  ocaml: {
    exts: ["ocaml", "ml", "mli", "mll", "mly"]
  },
  opencl: {
    exts: []
  },
  oz: {
    exts: ["oz"]
  },
  parigp: {
    exts: []
  },
  pascal: {
    exts: ["pas", "p"]
  },
  perl: {
    exts: ["pl", "pm"]
  },
  php: {
    exts: ["php", "phtml"]
  },
  plsql: {
    exts: ["plsql"]
  },
  powershell: {
    exts: ["ps1", "psd1", "psm1"]
  },
  processing: {
    exts: []
  },
  prolog: {
    exts: ["pro"]
  },
  properties: {
    exts: ["properties"]
  },
  protobuf: {
    exts: ["proto"]
  },
  pug: {
    exts: ["pug", "jade"]
  },
  puppet: {
    exts: ["pp", "puppet"]
  },
  pure: {
    exts: []
  },
  python: {
    exts: ["py", "pyx", "pxd", "pxi"]
  },
  q: {
    exts: ["q"]
  },
  qore: {
    exts: []
  },
  r: {
    exts: ["r", "R"]
  },
  reason: {
    exts: []
  },
  renpy: {
    exts: []
  },
  rest: {
    exts: []
  },
  rip: {
    exts: []
  },
  roboconf: {
    exts: []
  },
  ruby: {
    exts: ["rb"]
  },
  rust: {
    exts: ["rs"]
  },
  sas: {
    exts: ["sas"]
  },
  sass: {
    exts: ["sass"]
  },
  scala: {
    exts: ["scala"]
  },
  scheme: {
    exts: ["scm", "ss"]
  },
  scss: {
    exts: ["scss"]
  },
  smalltalk: {
    exts: ["st"]
  },
  smarty: {
    exts: ["smarty", "tpl"]
  },
  soy: {
    exts: ["soy"]
  },
  sql: {
    exts: ["sql", "cql"]
  },
  stylus: {
    exts: ["styl", "stylus"]
  },
  swift: {
    exts: ["swift"]
  },
  tap: {
    exts: ["tap"]
  },
  tcl: {
    exts: ["tcl"]
  },
  textile: {
    exts: ["textile"]
  },
  tsx: {
    exts: ["tsx"]
  },
  tt2: {
    exts: ["tt2"]
  },
  twig: {
    exts: ["twig"]
  },
  typescript: {
    exts: ["ts", "mts", "cts"]
  },
  vbnet: {
    exts: ["vb"]
  },
  velocity: {
    exts: ["vtl"]
  },
  verilog: {
    exts: ["v"]
  },
  vhdl: {
    exts: ["vhd", "vhdl"]
  },
  vim: {
    exts: []
  },
  "visual-basic": {
    exts: ["vb"]
  },
  wasm: {
    exts: []
  },
  url: {
    exts: []
  },
  wiki: {
    exts: []
  },
  xeora: {
    exts: []
  },
  xojo: {
    exts: []
  },
  xquery: {
    exts: ["xy", "xquery"]
  },
  yaml: {
    exts: ["yaml", "yml"]
  }
};
function getSupportedFormats() {
  return Object.keys(FORMATS).filter((name) => name !== "important" && name !== "url");
}
function getFormatByFile(path, formatsExts) {
  const ext = _path.extname.call(void 0, path).slice(1);
  if (formatsExts && Object.keys(formatsExts).length) {
    return Object.keys(formatsExts).find((format) => _optionalChain([formatsExts, 'access', _ => _[format], 'optionalAccess', _2 => _2.includes, 'call', _3 => _3(ext)]));
  }
  return Object.keys(FORMATS).find((language) => _optionalChain([FORMATS, 'access', _4 => _4[language], 'optionalAccess', _5 => _5.exts, 'access', _6 => _6.includes, 'call', _7 => _7(ext)]));
}

// src/hash.ts
var _sparkmd5 = require('spark-md5'); var _sparkmd52 = _interopRequireDefault(_sparkmd5);
function hash(value) {
  return _sparkmd52.default.hash(value);
}

// src/token-map.ts
var TOKEN_HASH_LENGTH = 20;
function createTokenHash(token, hashFunction = void 0) {
  return hashFunction ? hashFunction(token.type + token.value).substr(0, TOKEN_HASH_LENGTH) : hash(token.type + token.value).substr(0, TOKEN_HASH_LENGTH);
}
function groupByFormat(tokens) {
  const result = {};
  tokens.forEach((token) => {
    result[token.format] = result[token.format] ? [...result[token.format], token] : [token];
  });
  return result;
}
var TokensMap = (_class = class {
  constructor(id, data, tokens, format, options) {;_class.prototype.__init.call(this);
    this.id = id;
    this.data = data;
    this.tokens = tokens;
    this.format = format;
    this.options = options;
    this.hashMap = this.tokens.map((token) => {
      if (options.ignoreCase) {
        token.value = token.value.toLocaleLowerCase();
      }
      return createTokenHash(token, this.options.hashFunction);
    }).join("");
  }
  __init() {this.position = 0}
  
  getTokensCount() {
    return this.tokens[this.tokens.length - 1].loc.end.position - this.tokens[0].loc.start.position;
  }
  getId() {
    return this.id;
  }
  getLinesCount() {
    return this.tokens[this.tokens.length - 1].loc.end.line - this.tokens[0].loc.start.line;
  }
  getFormat() {
    return this.format;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const hashFunction = this.options.hashFunction ? this.options.hashFunction : hash;
    const mapFrame = hashFunction(
      this.hashMap.substring(
        this.position * TOKEN_HASH_LENGTH,
        this.position * TOKEN_HASH_LENGTH + this.options.minTokens * TOKEN_HASH_LENGTH
      )
    ).substring(0, TOKEN_HASH_LENGTH);
    if (this.position < this.tokens.length - this.options.minTokens) {
      this.position++;
      return {
        done: false,
        value: {
          id: mapFrame,
          sourceId: this.getId(),
          start: this.tokens[this.position - 1],
          end: this.tokens[this.position + this.options.minTokens - 1]
        }
      };
    } else {
      return {
        done: true,
        value: false
      };
    }
  }
}, _class);
function generateMapsForFormats(id, data, tokens, options) {
  return Object.values(groupByFormat(tokens)).map((formatTokens) => new TokensMap(id, data, formatTokens, formatTokens[0].format, options));
}
function createTokensMaps(id, data, tokens, options) {
  return generateMapsForFormats(id, data, tokens, options);
}

// src/grammar-loader.ts

var _abap = require('reprism/languages/abap'); var abap = _interopRequireWildcard(_abap);
var _actionscript = require('reprism/languages/actionscript'); var actionscript = _interopRequireWildcard(_actionscript);
var _ada = require('reprism/languages/ada'); var ada = _interopRequireWildcard(_ada);
var _apacheconf = require('reprism/languages/apacheconf'); var apacheconf = _interopRequireWildcard(_apacheconf);
var _apl = require('reprism/languages/apl'); var apl = _interopRequireWildcard(_apl);
var _applescript = require('reprism/languages/applescript'); var applescript = _interopRequireWildcard(_applescript);
var _arff = require('reprism/languages/arff'); var arff = _interopRequireWildcard(_arff);
var _asciidoc = require('reprism/languages/asciidoc'); var asciidoc = _interopRequireWildcard(_asciidoc);
var _asm6502 = require('reprism/languages/asm6502'); var asm6502 = _interopRequireWildcard(_asm6502);
var _aspnet = require('reprism/languages/aspnet'); var aspnet = _interopRequireWildcard(_aspnet);
var _autohotkey = require('reprism/languages/autohotkey'); var autohotkey = _interopRequireWildcard(_autohotkey);
var _autoit = require('reprism/languages/autoit'); var autoit = _interopRequireWildcard(_autoit);
var _bash = require('reprism/languages/bash'); var bash = _interopRequireWildcard(_bash);
var _basic = require('reprism/languages/basic'); var basic = _interopRequireWildcard(_basic);
var _batch = require('reprism/languages/batch'); var batch = _interopRequireWildcard(_batch);
var _brainfuck = require('reprism/languages/brainfuck'); var brainfuck = _interopRequireWildcard(_brainfuck);
var _bro = require('reprism/languages/bro'); var bro = _interopRequireWildcard(_bro);
var _c = require('reprism/languages/c'); var c = _interopRequireWildcard(_c);
var _clike = require('reprism/languages/clike'); var clike = _interopRequireWildcard(_clike);
var _clojure = require('reprism/languages/clojure'); var clojure = _interopRequireWildcard(_clojure);
var _coffeescript = require('reprism/languages/coffeescript'); var coffeescript = _interopRequireWildcard(_coffeescript);
var _cpp = require('reprism/languages/cpp'); var cpp = _interopRequireWildcard(_cpp);
var _csharp = require('reprism/languages/csharp'); var csharp = _interopRequireWildcard(_csharp);
var _csp = require('reprism/languages/csp'); var csp = _interopRequireWildcard(_csp);
var _cssextras = require('reprism/languages/css-extras'); var cssExtras = _interopRequireWildcard(_cssextras);
var _css = require('reprism/languages/css'); var css = _interopRequireWildcard(_css);
var _d = require('reprism/languages/d'); var d = _interopRequireWildcard(_d);
var _dart = require('reprism/languages/dart'); var dart = _interopRequireWildcard(_dart);
var _diff = require('reprism/languages/diff'); var diff = _interopRequireWildcard(_diff);
var _django = require('reprism/languages/django'); var django = _interopRequireWildcard(_django);
var _docker = require('reprism/languages/docker'); var docker = _interopRequireWildcard(_docker);
var _eiffel = require('reprism/languages/eiffel'); var eiffel = _interopRequireWildcard(_eiffel);
var _elixir = require('reprism/languages/elixir'); var elixir = _interopRequireWildcard(_elixir);
var _erlang = require('reprism/languages/erlang'); var erlang = _interopRequireWildcard(_erlang);
var _flow = require('reprism/languages/flow'); var flow = _interopRequireWildcard(_flow);
var _fortran = require('reprism/languages/fortran'); var fortran = _interopRequireWildcard(_fortran);
var _fsharp = require('reprism/languages/fsharp'); var fsharp = _interopRequireWildcard(_fsharp);
var _gedcom = require('reprism/languages/gedcom'); var gedcom = _interopRequireWildcard(_gedcom);
var _gherkin = require('reprism/languages/gherkin'); var gherkin = _interopRequireWildcard(_gherkin);
var _git = require('reprism/languages/git'); var git = _interopRequireWildcard(_git);
var _glsl = require('reprism/languages/glsl'); var glsl = _interopRequireWildcard(_glsl);
var _go = require('reprism/languages/go'); var go = _interopRequireWildcard(_go);
var _graphql = require('reprism/languages/graphql'); var graphql = _interopRequireWildcard(_graphql);
var _groovy = require('reprism/languages/groovy'); var groovy = _interopRequireWildcard(_groovy);
var _haml = require('reprism/languages/haml'); var haml = _interopRequireWildcard(_haml);
var _handlebars = require('reprism/languages/handlebars'); var handlebars = _interopRequireWildcard(_handlebars);
var _haskell = require('reprism/languages/haskell'); var haskell = _interopRequireWildcard(_haskell);
var _haxe = require('reprism/languages/haxe'); var haxe = _interopRequireWildcard(_haxe);
var _hpkp = require('reprism/languages/hpkp'); var hpkp = _interopRequireWildcard(_hpkp);
var _hsts = require('reprism/languages/hsts'); var hsts = _interopRequireWildcard(_hsts);
var _http = require('reprism/languages/http'); var http = _interopRequireWildcard(_http);
var _ichigojam = require('reprism/languages/ichigojam'); var ichigojam = _interopRequireWildcard(_ichigojam);
var _icon = require('reprism/languages/icon'); var icon = _interopRequireWildcard(_icon);
var _inform7 = require('reprism/languages/inform7'); var inform7 = _interopRequireWildcard(_inform7);
var _ini = require('reprism/languages/ini'); var ini = _interopRequireWildcard(_ini);
var _io = require('reprism/languages/io'); var io = _interopRequireWildcard(_io);
var _j = require('reprism/languages/j'); var j = _interopRequireWildcard(_j);
var _java = require('reprism/languages/java'); var java = _interopRequireWildcard(_java);
var _javascript = require('reprism/languages/javascript'); var javascript = _interopRequireWildcard(_javascript);
var _jolie = require('reprism/languages/jolie'); var jolie = _interopRequireWildcard(_jolie);
var _json = require('reprism/languages/json'); var json = _interopRequireWildcard(_json);
var _jsx = require('reprism/languages/jsx'); var jsx = _interopRequireWildcard(_jsx);
var _julia = require('reprism/languages/julia'); var julia = _interopRequireWildcard(_julia);
var _keyman = require('reprism/languages/keyman'); var keyman = _interopRequireWildcard(_keyman);
var _kotlin = require('reprism/languages/kotlin'); var kotlin = _interopRequireWildcard(_kotlin);
var _latex = require('reprism/languages/latex'); var latex = _interopRequireWildcard(_latex);
var _less = require('reprism/languages/less'); var less = _interopRequireWildcard(_less);
var _liquid = require('reprism/languages/liquid'); var liquid = _interopRequireWildcard(_liquid);
var _lisp = require('reprism/languages/lisp'); var lisp = _interopRequireWildcard(_lisp);
var _livescript = require('reprism/languages/livescript'); var livescript = _interopRequireWildcard(_livescript);
var _lolcode = require('reprism/languages/lolcode'); var lolcode = _interopRequireWildcard(_lolcode);
var _lua = require('reprism/languages/lua'); var lua = _interopRequireWildcard(_lua);
var _makefile = require('reprism/languages/makefile'); var makefile = _interopRequireWildcard(_makefile);
var _markdown = require('reprism/languages/markdown'); var markdown = _interopRequireWildcard(_markdown);
var _markuptemplating = require('reprism/languages/markup-templating'); var markupTemplating = _interopRequireWildcard(_markuptemplating);
var _markup = require('reprism/languages/markup'); var markup = _interopRequireWildcard(_markup);
var _matlab = require('reprism/languages/matlab'); var matlab = _interopRequireWildcard(_matlab);
var _mel = require('reprism/languages/mel'); var mel = _interopRequireWildcard(_mel);
var _mizar = require('reprism/languages/mizar'); var mizar = _interopRequireWildcard(_mizar);
var _monkey = require('reprism/languages/monkey'); var monkey = _interopRequireWildcard(_monkey);
var _n4js = require('reprism/languages/n4js'); var n4js = _interopRequireWildcard(_n4js);
var _nasm = require('reprism/languages/nasm'); var nasm = _interopRequireWildcard(_nasm);
var _nginx = require('reprism/languages/nginx'); var nginx = _interopRequireWildcard(_nginx);
var _nim = require('reprism/languages/nim'); var nim = _interopRequireWildcard(_nim);
var _nix = require('reprism/languages/nix'); var nix = _interopRequireWildcard(_nix);
var _nsis = require('reprism/languages/nsis'); var nsis = _interopRequireWildcard(_nsis);
var _objectivec = require('reprism/languages/objectivec'); var objectivec = _interopRequireWildcard(_objectivec);
var _ocaml = require('reprism/languages/ocaml'); var ocaml = _interopRequireWildcard(_ocaml);
var _opencl = require('reprism/languages/opencl'); var opencl = _interopRequireWildcard(_opencl);
var _oz = require('reprism/languages/oz'); var oz = _interopRequireWildcard(_oz);
var _parigp = require('reprism/languages/parigp'); var parigp = _interopRequireWildcard(_parigp);
var _parser = require('reprism/languages/parser'); var parser = _interopRequireWildcard(_parser);
var _pascal = require('reprism/languages/pascal'); var pascal = _interopRequireWildcard(_pascal);
var _perl = require('reprism/languages/perl'); var perl = _interopRequireWildcard(_perl);
var _phpextras = require('reprism/languages/php-extras'); var phpExtras = _interopRequireWildcard(_phpextras);
var _php = require('reprism/languages/php'); var php = _interopRequireWildcard(_php);
var _powershell = require('reprism/languages/powershell'); var powershell = _interopRequireWildcard(_powershell);
var _processing = require('reprism/languages/processing'); var processing = _interopRequireWildcard(_processing);
var _prolog = require('reprism/languages/prolog'); var prolog = _interopRequireWildcard(_prolog);
var _properties = require('reprism/languages/properties'); var properties = _interopRequireWildcard(_properties);
var _protobuf = require('reprism/languages/protobuf'); var protobuf = _interopRequireWildcard(_protobuf);
var _pug = require('reprism/languages/pug'); var pug = _interopRequireWildcard(_pug);
var _puppet = require('reprism/languages/puppet'); var puppet = _interopRequireWildcard(_puppet);
var _pure = require('reprism/languages/pure'); var pure = _interopRequireWildcard(_pure);
var _python = require('reprism/languages/python'); var python = _interopRequireWildcard(_python);
var _q = require('reprism/languages/q'); var q = _interopRequireWildcard(_q);
var _qore = require('reprism/languages/qore'); var qore = _interopRequireWildcard(_qore);
var _r = require('reprism/languages/r'); var r = _interopRequireWildcard(_r);
var _reason = require('reprism/languages/reason'); var reason = _interopRequireWildcard(_reason);
var _renpy = require('reprism/languages/renpy'); var renpy = _interopRequireWildcard(_renpy);
var _rest = require('reprism/languages/rest'); var rest = _interopRequireWildcard(_rest);
var _rip = require('reprism/languages/rip'); var rip = _interopRequireWildcard(_rip);
var _roboconf = require('reprism/languages/roboconf'); var roboconf = _interopRequireWildcard(_roboconf);
var _ruby = require('reprism/languages/ruby'); var ruby = _interopRequireWildcard(_ruby);
var _rust = require('reprism/languages/rust'); var rust = _interopRequireWildcard(_rust);
var _sas = require('reprism/languages/sas'); var sas = _interopRequireWildcard(_sas);
var _sass = require('reprism/languages/sass'); var sass = _interopRequireWildcard(_sass);
var _scala = require('reprism/languages/scala'); var scala = _interopRequireWildcard(_scala);
var _scheme = require('reprism/languages/scheme'); var scheme = _interopRequireWildcard(_scheme);
var _scss = require('reprism/languages/scss'); var scss = _interopRequireWildcard(_scss);
var _smalltalk = require('reprism/languages/smalltalk'); var smalltalk = _interopRequireWildcard(_smalltalk);
var _smarty = require('reprism/languages/smarty'); var smarty = _interopRequireWildcard(_smarty);
var _soy = require('reprism/languages/soy'); var soy = _interopRequireWildcard(_soy);
var _stylus = require('reprism/languages/stylus'); var stylus = _interopRequireWildcard(_stylus);
var _swift = require('reprism/languages/swift'); var swift = _interopRequireWildcard(_swift);
var _tcl = require('reprism/languages/tcl'); var tcl = _interopRequireWildcard(_tcl);
var _textile = require('reprism/languages/textile'); var textile = _interopRequireWildcard(_textile);
var _tsx = require('reprism/languages/tsx'); var tsx = _interopRequireWildcard(_tsx);
var _twig = require('reprism/languages/twig'); var twig = _interopRequireWildcard(_twig);
var _typescript = require('reprism/languages/typescript'); var typescript = _interopRequireWildcard(_typescript);
var _vbnet = require('reprism/languages/vbnet'); var vbnet = _interopRequireWildcard(_vbnet);
var _velocity = require('reprism/languages/velocity'); var velocity = _interopRequireWildcard(_velocity);
var _verilog = require('reprism/languages/verilog'); var verilog = _interopRequireWildcard(_verilog);
var _vhdl = require('reprism/languages/vhdl'); var vhdl = _interopRequireWildcard(_vhdl);
var _vim = require('reprism/languages/vim'); var vim = _interopRequireWildcard(_vim);
var _visualbasic = require('reprism/languages/visual-basic'); var visualBasic = _interopRequireWildcard(_visualbasic);
var _wasm = require('reprism/languages/wasm'); var wasm = _interopRequireWildcard(_wasm);
var _wiki = require('reprism/languages/wiki'); var wiki = _interopRequireWildcard(_wiki);
var _xeora = require('reprism/languages/xeora'); var xeora = _interopRequireWildcard(_xeora);
var _xojo = require('reprism/languages/xojo'); var xojo = _interopRequireWildcard(_xojo);
var _yaml = require('reprism/languages/yaml'); var yaml = _interopRequireWildcard(_yaml);

// src/languages/tap.ts
var tap_exports = {};
__export(tap_exports, {
  default: () => tap_default
});
var grammar = {
  language: "tap",
  init(Prism) {
    Prism.languages.tap = {
      fail: /not ok[^#{\n\r]*/,
      pass: /ok[^#{\n\r]*/,
      pragma: /pragma [+-][a-z]+/,
      bailout: /bail out!.*/i,
      version: /TAP version \d+/i,
      plan: /\d+\.\.\d+(?: +#.*)?/,
      subtest: {
        pattern: /# Subtest(?:: .*)?/,
        greedy: true
      },
      punctuation: /[{}]/,
      directive: /#.*/,
      yamlish: {
        pattern: /(^[ \t]*)---[\s\S]*?[\r\n][ \t]*\.\.\.$/m,
        lookbehind: true,
        inside: Prism.languages.yaml,
        alias: "language-yaml"
      }
    };
  }
};
var tap_default = grammar;

// src/languages/sql.ts
var sql_exports = {};
__export(sql_exports, {
  default: () => sql_default
});
var grammar2 = {
  language: "sql",
  init(Prism) {
    Prism.languages.sql = {
      "comment": {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: true
      },
      "variable": [
        {
          pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
          greedy: true
        },
        /@[\w.$]+/
      ],
      "string": {
        pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
        greedy: true,
        lookbehind: true
      },
      "function": /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
      // Should we highlight user defined functions too?
      "keyword": /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
      "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
      "number": /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
      "operator": /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
      "punctuation": /[;[\]()`,.]/
    };
  }
};
var sql_default = grammar2;

// src/languages/plsql.ts
var plsql_exports = {};
__export(plsql_exports, {
  default: () => plsql_default
});
var grammar3 = {
  language: "plsql",
  init(Prism) {
    Prism.languages.plsql = Prism.languages.extend("sql", {
      comment: [/\/\*[\s\S]*?\*\//, /--.*/]
    });
    if (Prism.util.type(Prism.languages.plsql.keyword) !== "Array") {
      Prism.languages.plsql.keyword = [Prism.languages.plsql.keyword];
    }
    Prism.languages.plsql.keyword.unshift(/\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i);
    if (Prism.util.type(Prism.languages.plsql.operator) !== "Array") {
      Prism.languages.plsql.operator = [Prism.languages.plsql.operator];
    }
    Prism.languages.plsql.operator.unshift(/:=/);
  }
};
var plsql_default = grammar3;

// src/grammar-loader.ts
var languages = {
  abap,
  actionscript,
  ada,
  apacheconf,
  apl,
  applescript,
  arff,
  asciidoc,
  asm6502,
  aspnet,
  autohotkey,
  autoit,
  bash,
  basic,
  batch,
  brainfuck,
  bro,
  c,
  clike,
  clojure,
  coffeescript,
  cpp,
  csharp,
  csp,
  cssExtras,
  css,
  d,
  dart,
  diff,
  django,
  docker,
  eiffel,
  elixir,
  erlang,
  flow,
  fortran,
  fsharp,
  gedcom,
  gherkin,
  git,
  glsl,
  go,
  graphql,
  groovy,
  haml,
  handlebars,
  haskell,
  haxe,
  hpkp,
  hsts,
  http,
  ichigojam,
  icon,
  inform7,
  ini,
  io,
  j,
  java,
  javascript,
  jolie,
  json,
  jsx,
  julia,
  keyman,
  kotlin,
  latex,
  less,
  liquid,
  lisp,
  livescript,
  lolcode,
  lua,
  makefile,
  markdown,
  markupTemplating,
  markup,
  matlab,
  mel,
  mizar,
  monkey,
  n4js,
  nasm,
  nginx,
  nim,
  nix,
  nsis,
  objectivec,
  ocaml,
  opencl,
  oz,
  parigp,
  parser,
  pascal,
  perl,
  php,
  phpExtras,
  powershell,
  processing,
  prolog,
  properties,
  protobuf,
  pug,
  puppet,
  pure,
  python,
  q,
  qore,
  r,
  reason,
  renpy,
  rest,
  rip,
  roboconf,
  ruby,
  rust,
  sas,
  sass,
  scala,
  scheme,
  scss,
  smalltalk,
  smarty,
  soy,
  stylus,
  swift,
  tcl,
  textile,
  twig,
  typescript,
  vbnet,
  velocity,
  verilog,
  vhdl,
  vim,
  visualBasic,
  wasm,
  wiki,
  xeora,
  xojo,
  yaml,
  tsx,
  sql: sql_exports,
  plsql: plsql_exports,
  tap: tap_exports
};
var loadLanguages2 = () => {
  reprism.loadLanguages(Object.values(languages).map((v) => v.default));
};

// src/tokenize.ts
var ignore = {
  ignore: [
    {
      pattern: /(jscpd:ignore-start)[\s\S]*?(?=jscpd:ignore-end)/,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /jscpd:ignore-start/,
      greedy: false
    },
    {
      pattern: /jscpd:ignore-end/,
      greedy: false
    }
  ]
};
var punctuation = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  new_line: /\n/,
  empty: /\s+/
};
var initializeFormats = () => {
  loadLanguages2();
  Object.keys(reprism2.default.languages).forEach((lang) => {
    if (lang !== "extend" && lang !== "insertBefore" && lang !== "DFS") {
      reprism2.default.languages[lang] = {
        ...ignore,
        ...reprism2.default.languages[lang],
        ...punctuation
      };
    }
  });
};
initializeFormats();
function getLanguagePrismName(lang) {
  if (lang in FORMATS && _optionalChain([FORMATS, 'access', _8 => _8[lang], 'optionalAccess', _9 => _9.parent])) {
    return _optionalChain([FORMATS, 'access', _10 => _10[lang], 'optionalAccess', _11 => _11.parent]);
  }
  return lang;
}
function tokenize(code, language) {
  let length = 0;
  let line = 1;
  let column = 1;
  function sanitizeLangName(name) {
    return name && name.replace ? name.replace("language-", "") : "unknown";
  }
  function createTokenFromString(token, lang) {
    return [
      {
        format: lang,
        type: "default",
        value: token,
        length: token.length
      }
    ];
  }
  function calculateLocation(token, position) {
    const result = token;
    const lines = typeof result.value === "string" && result.value.split ? result.value.split("\n") : [];
    const newLines = lines.length - 1;
    const start = {
      line,
      column,
      position
    };
    column = newLines >= 0 ? Number(_optionalChain([lines, 'access', _12 => _12[lines.length - 1], 'optionalAccess', _13 => _13.length])) + 1 : column;
    const end = {
      line: line + newLines,
      column,
      position
    };
    result.loc = { start, end };
    result.range = [length, length + result.length];
    length += result.length;
    line += newLines;
    return result;
  }
  function createTokenFromFlatToken(token, lang) {
    return [
      {
        format: lang,
        type: token.type,
        value: token.content,
        length: token.length
      }
    ];
  }
  function createTokens(token, lang) {
    if (token.content && typeof token.content === "string") {
      return createTokenFromFlatToken(token, lang);
    }
    if (token.content && Array.isArray(token.content)) {
      let res = [];
      token.content.forEach(
        (t) => res = res.concat(createTokens(t, token.alias ? sanitizeLangName(token.alias) : lang))
      );
      return res;
    }
    return createTokenFromString(token, lang);
  }
  let tokens = [];
  const grammar4 = reprism2.default.languages[getLanguagePrismName(language)];
  if (!reprism2.default.languages[getLanguagePrismName(language)]) {
    console.warn('Warn: jscpd has issue with support of "' + getLanguagePrismName(language) + '"');
    return [];
  }
  reprism2.default.tokenize(code, grammar4).forEach(
    (t) => tokens = tokens.concat(createTokens(t, language))
  );
  return tokens.filter((t) => t.format in FORMATS).map(
    (token, index) => calculateLocation(token, index)
  );
}
function setupIgnorePatterns(format, ignorePattern) {
  const language = getLanguagePrismName(format);
  const ignorePatterns = ignorePattern.map((pattern) => ({
    pattern: new RegExp(pattern),
    greedy: false
  }));
  reprism2.default.languages[language] = {
    ...ignorePatterns,
    ...reprism2.default.languages[language]
  };
}
function createTokenMapBasedOnCode(id, data, format, options = {}) {
  const { mode, ignoreCase, ignorePattern } = options;
  const tokens = tokenize(data, format).filter((token) => mode(token, options));
  if (ignorePattern)
    setupIgnorePatterns(format, options.ignorePattern || []);
  if (ignoreCase) {
    return createTokensMaps(id, data, tokens.map(
      (token) => {
        token.value = token.value.toLocaleLowerCase();
        return token;
      }
    ), options);
  }
  return createTokensMaps(id, data, tokens, options);
}

// src/index.ts
var Tokenizer = class {
  generateMaps(id, data, format, options) {
    return createTokenMapBasedOnCode(id, data, format, options);
  }
};










exports.FORMATS = FORMATS; exports.Tokenizer = Tokenizer; exports.TokensMap = TokensMap; exports.createTokenMapBasedOnCode = createTokenMapBasedOnCode; exports.createTokensMaps = createTokensMaps; exports.generateMapsForFormats = generateMapsForFormats; exports.getFormatByFile = getFormatByFile; exports.getSupportedFormats = getSupportedFormats; exports.tokenize = tokenize;
//# sourceMappingURL=index.js.map