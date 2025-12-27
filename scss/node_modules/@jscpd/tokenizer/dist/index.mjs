var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/tokenize.ts
import * as reprism2 from "reprism";

// src/formats.ts
import { extname } from "path";
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
  const ext = extname(path).slice(1);
  if (formatsExts && Object.keys(formatsExts).length) {
    return Object.keys(formatsExts).find((format) => formatsExts[format]?.includes(ext));
  }
  return Object.keys(FORMATS).find((language) => FORMATS[language]?.exts.includes(ext));
}

// src/hash.ts
import SparkMD5 from "spark-md5";
function hash(value) {
  return SparkMD5.hash(value);
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
var TokensMap = class {
  constructor(id, data, tokens, format, options) {
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
  position = 0;
  hashMap;
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
};
function generateMapsForFormats(id, data, tokens, options) {
  return Object.values(groupByFormat(tokens)).map((formatTokens) => new TokensMap(id, data, formatTokens, formatTokens[0].format, options));
}
function createTokensMaps(id, data, tokens, options) {
  return generateMapsForFormats(id, data, tokens, options);
}

// src/grammar-loader.ts
import * as reprism from "reprism";
import * as abap from "reprism/languages/abap";
import * as actionscript from "reprism/languages/actionscript";
import * as ada from "reprism/languages/ada";
import * as apacheconf from "reprism/languages/apacheconf";
import * as apl from "reprism/languages/apl";
import * as applescript from "reprism/languages/applescript";
import * as arff from "reprism/languages/arff";
import * as asciidoc from "reprism/languages/asciidoc";
import * as asm6502 from "reprism/languages/asm6502";
import * as aspnet from "reprism/languages/aspnet";
import * as autohotkey from "reprism/languages/autohotkey";
import * as autoit from "reprism/languages/autoit";
import * as bash from "reprism/languages/bash";
import * as basic from "reprism/languages/basic";
import * as batch from "reprism/languages/batch";
import * as brainfuck from "reprism/languages/brainfuck";
import * as bro from "reprism/languages/bro";
import * as c from "reprism/languages/c";
import * as clike from "reprism/languages/clike";
import * as clojure from "reprism/languages/clojure";
import * as coffeescript from "reprism/languages/coffeescript";
import * as cpp from "reprism/languages/cpp";
import * as csharp from "reprism/languages/csharp";
import * as csp from "reprism/languages/csp";
import * as cssExtras from "reprism/languages/css-extras";
import * as css from "reprism/languages/css";
import * as d from "reprism/languages/d";
import * as dart from "reprism/languages/dart";
import * as diff from "reprism/languages/diff";
import * as django from "reprism/languages/django";
import * as docker from "reprism/languages/docker";
import * as eiffel from "reprism/languages/eiffel";
import * as elixir from "reprism/languages/elixir";
import * as erlang from "reprism/languages/erlang";
import * as flow from "reprism/languages/flow";
import * as fortran from "reprism/languages/fortran";
import * as fsharp from "reprism/languages/fsharp";
import * as gedcom from "reprism/languages/gedcom";
import * as gherkin from "reprism/languages/gherkin";
import * as git from "reprism/languages/git";
import * as glsl from "reprism/languages/glsl";
import * as go from "reprism/languages/go";
import * as graphql from "reprism/languages/graphql";
import * as groovy from "reprism/languages/groovy";
import * as haml from "reprism/languages/haml";
import * as handlebars from "reprism/languages/handlebars";
import * as haskell from "reprism/languages/haskell";
import * as haxe from "reprism/languages/haxe";
import * as hpkp from "reprism/languages/hpkp";
import * as hsts from "reprism/languages/hsts";
import * as http from "reprism/languages/http";
import * as ichigojam from "reprism/languages/ichigojam";
import * as icon from "reprism/languages/icon";
import * as inform7 from "reprism/languages/inform7";
import * as ini from "reprism/languages/ini";
import * as io from "reprism/languages/io";
import * as j from "reprism/languages/j";
import * as java from "reprism/languages/java";
import * as javascript from "reprism/languages/javascript";
import * as jolie from "reprism/languages/jolie";
import * as json from "reprism/languages/json";
import * as jsx from "reprism/languages/jsx";
import * as julia from "reprism/languages/julia";
import * as keyman from "reprism/languages/keyman";
import * as kotlin from "reprism/languages/kotlin";
import * as latex from "reprism/languages/latex";
import * as less from "reprism/languages/less";
import * as liquid from "reprism/languages/liquid";
import * as lisp from "reprism/languages/lisp";
import * as livescript from "reprism/languages/livescript";
import * as lolcode from "reprism/languages/lolcode";
import * as lua from "reprism/languages/lua";
import * as makefile from "reprism/languages/makefile";
import * as markdown from "reprism/languages/markdown";
import * as markupTemplating from "reprism/languages/markup-templating";
import * as markup from "reprism/languages/markup";
import * as matlab from "reprism/languages/matlab";
import * as mel from "reprism/languages/mel";
import * as mizar from "reprism/languages/mizar";
import * as monkey from "reprism/languages/monkey";
import * as n4js from "reprism/languages/n4js";
import * as nasm from "reprism/languages/nasm";
import * as nginx from "reprism/languages/nginx";
import * as nim from "reprism/languages/nim";
import * as nix from "reprism/languages/nix";
import * as nsis from "reprism/languages/nsis";
import * as objectivec from "reprism/languages/objectivec";
import * as ocaml from "reprism/languages/ocaml";
import * as opencl from "reprism/languages/opencl";
import * as oz from "reprism/languages/oz";
import * as parigp from "reprism/languages/parigp";
import * as parser from "reprism/languages/parser";
import * as pascal from "reprism/languages/pascal";
import * as perl from "reprism/languages/perl";
import * as phpExtras from "reprism/languages/php-extras";
import * as php from "reprism/languages/php";
import * as powershell from "reprism/languages/powershell";
import * as processing from "reprism/languages/processing";
import * as prolog from "reprism/languages/prolog";
import * as properties from "reprism/languages/properties";
import * as protobuf from "reprism/languages/protobuf";
import * as pug from "reprism/languages/pug";
import * as puppet from "reprism/languages/puppet";
import * as pure from "reprism/languages/pure";
import * as python from "reprism/languages/python";
import * as q from "reprism/languages/q";
import * as qore from "reprism/languages/qore";
import * as r from "reprism/languages/r";
import * as reason from "reprism/languages/reason";
import * as renpy from "reprism/languages/renpy";
import * as rest from "reprism/languages/rest";
import * as rip from "reprism/languages/rip";
import * as roboconf from "reprism/languages/roboconf";
import * as ruby from "reprism/languages/ruby";
import * as rust from "reprism/languages/rust";
import * as sas from "reprism/languages/sas";
import * as sass from "reprism/languages/sass";
import * as scala from "reprism/languages/scala";
import * as scheme from "reprism/languages/scheme";
import * as scss from "reprism/languages/scss";
import * as smalltalk from "reprism/languages/smalltalk";
import * as smarty from "reprism/languages/smarty";
import * as soy from "reprism/languages/soy";
import * as stylus from "reprism/languages/stylus";
import * as swift from "reprism/languages/swift";
import * as tcl from "reprism/languages/tcl";
import * as textile from "reprism/languages/textile";
import * as tsx from "reprism/languages/tsx";
import * as twig from "reprism/languages/twig";
import * as typescript from "reprism/languages/typescript";
import * as vbnet from "reprism/languages/vbnet";
import * as velocity from "reprism/languages/velocity";
import * as verilog from "reprism/languages/verilog";
import * as vhdl from "reprism/languages/vhdl";
import * as vim from "reprism/languages/vim";
import * as visualBasic from "reprism/languages/visual-basic";
import * as wasm from "reprism/languages/wasm";
import * as wiki from "reprism/languages/wiki";
import * as xeora from "reprism/languages/xeora";
import * as xojo from "reprism/languages/xojo";
import * as yaml from "reprism/languages/yaml";

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
  if (lang in FORMATS && FORMATS[lang]?.parent) {
    return FORMATS[lang]?.parent;
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
    column = newLines >= 0 ? Number(lines[lines.length - 1]?.length) + 1 : column;
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
export {
  FORMATS,
  Tokenizer,
  TokensMap,
  createTokenMapBasedOnCode,
  createTokensMaps,
  generateMapsForFormats,
  getFormatByFile,
  getSupportedFormats,
  tokenize
};
//# sourceMappingURL=index.mjs.map