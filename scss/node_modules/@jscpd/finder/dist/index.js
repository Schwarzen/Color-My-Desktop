"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/in-files-detector.ts


var _core = require('@jscpd/core');
var _tokenizer = require('@jscpd/tokenizer');

// src/validators/skip-local.validator.ts

var _path = require('path');
var SkipLocalValidator = class _SkipLocalValidator {
  validate(clone, options) {
    const status = !this.shouldSkipClone(clone, options);
    return {
      status,
      clone,
      message: [
        `Sources of duplication located in same local folder (${clone.duplicationA.sourceId}, ${clone.duplicationB.sourceId})`
      ]
    };
  }
  shouldSkipClone(clone, options) {
    const path = _core.getOption.call(void 0, "path", options);
    return path.some(
      (dir) => _SkipLocalValidator.isRelative(clone.duplicationA.sourceId, dir) && _SkipLocalValidator.isRelative(clone.duplicationB.sourceId, dir)
    );
  }
  static isRelative(file, path) {
    const rel = _path.relative.call(void 0, path, file);
    return rel !== "" && !rel.startsWith("..") && !_path.isAbsolute.call(void 0, rel);
  }
};

// src/in-files-detector.ts
var InFilesDetector = (_class = class {
  constructor(tokenizer, store, statistic, options) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
    this.tokenizer = tokenizer;
    this.store = store;
    this.statistic = statistic;
    this.options = options;
    this.registerSubscriber(this.statistic);
  }
  __init() {this.reporters = []}
  __init2() {this.subscribes = []}
  __init3() {this.postHooks = []}
  registerReporter(reporter) {
    this.reporters.push(reporter);
  }
  registerSubscriber(subscriber) {
    this.subscribes.push(subscriber);
  }
  registerHook(hook) {
    this.postHooks.push(hook);
  }
  detect(fls) {
    const files = fls.filter((f) => !!f);
    if (files.length === 0) {
      return Promise.resolve([]);
    }
    const options = this.options;
    const hooks = [...this.postHooks];
    const store = this.store;
    const validators = [];
    if (options.skipLocal) {
      validators.push(new SkipLocalValidator());
    }
    const detector = new (0, _core.Detector)(this.tokenizer, store, validators, options);
    this.subscribes.forEach((listener) => {
      Object.entries(listener.subscribe()).map(([event, handler]) => detector.on(event, handler));
    });
    const detect = (entry, clones = []) => {
      const { path, content } = entry;
      const format = _tokenizer.getFormatByFile.call(void 0, path, options.formatsExts);
      return format !== void 0 ? detector.detect(path, content, format).then((clns) => {
        if (clns) {
          clones.push(...clns);
        }
        const file = files.pop();
        if (file) {
          return detect(file, clones);
        }
        return clones;
      }) : Promise.resolve([]);
    };
    const processHooks = (hook, detectedClones) => {
      return hook.process(detectedClones).then((clones) => {
        const nextHook = hooks.pop();
        if (nextHook) {
          return processHooks(nextHook, clones);
        }
        return clones;
      });
    };
    return detect(files.pop()).then((clones) => {
      const hook = hooks.pop();
      if (hook) {
        return processHooks(hook, clones);
      }
      return clones;
    }).then((clones) => {
      const statistic = this.statistic.getStatistic();
      this.reporters.forEach((reporter) => {
        reporter.report(clones, statistic);
      });
      return clones;
    });
  }
}, _class);

// src/files.ts

var _fastglob = require('fast-glob');

var _fsextra = require('fs-extra');
var _safe = require('colors/safe');
var _fs = require('fs');
var _bytes = require('bytes'); var _bytes2 = _interopRequireDefault(_bytes);
function isFile(path) {
  try {
    const stat = _fs.lstatSync.call(void 0, path);
    return stat.isFile();
  } catch (e) {
    return false;
  }
}
function isSymlink(path) {
  try {
    const stat = _fs.lstatSync.call(void 0, path);
    return stat.isSymbolicLink();
  } catch (e) {
    return false;
  }
}
function skipNotSupportedFormats(options) {
  return (entry) => {
    const { path } = entry;
    const format = _tokenizer.getFormatByFile.call(void 0, path, options.formatsExts);
    const shouldNotSkip = !!(format && options.format && options.format.includes(format));
    if ((options.debug || options.verbose) && !shouldNotSkip) {
      console.log(`File ${path} skipped! Format "${format}" does not included to supported formats.`);
    }
    return shouldNotSkip;
  };
}
function skipBigFiles(options) {
  return (entry) => {
    const { stats, path } = entry;
    const shouldSkip = stats !== void 0 && _bytes2.default.parse(stats.size) > _bytes2.default.parse(_core.getOption.call(void 0, "maxSize", options));
    if (options.debug && shouldSkip) {
      console.log(`File ${path} skipped! Size more then limit (${_bytes2.default.call(void 0, stats.size)} > ${_core.getOption.call(void 0, "maxSize", options)})`);
    }
    return !shouldSkip;
  };
}
function skipFilesIfLinesOfContentNotInLimits(options) {
  return (entry) => {
    const { path, content } = entry;
    const lines = content.split("\n").length;
    const minLines = _core.getOption.call(void 0, "minLines", options);
    const maxLines = _core.getOption.call(void 0, "maxLines", options);
    if (lines < minLines || lines > maxLines) {
      if (options.debug || options.verbose) {
        console.log(_safe.grey.call(void 0, `File ${path} skipped! Code lines=${lines} not in limits (${minLines}:${maxLines})`));
      }
      return false;
    }
    return true;
  };
}
function addContentToEntry(entry) {
  const { path } = entry;
  const content = _fsextra.readFileSync.call(void 0, path).toString();
  return { ...entry, content };
}
function getFilesToDetect(options) {
  const pattern = options.pattern || "**/*";
  let patterns = options.path;
  if (options.noSymlinks) {
    patterns = patterns !== void 0 ? patterns.filter((path) => !isSymlink(path)) : [];
  }
  patterns = patterns !== void 0 ? patterns.map((path) => {
    const currentPath = _fsextra.realpathSync.call(void 0, path);
    if (isFile(currentPath)) {
      return path;
    }
    return path.endsWith("/") ? `${path}${pattern}` : `${path}/${pattern}`;
  }) : [];
  return _fastglob.sync.call(void 0, 
    patterns,
    {
      ignore: options.ignore,
      onlyFiles: true,
      dot: true,
      stats: true,
      absolute: options.absolute,
      followSymbolicLinks: !options.noSymlinks
    }
  ).filter(skipNotSupportedFormats(options)).filter(skipBigFiles(options)).map(addContentToEntry).filter(skipFilesIfLinesOfContentNotInLimits(options));
}

// src/hooks/blamer.ts
var _blamer = require('blamer'); var _blamer2 = _interopRequireDefault(_blamer);
var BlamerHook = class _BlamerHook {
  process(clones) {
    return Promise.all(clones.map((clone) => _BlamerHook.blameLines(clone)));
  }
  static async blameLines(clone) {
    const blamer = new (0, _blamer2.default)();
    const blamedFileA = await blamer.blameByFile(clone.duplicationA.sourceId);
    const blamedFileB = await blamer.blameByFile(clone.duplicationB.sourceId);
    clone.duplicationA.blame = _BlamerHook.getBlamedLines(blamedFileA, clone.duplicationA.start.line, clone.duplicationA.end.line);
    clone.duplicationB.blame = _BlamerHook.getBlamedLines(blamedFileB, clone.duplicationB.start.line, clone.duplicationB.end.line);
    return clone;
  }
  static getBlamedLines(blamedFiles, start, end) {
    const [file] = Object.keys(blamedFiles);
    const result = {};
    Object.keys(blamedFiles[file]).filter((lineNumber) => {
      return Number(lineNumber) >= start && Number(lineNumber) <= end;
    }).map((lineNumber) => blamedFiles[file][lineNumber]).forEach((info) => {
      result[info.line] = info;
    });
    return result;
  }
};

// src/hooks/fragment.ts

var FragmentsHook = class _FragmentsHook {
  process(clones) {
    return Promise.all(
      clones.map((clone) => _FragmentsHook.addFragments(clone))
    );
  }
  static addFragments(clone) {
    const codeA = _fs.readFileSync.call(void 0, clone.duplicationA.sourceId).toString();
    const codeB = _fs.readFileSync.call(void 0, clone.duplicationB.sourceId).toString();
    clone.duplicationA.fragment = codeA.substring(clone.duplicationA.range[0], clone.duplicationA.range[1]);
    clone.duplicationB.fragment = codeB.substring(clone.duplicationB.range[0], clone.duplicationB.range[1]);
    return clone;
  }
};

// src/utils/clone-found.ts


// src/utils/reports.ts

var _process = require('process');

var compareDates = (firstDate, secondDate) => {
  const first = new Date(firstDate);
  const second = new Date(secondDate);
  switch (true) {
    case first < second:
      return "=>";
    case first > second:
      return "<=";
    default:
      return "==";
  }
};
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return "";
    }
  });
}
function getPath(path, options) {
  return options.absolute ? path : _path.relative.call(void 0, _process.cwd.call(void 0, ), path);
}
function getPathConsoleString(path, options) {
  return _safe.bold.call(void 0, _safe.green.call(void 0, getPath(path, options)));
}
function getSourceLocation(start, end) {
  return `${start.line}:${start.column} - ${end.line}:${end.column}`;
}
function generateLine(clone, position, line) {
  const lineNumberA = (clone.duplicationA.start.line + position).toString();
  const lineNumberB = (clone.duplicationB.start.line + position).toString();
  if (clone.duplicationA.blame && clone.duplicationB.blame) {
    return [
      lineNumberA,
      // @ts-ignore
      clone.duplicationA.blame[lineNumberA] ? clone.duplicationA.blame[lineNumberA].author : "",
      clone.duplicationA.blame[lineNumberA] && clone.duplicationB.blame[lineNumberB] ? compareDates(clone.duplicationA.blame[lineNumberA].date, clone.duplicationB.blame[lineNumberB].date) : "",
      lineNumberB,
      // @ts-ignore
      clone.duplicationB.blame[lineNumberB] ? clone.duplicationB.blame[lineNumberB].author : "",
      _safe.grey.call(void 0, line)
    ];
  } else {
    return [lineNumberA, lineNumberB, _safe.grey.call(void 0, line)];
  }
}
function convertStatisticToArray(format, statistic) {
  return [
    format,
    `${statistic.sources}`,
    `${statistic.lines}`,
    `${statistic.tokens}`,
    `${statistic.clones}`,
    `${statistic.duplicatedLines} (${statistic.percentage}%)`,
    `${statistic.duplicatedTokens} (${statistic.percentageTokens}%)`
  ];
}

// src/utils/clone-found.ts
function cloneFound(clone, options) {
  const { duplicationA, duplicationB, format, isNew } = clone;
  console.log("Clone found (" + format + "):" + (isNew ? _safe.red.call(void 0, "*") : ""));
  console.log(
    ` - ${getPathConsoleString(duplicationA.sourceId, options)} [${getSourceLocation(
      duplicationA.start,
      duplicationA.end
    )}] (${duplicationA.end.line - duplicationA.start.line} lines${duplicationA.end.position ? ", " + (duplicationA.end.position - duplicationA.start.position) + " tokens" : ""})`
  );
  console.log(
    `   ${getPathConsoleString(duplicationB.sourceId, options)} [${getSourceLocation(
      duplicationB.start,
      duplicationB.end
    )}]`
  );
  console.log("");
}

// src/subscribers/progress.ts
var ProgressSubscriber = class {
  constructor(options) {
    this.options = options;
  }
  subscribe() {
    return {
      CLONE_FOUND: (payload) => cloneFound(payload.clone, this.options)
    };
  }
};

// src/subscribers/verbose.ts

var VerboseSubscriber = class {
  constructor(options) {
    this.options = options;
  }
  subscribe() {
    return {
      "CLONE_FOUND": (payload) => {
        const { clone } = payload;
        console.log(_safe.yellow.call(void 0, "CLONE_FOUND"));
        console.log(_safe.grey.call(void 0, JSON.stringify(clone, null, "	")));
      },
      "CLONE_SKIPPED": (payload) => {
        const { validation } = payload;
        console.log(_safe.yellow.call(void 0, "CLONE_SKIPPED"));
        console.log(
          _safe.grey.call(void 0, "Clone skipped: " + _optionalChain([validation, 'optionalAccess', _ => _.message, 'optionalAccess', _2 => _2.join, 'call', _3 => _3(" ")]))
        );
      },
      "START_DETECTION": (payload) => {
        const { source } = payload;
        console.log(_safe.yellow.call(void 0, "START_DETECTION"));
        console.log(
          _safe.grey.call(void 0, "Start detection for source id=" + _optionalChain([source, 'optionalAccess', _4 => _4.getId, 'call', _5 => _5()]) + " format=" + _optionalChain([source, 'optionalAccess', _6 => _6.getFormat, 'call', _7 => _7()]))
        );
      }
    };
  }
};

// src/reporters/console.ts

var Table = __require("cli-table3");
var ConsoleReporter = class {
  
  constructor(options) {
    this.options = options;
  }
  report(clones, statistic = void 0) {
    if (statistic && !this.options.silent) {
      const table = new Table({
        head: ["Format", "Files analyzed", "Total lines", "Total tokens", "Clones found", "Duplicated lines", "Duplicated tokens"]
      });
      Object.keys(statistic.formats).filter((format) => statistic.formats[format].sources).forEach((format) => {
        table.push(convertStatisticToArray(format, statistic.formats[format].total));
      });
      table.push(convertStatisticToArray(_safe.bold.call(void 0, "Total:"), statistic.total));
      console.log(table.toString());
      console.log(_safe.grey.call(void 0, `Found ${clones.length} clones.`));
    }
  }
};

// src/reporters/console-full.ts

var Table2 = __require("cli-table3");
var TABLE_OPTIONS = {
  chars: {
    top: "",
    "top-mid": "",
    "top-left": "",
    "top-right": "",
    bottom: "",
    "bottom-mid": "",
    "bottom-left": "",
    "bottom-right": "",
    left: "",
    "left-mid": "",
    mid: "",
    "mid-mid": "",
    right: "",
    "right-mid": "",
    middle: "\u2502"
  }
};
var ConsoleFullReporter = class {
  constructor(options) {
    this.options = options;
  }
  report(clones) {
    clones.forEach((clone) => {
      this.cloneFullFound(clone);
    });
    console.log(_safe.grey.call(void 0, `Found ${clones.length} clones.`));
  }
  cloneFullFound(clone) {
    const table = new Table2(TABLE_OPTIONS);
    cloneFound(clone, this.options);
    clone.duplicationA.fragment.split("\n").forEach((line, position) => {
      table.push(generateLine(clone, position, line));
    });
    console.log(table.toString());
    console.log("");
  }
};

// src/reporters/json.ts




var JsonReporter = class {
  constructor(options) {
    this.options = options;
  }
  generateJson(clones, statistics) {
    return {
      statistics,
      duplicates: clones.map((clone) => this.cloneFound(clone))
    };
  }
  report(clones, statistic) {
    const json = this.generateJson(clones, statistic);
    _fsextra.ensureDirSync.call(void 0, _core.getOption.call(void 0, "output", this.options));
    _fsextra.writeFileSync.call(void 0, _core.getOption.call(void 0, "output", this.options) + "/jscpd-report.json", JSON.stringify(json, null, "  "));
    console.log(_safe.green.call(void 0, `JSON report saved to ${_path.join.call(void 0, this.options.output, "jscpd-report.json")}`));
  }
  cloneFound(clone) {
    const startLineA = clone.duplicationA.start.line;
    const endLineA = clone.duplicationA.end.line;
    const startLineB = clone.duplicationB.start.line;
    const endLineB = clone.duplicationB.end.line;
    return {
      format: clone.format,
      lines: endLineA - startLineA + 1,
      fragment: clone.duplicationA.fragment,
      tokens: 0,
      firstFile: {
        name: getPath(clone.duplicationA.sourceId, this.options),
        start: startLineA,
        end: endLineA,
        startLoc: clone.duplicationA.start,
        endLoc: clone.duplicationA.end,
        blame: clone.duplicationA.blame
      },
      secondFile: {
        name: getPath(clone.duplicationB.sourceId, this.options),
        start: startLineB,
        end: endLineB,
        startLoc: clone.duplicationB.start,
        endLoc: clone.duplicationB.end,
        blame: clone.duplicationB.blame
      }
    };
  }
};

// src/reporters/csv.ts




var CSVReporter = class {
  constructor(options) {
    this.options = options;
  }
  // @ts-ignore
  report(clones, statistic) {
    const report = [
      ["Format", "Files analyzed", "Total lines", "Total tokens", "Clones found", "Duplicated lines", "Duplicated tokens"],
      ...Object.keys(statistic.formats).map((format) => convertStatisticToArray(format, statistic.formats[format].total)),
      convertStatisticToArray("Total:", statistic.total)
    ].map((arr) => arr.join(",")).join("\n");
    _fsextra.ensureDirSync.call(void 0, _core.getOption.call(void 0, "output", this.options));
    _fsextra.writeFileSync.call(void 0, _core.getOption.call(void 0, "output", this.options) + "/jscpd-report.csv", report);
    console.log(_safe.green.call(void 0, `CSV report saved to ${_path.join.call(void 0, _optionalChain([this, 'access', _8 => _8.options, 'optionalAccess', _9 => _9.output]), "jscpd-report.csv")}`));
  }
};

// src/reporters/markdown.ts




var _markdowntable = require('markdown-table'); var _markdowntable2 = _interopRequireDefault(_markdowntable);
var MarkdownReporter = class {
  constructor(options) {
    this.options = options;
  }
  report(clones, statistic) {
    const report = `
# Copy/paste detection report

> Duplications detection: Found ${clones.length} exact clones with ${statistic.total.duplicatedLines}(${statistic.total.percentage}%) duplicated lines in ${statistic.total.sources} (${Object.keys(statistic.formats).length} formats) files.

${_markdowntable2.default.call(void 0, [
      ["Format", "Files analyzed", "Total lines", "Total tokens", "Clones found", "Duplicated lines", "Duplicated tokens"],
      ...Object.keys(statistic.formats).map((format) => convertStatisticToArray(format, statistic.formats[format].total)),
      convertStatisticToArray("Total:", statistic.total).map((item) => `**${item}**`)
    ])}
`;
    _fsextra.ensureDirSync.call(void 0, _core.getOption.call(void 0, "output", this.options));
    _fsextra.writeFileSync.call(void 0, _core.getOption.call(void 0, "output", this.options) + "/jscpd-report.md", report);
    console.log(_safe.green.call(void 0, `Markdown report saved to ${_path.join.call(void 0, this.options.output, "jscpd-report.md")}`));
  }
};

// src/reporters/xml.ts





var XmlReporter = class {
  constructor(options) {
    this.options = options;
  }
  report(clones) {
    let xmlDoc = '<?xml version="1.0" encoding="UTF-8" ?>';
    xmlDoc += "<pmd-cpd>";
    clones.forEach((clone) => {
      xmlDoc = `${xmlDoc}
      <duplication lines="${clone.duplicationA.end.line - clone.duplicationA.start.line}">
            <file path="${escapeXml(getPath(clone.duplicationA.sourceId, this.options))}" line="${clone.duplicationA.start.line}">
              <codefragment><![CDATA[${_optionalChain([clone, 'access', _10 => _10.duplicationA, 'access', _11 => _11.fragment, 'optionalAccess', _12 => _12.replace, 'call', _13 => _13(/]]>/i, "CDATA_END")])}]]></codefragment>
            </file>
            <file path="${escapeXml(getPath(clone.duplicationB.sourceId, this.options))}" line="${clone.duplicationB.start.line}">
              <codefragment><![CDATA[${_optionalChain([clone, 'access', _14 => _14.duplicationB, 'access', _15 => _15.fragment, 'optionalAccess', _16 => _16.replace, 'call', _17 => _17(/]]>/i, "CDATA_END")])}]]></codefragment>
            </file>
            <codefragment><![CDATA[${_optionalChain([clone, 'access', _18 => _18.duplicationA, 'access', _19 => _19.fragment, 'optionalAccess', _20 => _20.replace, 'call', _21 => _21(/]]>/i, "CDATA_END")])}]]></codefragment>
        </duplication>
      `;
    });
    xmlDoc += "</pmd-cpd>";
    _fsextra.ensureDirSync.call(void 0, _core.getOption.call(void 0, "output", this.options));
    _fs.writeFileSync.call(void 0, _core.getOption.call(void 0, "output", this.options) + "/jscpd-report.xml", xmlDoc);
    console.log(_safe.green.call(void 0, `XML report saved to ${_path.join.call(void 0, this.options.output, "jscpd-report.xml")}`));
  }
};

// src/reporters/silent.ts

var SilentReporter = class {
  report(clones, statistic) {
    if (statistic) {
      console.log(
        `Duplications detection: Found ${_safe.bold.call(void 0, clones.length.toString())} exact clones with ${_safe.bold.call(void 0, statistic.total.duplicatedLines.toString())}(${statistic.total.percentage}%) duplicated lines in ${_safe.bold.call(void 0, statistic.total.sources.toString())} (${Object.keys(statistic.formats).length} formats) files.`
      );
    }
  }
};

// src/reporters/threshold.ts

var ThresholdReporter = class {
  constructor(options) {
    this.options = options;
  }
  // @ts-ignore
  report(clones, statistic) {
    if (statistic && this.options.threshold !== void 0 && this.options.threshold < statistic.total.percentage) {
      const message = `ERROR: jscpd found too many duplicates (${statistic.total.percentage}%) over threshold (${this.options.threshold}%)`;
      console.error(_safe.red.call(void 0, message));
      throw new Error(message);
    }
  }
};

// src/reporters/xcode.ts
var XcodeReporter = class {
  constructor(options) {
    this.options = options;
  }
  report(clones) {
    clones.forEach((clone) => {
      this.cloneFound(clone);
    });
    console.log(`Found ${clones.length} clones.`);
  }
  cloneFound(clone) {
    const pathA = getPath(clone.duplicationA.sourceId, { ...this.options, absolute: true });
    const pathB = getPath(clone.duplicationB.sourceId, this.options);
    const startLineA = clone.duplicationA.start.line;
    const characterA = clone.duplicationA.start.column;
    const endLineA = clone.duplicationA.end.line;
    const startLineB = clone.duplicationB.start.line;
    const endLineB = clone.duplicationB.end.line;
    console.log(`${pathA}:${startLineA}:${characterA}: warning: Found ${endLineA - startLineA} lines (${startLineA}-${endLineA}) duplicated on file ${pathB} (${startLineB}-${endLineB})`);
  }
};

// src/utils/options.ts
function parseFormatsExtensions(extensions = "") {
  const result = {};
  if (!extensions) {
    return void 0;
  }
  extensions.split(";").forEach((format) => {
    const pair = format.split(":");
    result[pair[0]] = pair[1].split(",");
  });
  return result;
}


















exports.BlamerHook = BlamerHook; exports.CSVReporter = CSVReporter; exports.ConsoleFullReporter = ConsoleFullReporter; exports.ConsoleReporter = ConsoleReporter; exports.FragmentsHook = FragmentsHook; exports.InFilesDetector = InFilesDetector; exports.JsonReporter = JsonReporter; exports.MarkdownReporter = MarkdownReporter; exports.ProgressSubscriber = ProgressSubscriber; exports.SilentReporter = SilentReporter; exports.SkipLocalValidator = SkipLocalValidator; exports.ThresholdReporter = ThresholdReporter; exports.VerboseSubscriber = VerboseSubscriber; exports.XcodeReporter = XcodeReporter; exports.XmlReporter = XmlReporter; exports.getFilesToDetect = getFilesToDetect; exports.parseFormatsExtensions = parseFormatsExtensions;
//# sourceMappingURL=index.js.map