"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/index.ts
var _core = require('@jscpd/core');
var _safe = require('colors/safe');
var _finder = require('@jscpd/finder');

// src/init/cli.ts
var _commander = require('commander');

function initCli(packageJson, argv) {
  const cli = new (0, _commander.Command)(packageJson.name);
  cli.version(packageJson.version).usage("[options] <path ...>").description(packageJson.description).option(
    "-l, --min-lines [number]",
    "min size of duplication in code lines (Default is " + _core.getOption.call(void 0, "minLines") + ")"
  ).option(
    "-k, --min-tokens [number]",
    "min size of duplication in code tokens (Default is " + _core.getOption.call(void 0, "minTokens") + ")"
  ).option("-x, --max-lines [number]", "max size of source in lines (Default is " + _core.getOption.call(void 0, "maxLines") + ")").option(
    "-z, --max-size [string]",
    "max size of source in bytes, examples: 1kb, 1mb, 120kb (Default is " + _core.getOption.call(void 0, "maxSize") + ")"
  ).option(
    "-t, --threshold [number]",
    "threshold for duplication, in case duplications >= threshold jscpd will exit with error"
  ).option("-c, --config [string]", "path to config file (Default is .jscpd.json in <path>)").option("-i, --ignore [string]", "glob pattern for files what should be excluded from duplication detection").option("--ignore-pattern [string]", "Ignore code blocks matching the regexp patterns").option(
    "-r, --reporters [string]",
    "reporters or list of reporters separated with comma to use (Default is time,console)"
  ).option("-o, --output [string]", "reporters to use (Default is ./report/)").option(
    "-m, --mode [string]",
    'mode of quality of search, can be "strict", "mild" and "weak" (Default is "' + _core.getOption.call(void 0, "mode") + '")'
  ).option("-f, --format [string]", "format or formats separated by comma (Example php,javascript,python)").option("-p, --pattern [string]", "glob pattern to file search (Example **/*.txt)").option("-b, --blame", "blame authors of duplications (get information about authors from git)").option("-s, --silent", "do not write detection progress and result to a console").option("--store [string]", "use for define custom store (e.g. --store leveldb used for big codebase)").option("-a, --absolute", "use absolute path in reports").option("-n, --noSymlinks", "dont use symlinks for detection in files").option("--ignoreCase", "ignore case of symbols in code (experimental)").option("-g, --gitignore", "ignore all files from .gitignore file").option("--formats-exts [string]", "list of formats with file extensions (javascript:es,es6;dart:dt)").option("-d, --debug", "show debug information, not run detection process(options list and selected files)").option("-v, --verbose", "show full information during detection process").option("--list", "show list of total supported formats").option("--skipLocal", "skip duplicates in local folders, just detect cross folders duplications").option("--exitCode [number]", "exit code to use when code duplications are detected");
  cli.parse(argv);
  return cli;
}

// src/init/options.ts

var _tokenizer = require('@jscpd/tokenizer');

// src/init/ignore.ts
var _fs = require('fs');
var gitignoreToGlob = __require("gitignore-to-glob");
function initIgnore(options) {
  const ignore = options.ignore || [];
  if (options.gitignore && _fs.existsSync.call(void 0, process.cwd() + "/.gitignore")) {
    let gitignorePatterns = gitignoreToGlob(process.cwd() + "/.gitignore") || [];
    gitignorePatterns = gitignorePatterns.map(
      (pattern) => pattern.substr(pattern.length - 1) === "/" ? `${pattern}**/*` : pattern
    );
    ignore.push(...gitignorePatterns);
    ignore.map((pattern) => pattern.replace("!", ""));
  }
  return ignore;
}

// src/options.ts
var _path = require('path');

var _fsextra = require('fs-extra');


var convertCliToOptions = (cli) => {
  const result = {
    minTokens: cli.minTokens ? parseInt(cli.minTokens) : void 0,
    minLines: cli.minLines ? parseInt(cli.minLines) : void 0,
    maxLines: cli.maxLines ? parseInt(cli.maxLines) : void 0,
    maxSize: cli.maxSize,
    debug: cli.debug,
    store: cli.store,
    pattern: cli.pattern,
    executionId: cli.executionId,
    silent: cli.silent,
    blame: cli.blame,
    verbose: cli.verbose,
    cache: cli.cache,
    output: cli.output,
    format: cli.format,
    formatsExts: _finder.parseFormatsExtensions.call(void 0, cli.formatsExts),
    list: cli.list,
    mode: cli.mode,
    absolute: cli.absolute,
    noSymlinks: cli.noSymlinks,
    skipLocal: cli.skipLocal,
    ignoreCase: cli.ignoreCase,
    gitignore: cli.gitignore,
    exitCode: cli.exitCode
  };
  if (cli.threshold !== void 0) {
    result.threshold = Number(cli.threshold);
  }
  if (cli.reporters) {
    result.reporters = cli.reporters.split(",");
  }
  if (cli.format) {
    result.format = cli.format.split(",");
  }
  if (cli.ignore) {
    result.ignore = cli.ignore.split(",");
  }
  if (cli.ignorePattern) {
    result.ignorePattern = cli.ignorePattern.split(",");
  }
  result.path = cli.path ? [cli.path].concat(cli.args) : cli.args;
  if (result.path.length === 0) {
    delete result.path;
  }
  Object.keys(result).forEach((key) => {
    if (typeof result[key] === "undefined") {
      delete result[key];
    }
  });
  return result;
};
var readConfigJson = (config) => {
  const configFile = config ? _path.resolve.call(void 0, config) : _path.resolve.call(void 0, ".jscpd.json");
  const configExists = _fs.existsSync.call(void 0, configFile);
  if (configExists) {
    const result = { config: configFile, ..._fsextra.readJSONSync.call(void 0, configFile) };
    if (result.path) {
      result.path = result.path.map((path) => _path.resolve.call(void 0, _path.dirname.call(void 0, configFile), path));
    }
    return result;
  }
  return {};
};
var readPackageJsonConfig = () => {
  const config = _path.resolve.call(void 0, process.cwd() + "/package.json");
  if (_fs.existsSync.call(void 0, config)) {
    const json = _fsextra.readJSONSync.call(void 0, config);
    if (json.jscpd && json.jscpd.path) {
      json.jscpd.path = json.jscpd.path.map((path) => _path.resolve.call(void 0, _path.dirname.call(void 0, config), path));
    }
    return json.jscpd ? { config, ...json.jscpd } : {};
  }
  return {};
};
function prepareOptions(cli) {
  const storedConfig = readConfigJson(cli.config);
  const packageJsonConfig = readPackageJsonConfig();
  const argsConfig = convertCliToOptions(cli);
  const result = {
    ..._core.getDefaultOptions.call(void 0, ),
    ...packageJsonConfig,
    ...storedConfig,
    ...argsConfig
  };
  result.reporters = result.reporters || [];
  result.listeners = result.listeners || [];
  if (result.silent) {
    result.reporters = result.reporters.filter(
      (reporter) => !reporter.includes("console")
    ).concat("silent");
  }
  if (result.threshold !== void 0) {
    result.reporters = [...result.reporters, "threshold"];
  }
  return result;
}

// src/init/options.ts
function initOptionsFromCli(cli) {
  const options = prepareOptions(cli);
  options.format = options.format || _tokenizer.getSupportedFormats.call(void 0, );
  options.mode = _core.getModeHandler.call(void 0, options.mode);
  options.ignore = initIgnore(options);
  return options;
}

// src/print/files.ts

function printFiles(files) {
  files.forEach((stats) => {
    console.log(_safe.grey.call(void 0, stats.path));
  });
  console.log(_safe.bold.call(void 0, `Found ${files.length} files to detect.`));
}

// src/print/options.ts

function printOptions(options) {
  console.log(_safe.bold.call(void 0, _safe.white.call(void 0, "Options:")));
  console.dir(options);
}

// src/print/supported-format.ts


function printSupportedFormat() {
  console.log(_safe.bold.call(void 0, _safe.white.call(void 0, "Supported formats: ")));
  console.log(_tokenizer.getSupportedFormats.call(void 0, ).join(", "));
  process.exit(0);
}

// src/index.ts
var _crypto = require('crypto');

// src/init/store.ts


function getStore(storeName) {
  if (storeName) {
    const packageName = "@jscpd/" + storeName + "-store";
    try {
      const store = __require(packageName).default;
      return new store();
    } catch (e) {
      console.error(_safe.red.call(void 0, "store name " + storeName + " not installed."));
    }
  }
  return new (0, _core.MemoryStore)();
}

// src/index.ts


// src/init/reporters.ts












var _htmlreporter = require('@jscpd/html-reporter'); var _htmlreporter2 = _interopRequireDefault(_htmlreporter);
var _jscpdsarifreporter = require('jscpd-sarif-reporter'); var _jscpdsarifreporter2 = _interopRequireDefault(_jscpdsarifreporter);
var reporters = {
  xml: _finder.XmlReporter,
  json: _finder.JsonReporter,
  csv: _finder.CSVReporter,
  markdown: _finder.MarkdownReporter,
  consoleFull: _finder.ConsoleFullReporter,
  html: _htmlreporter2.default,
  console: _finder.ConsoleReporter,
  silent: _finder.SilentReporter,
  threshold: _finder.ThresholdReporter,
  xcode: _finder.XcodeReporter,
  sarif: _jscpdsarifreporter2.default
};
function registerReporters(options, detector) {
  options.reporters.forEach((reporter) => {
    if (reporter in reporters) {
      detector.registerReporter(new reporters[reporter](options));
    } else {
      try {
        const reporterClass = __require(`@jscpd/${reporter}-reporter`).default;
        detector.registerReporter(new reporterClass(options));
      } catch (e) {
        try {
          const reporterClass = __require(`jscpd-${reporter}-reporter`).default;
          detector.registerReporter(new reporterClass(options));
        } catch (e2) {
          console.log(_safe.yellow.call(void 0, `warning: ${reporter} not installed (install packages named @jscpd/${reporter}-reporter or jscpd-${reporter}-reporter)`));
          console.log(_safe.grey.call(void 0, e2.message));
        }
      }
    }
  });
}

// src/init/subscribers.ts

function registerSubscribers(options, detector) {
  if (options.verbose) {
    detector.registerSubscriber(new (0, _finder.VerboseSubscriber)(options));
  }
  if (!options.silent) {
    detector.registerSubscriber(new (0, _finder.ProgressSubscriber)(options));
  }
}

// src/init/hooks.ts

function registerHooks(options, detector) {
  detector.registerHook(new (0, _finder.FragmentsHook)());
  if (options.blame) {
    detector.registerHook(new (0, _finder.BlamerHook)());
  }
}

// src/index.ts

var TIMER_LABEL = "Detection time:";
var detectClones = (opts, store = void 0) => {
  const options = { ..._core.getDefaultOptions.call(void 0, ), ...opts };
  options.format = options.format || _tokenizer.getSupportedFormats.call(void 0, );
  const files = _finder.getFilesToDetect.call(void 0, options);
  const hashFunction = (value) => {
    return _crypto.createHash.call(void 0, "md5").update(value).digest("hex");
  };
  options.hashFunction = options.hashFunction || hashFunction;
  const currentStore = store || getStore(options.store);
  const statistic = new (0, _core.Statistic)();
  const tokenizer = new (0, _tokenizer.Tokenizer)();
  const detector = new (0, _finder.InFilesDetector)(tokenizer, currentStore, statistic, options);
  registerReporters(options, detector);
  registerSubscribers(options, detector);
  registerHooks(options, detector);
  if (!options.silent) {
    console.time(_safe.italic.call(void 0, _safe.grey.call(void 0, TIMER_LABEL)));
  }
  return detector.detect(files).then((clones) => {
    if (!options.silent) {
      console.timeEnd(_safe.italic.call(void 0, _safe.grey.call(void 0, TIMER_LABEL)));
    }
    return clones;
  });
};
async function jscpd(argv, exitCallback) {
  const packageJson = _fsextra.readJSONSync.call(void 0, __dirname + "/../package.json");
  const cli = initCli(packageJson, argv);
  const options = initOptionsFromCli(cli);
  if (options.list) {
    printSupportedFormat();
  }
  if (options.debug) {
    printOptions(options);
  }
  if (!options.path || options.path.length === 0) {
    options.path = [process.cwd()];
  }
  if (options.debug) {
    const files = _finder.getFilesToDetect.call(void 0, options);
    printFiles(files);
    return Promise.resolve([]);
  } else {
    const store = getStore(options.store);
    return detectClones(options, store).then((clones) => {
      if (clones.length > 0) {
        _optionalChain([exitCallback, 'optionalCall', _ => _(options.exitCode || 0)]);
      }
      return clones;
    }).finally(() => {
      store.close();
    });
  }
}

// bin/jscpd.ts
(async () => {
  try {
    await jscpd(process.argv, process.exit);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();



exports.detectClones = detectClones; exports.jscpd = jscpd;
//# sourceMappingURL=jscpd.js.map