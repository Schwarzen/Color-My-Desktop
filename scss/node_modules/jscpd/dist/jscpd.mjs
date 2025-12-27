var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/index.ts
import { getDefaultOptions as getDefaultOptions2, Statistic } from "@jscpd/core";
import { grey as grey3, italic } from "colors/safe";
import { getFilesToDetect, InFilesDetector as InFilesDetector4 } from "@jscpd/finder";

// src/init/cli.ts
import { Command } from "commander";
import { getOption } from "@jscpd/core";
function initCli(packageJson, argv) {
  const cli = new Command(packageJson.name);
  cli.version(packageJson.version).usage("[options] <path ...>").description(packageJson.description).option(
    "-l, --min-lines [number]",
    "min size of duplication in code lines (Default is " + getOption("minLines") + ")"
  ).option(
    "-k, --min-tokens [number]",
    "min size of duplication in code tokens (Default is " + getOption("minTokens") + ")"
  ).option("-x, --max-lines [number]", "max size of source in lines (Default is " + getOption("maxLines") + ")").option(
    "-z, --max-size [string]",
    "max size of source in bytes, examples: 1kb, 1mb, 120kb (Default is " + getOption("maxSize") + ")"
  ).option(
    "-t, --threshold [number]",
    "threshold for duplication, in case duplications >= threshold jscpd will exit with error"
  ).option("-c, --config [string]", "path to config file (Default is .jscpd.json in <path>)").option("-i, --ignore [string]", "glob pattern for files what should be excluded from duplication detection").option("--ignore-pattern [string]", "Ignore code blocks matching the regexp patterns").option(
    "-r, --reporters [string]",
    "reporters or list of reporters separated with comma to use (Default is time,console)"
  ).option("-o, --output [string]", "reporters to use (Default is ./report/)").option(
    "-m, --mode [string]",
    'mode of quality of search, can be "strict", "mild" and "weak" (Default is "' + getOption("mode") + '")'
  ).option("-f, --format [string]", "format or formats separated by comma (Example php,javascript,python)").option("-p, --pattern [string]", "glob pattern to file search (Example **/*.txt)").option("-b, --blame", "blame authors of duplications (get information about authors from git)").option("-s, --silent", "do not write detection progress and result to a console").option("--store [string]", "use for define custom store (e.g. --store leveldb used for big codebase)").option("-a, --absolute", "use absolute path in reports").option("-n, --noSymlinks", "dont use symlinks for detection in files").option("--ignoreCase", "ignore case of symbols in code (experimental)").option("-g, --gitignore", "ignore all files from .gitignore file").option("--formats-exts [string]", "list of formats with file extensions (javascript:es,es6;dart:dt)").option("-d, --debug", "show debug information, not run detection process(options list and selected files)").option("-v, --verbose", "show full information during detection process").option("--list", "show list of total supported formats").option("--skipLocal", "skip duplicates in local folders, just detect cross folders duplications").option("--exitCode [number]", "exit code to use when code duplications are detected");
  cli.parse(argv);
  return cli;
}

// src/init/options.ts
import { getModeHandler } from "@jscpd/core";
import { getSupportedFormats } from "@jscpd/tokenizer";

// src/init/ignore.ts
import { existsSync } from "fs";
var gitignoreToGlob = __require("gitignore-to-glob");
function initIgnore(options) {
  const ignore = options.ignore || [];
  if (options.gitignore && existsSync(process.cwd() + "/.gitignore")) {
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
import { dirname, resolve } from "path";
import { existsSync as existsSync2 } from "fs";
import { readJSONSync } from "fs-extra";
import { getDefaultOptions } from "@jscpd/core";
import { parseFormatsExtensions } from "@jscpd/finder";
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
    formatsExts: parseFormatsExtensions(cli.formatsExts),
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
  const configFile = config ? resolve(config) : resolve(".jscpd.json");
  const configExists = existsSync2(configFile);
  if (configExists) {
    const result = { config: configFile, ...readJSONSync(configFile) };
    if (result.path) {
      result.path = result.path.map((path) => resolve(dirname(configFile), path));
    }
    return result;
  }
  return {};
};
var readPackageJsonConfig = () => {
  const config = resolve(process.cwd() + "/package.json");
  if (existsSync2(config)) {
    const json = readJSONSync(config);
    if (json.jscpd && json.jscpd.path) {
      json.jscpd.path = json.jscpd.path.map((path) => resolve(dirname(config), path));
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
    ...getDefaultOptions(),
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
  options.format = options.format || getSupportedFormats();
  options.mode = getModeHandler(options.mode);
  options.ignore = initIgnore(options);
  return options;
}

// src/print/files.ts
import { bold, grey } from "colors/safe";
function printFiles(files) {
  files.forEach((stats) => {
    console.log(grey(stats.path));
  });
  console.log(bold(`Found ${files.length} files to detect.`));
}

// src/print/options.ts
import { bold as bold2, white } from "colors/safe";
function printOptions(options) {
  console.log(bold2(white("Options:")));
  console.dir(options);
}

// src/print/supported-format.ts
import { bold as bold3, white as white2 } from "colors/safe";
import { getSupportedFormats as getSupportedFormats2 } from "@jscpd/tokenizer";
function printSupportedFormat() {
  console.log(bold3(white2("Supported formats: ")));
  console.log(getSupportedFormats2().join(", "));
  process.exit(0);
}

// src/index.ts
import { createHash } from "crypto";

// src/init/store.ts
import { MemoryStore } from "@jscpd/core";
import { red } from "colors/safe";
function getStore(storeName) {
  if (storeName) {
    const packageName = "@jscpd/" + storeName + "-store";
    try {
      const store = __require(packageName).default;
      return new store();
    } catch (e) {
      console.error(red("store name " + storeName + " not installed."));
    }
  }
  return new MemoryStore();
}

// src/index.ts
import { getSupportedFormats as getSupportedFormats3, Tokenizer } from "@jscpd/tokenizer";

// src/init/reporters.ts
import {
  ConsoleFullReporter,
  ConsoleReporter,
  CSVReporter,
  JsonReporter,
  MarkdownReporter,
  SilentReporter,
  ThresholdReporter,
  XcodeReporter,
  XmlReporter
} from "@jscpd/finder";
import { grey as grey2, yellow } from "colors/safe";
import HtmlReporter from "@jscpd/html-reporter";
import SarifReporter from "jscpd-sarif-reporter";
var reporters = {
  xml: XmlReporter,
  json: JsonReporter,
  csv: CSVReporter,
  markdown: MarkdownReporter,
  consoleFull: ConsoleFullReporter,
  html: HtmlReporter,
  console: ConsoleReporter,
  silent: SilentReporter,
  threshold: ThresholdReporter,
  xcode: XcodeReporter,
  sarif: SarifReporter
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
          console.log(yellow(`warning: ${reporter} not installed (install packages named @jscpd/${reporter}-reporter or jscpd-${reporter}-reporter)`));
          console.log(grey2(e2.message));
        }
      }
    }
  });
}

// src/init/subscribers.ts
import { ProgressSubscriber, VerboseSubscriber } from "@jscpd/finder";
function registerSubscribers(options, detector) {
  if (options.verbose) {
    detector.registerSubscriber(new VerboseSubscriber(options));
  }
  if (!options.silent) {
    detector.registerSubscriber(new ProgressSubscriber(options));
  }
}

// src/init/hooks.ts
import { BlamerHook, FragmentsHook } from "@jscpd/finder";
function registerHooks(options, detector) {
  detector.registerHook(new FragmentsHook());
  if (options.blame) {
    detector.registerHook(new BlamerHook());
  }
}

// src/index.ts
import { readJSONSync as readJSONSync2 } from "fs-extra";
var TIMER_LABEL = "Detection time:";
var detectClones = (opts, store = void 0) => {
  const options = { ...getDefaultOptions2(), ...opts };
  options.format = options.format || getSupportedFormats3();
  const files = getFilesToDetect(options);
  const hashFunction = (value) => {
    return createHash("md5").update(value).digest("hex");
  };
  options.hashFunction = options.hashFunction || hashFunction;
  const currentStore = store || getStore(options.store);
  const statistic = new Statistic();
  const tokenizer = new Tokenizer();
  const detector = new InFilesDetector4(tokenizer, currentStore, statistic, options);
  registerReporters(options, detector);
  registerSubscribers(options, detector);
  registerHooks(options, detector);
  if (!options.silent) {
    console.time(italic(grey3(TIMER_LABEL)));
  }
  return detector.detect(files).then((clones) => {
    if (!options.silent) {
      console.timeEnd(italic(grey3(TIMER_LABEL)));
    }
    return clones;
  });
};
async function jscpd(argv, exitCallback) {
  const packageJson = readJSONSync2(__dirname + "/../package.json");
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
    const files = getFilesToDetect(options);
    printFiles(files);
    return Promise.resolve([]);
  } else {
    const store = getStore(options.store);
    return detectClones(options, store).then((clones) => {
      if (clones.length > 0) {
        exitCallback?.(options.exitCode || 0);
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
export {
  detectClones,
  jscpd
};
//# sourceMappingURL=jscpd.mjs.map