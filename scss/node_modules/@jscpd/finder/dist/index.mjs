var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/in-files-detector.ts
import {
  Detector
} from "@jscpd/core";
import { getFormatByFile } from "@jscpd/tokenizer";

// src/validators/skip-local.validator.ts
import { getOption } from "@jscpd/core";
import { isAbsolute, relative } from "path";
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
    const path = getOption("path", options);
    return path.some(
      (dir) => _SkipLocalValidator.isRelative(clone.duplicationA.sourceId, dir) && _SkipLocalValidator.isRelative(clone.duplicationB.sourceId, dir)
    );
  }
  static isRelative(file, path) {
    const rel = relative(path, file);
    return rel !== "" && !rel.startsWith("..") && !isAbsolute(rel);
  }
};

// src/in-files-detector.ts
var InFilesDetector = class {
  constructor(tokenizer, store, statistic, options) {
    this.tokenizer = tokenizer;
    this.store = store;
    this.statistic = statistic;
    this.options = options;
    this.registerSubscriber(this.statistic);
  }
  reporters = [];
  subscribes = [];
  postHooks = [];
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
    const detector = new Detector(this.tokenizer, store, validators, options);
    this.subscribes.forEach((listener) => {
      Object.entries(listener.subscribe()).map(([event, handler]) => detector.on(event, handler));
    });
    const detect = (entry, clones = []) => {
      const { path, content } = entry;
      const format = getFormatByFile(path, options.formatsExts);
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
};

// src/files.ts
import { getOption as getOption2 } from "@jscpd/core";
import { sync } from "fast-glob";
import { getFormatByFile as getFormatByFile2 } from "@jscpd/tokenizer";
import { readFileSync, realpathSync } from "fs-extra";
import { grey } from "colors/safe";
import { lstatSync } from "fs";
import bytes from "bytes";
function isFile(path) {
  try {
    const stat = lstatSync(path);
    return stat.isFile();
  } catch (e) {
    return false;
  }
}
function isSymlink(path) {
  try {
    const stat = lstatSync(path);
    return stat.isSymbolicLink();
  } catch (e) {
    return false;
  }
}
function skipNotSupportedFormats(options) {
  return (entry) => {
    const { path } = entry;
    const format = getFormatByFile2(path, options.formatsExts);
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
    const shouldSkip = stats !== void 0 && bytes.parse(stats.size) > bytes.parse(getOption2("maxSize", options));
    if (options.debug && shouldSkip) {
      console.log(`File ${path} skipped! Size more then limit (${bytes(stats.size)} > ${getOption2("maxSize", options)})`);
    }
    return !shouldSkip;
  };
}
function skipFilesIfLinesOfContentNotInLimits(options) {
  return (entry) => {
    const { path, content } = entry;
    const lines = content.split("\n").length;
    const minLines = getOption2("minLines", options);
    const maxLines = getOption2("maxLines", options);
    if (lines < minLines || lines > maxLines) {
      if (options.debug || options.verbose) {
        console.log(grey(`File ${path} skipped! Code lines=${lines} not in limits (${minLines}:${maxLines})`));
      }
      return false;
    }
    return true;
  };
}
function addContentToEntry(entry) {
  const { path } = entry;
  const content = readFileSync(path).toString();
  return { ...entry, content };
}
function getFilesToDetect(options) {
  const pattern = options.pattern || "**/*";
  let patterns = options.path;
  if (options.noSymlinks) {
    patterns = patterns !== void 0 ? patterns.filter((path) => !isSymlink(path)) : [];
  }
  patterns = patterns !== void 0 ? patterns.map((path) => {
    const currentPath = realpathSync(path);
    if (isFile(currentPath)) {
      return path;
    }
    return path.endsWith("/") ? `${path}${pattern}` : `${path}/${pattern}`;
  }) : [];
  return sync(
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
import Blamer from "blamer";
var BlamerHook = class _BlamerHook {
  process(clones) {
    return Promise.all(clones.map((clone) => _BlamerHook.blameLines(clone)));
  }
  static async blameLines(clone) {
    const blamer = new Blamer();
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
import { readFileSync as readFileSync2 } from "fs";
var FragmentsHook = class _FragmentsHook {
  process(clones) {
    return Promise.all(
      clones.map((clone) => _FragmentsHook.addFragments(clone))
    );
  }
  static addFragments(clone) {
    const codeA = readFileSync2(clone.duplicationA.sourceId).toString();
    const codeB = readFileSync2(clone.duplicationB.sourceId).toString();
    clone.duplicationA.fragment = codeA.substring(clone.duplicationA.range[0], clone.duplicationA.range[1]);
    clone.duplicationB.fragment = codeB.substring(clone.duplicationB.range[0], clone.duplicationB.range[1]);
    return clone;
  }
};

// src/utils/clone-found.ts
import { red } from "colors/safe";

// src/utils/reports.ts
import { relative as relative2 } from "path";
import { cwd } from "process";
import { bold, green, grey as grey2 } from "colors/safe";
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
  return options.absolute ? path : relative2(cwd(), path);
}
function getPathConsoleString(path, options) {
  return bold(green(getPath(path, options)));
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
      grey2(line)
    ];
  } else {
    return [lineNumberA, lineNumberB, grey2(line)];
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
  console.log("Clone found (" + format + "):" + (isNew ? red("*") : ""));
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
import { grey as grey3, yellow } from "colors/safe";
var VerboseSubscriber = class {
  constructor(options) {
    this.options = options;
  }
  subscribe() {
    return {
      "CLONE_FOUND": (payload) => {
        const { clone } = payload;
        console.log(yellow("CLONE_FOUND"));
        console.log(grey3(JSON.stringify(clone, null, "	")));
      },
      "CLONE_SKIPPED": (payload) => {
        const { validation } = payload;
        console.log(yellow("CLONE_SKIPPED"));
        console.log(
          grey3("Clone skipped: " + validation?.message?.join(" "))
        );
      },
      "START_DETECTION": (payload) => {
        const { source } = payload;
        console.log(yellow("START_DETECTION"));
        console.log(
          grey3("Start detection for source id=" + source?.getId() + " format=" + source?.getFormat())
        );
      }
    };
  }
};

// src/reporters/console.ts
import { bold as bold2, grey as grey4 } from "colors/safe";
var Table = __require("cli-table3");
var ConsoleReporter = class {
  options;
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
      table.push(convertStatisticToArray(bold2("Total:"), statistic.total));
      console.log(table.toString());
      console.log(grey4(`Found ${clones.length} clones.`));
    }
  }
};

// src/reporters/console-full.ts
import { grey as grey5 } from "colors/safe";
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
    console.log(grey5(`Found ${clones.length} clones.`));
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
import { ensureDirSync, writeFileSync } from "fs-extra";
import { getOption as getOption3 } from "@jscpd/core";
import { green as green2 } from "colors/safe";
import { join } from "path";
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
    ensureDirSync(getOption3("output", this.options));
    writeFileSync(getOption3("output", this.options) + "/jscpd-report.json", JSON.stringify(json, null, "  "));
    console.log(green2(`JSON report saved to ${join(this.options.output, "jscpd-report.json")}`));
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
import { getOption as getOption4 } from "@jscpd/core";
import { ensureDirSync as ensureDirSync2, writeFileSync as writeFileSync2 } from "fs-extra";
import { green as green3 } from "colors/safe";
import { join as join2 } from "path";
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
    ensureDirSync2(getOption4("output", this.options));
    writeFileSync2(getOption4("output", this.options) + "/jscpd-report.csv", report);
    console.log(green3(`CSV report saved to ${join2(this.options?.output, "jscpd-report.csv")}`));
  }
};

// src/reporters/markdown.ts
import { getOption as getOption5 } from "@jscpd/core";
import { ensureDirSync as ensureDirSync3, writeFileSync as writeFileSync3 } from "fs-extra";
import { green as green4 } from "colors/safe";
import { join as join3 } from "path";
import markdownTable from "markdown-table";
var MarkdownReporter = class {
  constructor(options) {
    this.options = options;
  }
  report(clones, statistic) {
    const report = `
# Copy/paste detection report

> Duplications detection: Found ${clones.length} exact clones with ${statistic.total.duplicatedLines}(${statistic.total.percentage}%) duplicated lines in ${statistic.total.sources} (${Object.keys(statistic.formats).length} formats) files.

${markdownTable([
      ["Format", "Files analyzed", "Total lines", "Total tokens", "Clones found", "Duplicated lines", "Duplicated tokens"],
      ...Object.keys(statistic.formats).map((format) => convertStatisticToArray(format, statistic.formats[format].total)),
      convertStatisticToArray("Total:", statistic.total).map((item) => `**${item}**`)
    ])}
`;
    ensureDirSync3(getOption5("output", this.options));
    writeFileSync3(getOption5("output", this.options) + "/jscpd-report.md", report);
    console.log(green4(`Markdown report saved to ${join3(this.options.output, "jscpd-report.md")}`));
  }
};

// src/reporters/xml.ts
import { writeFileSync as writeFileSync4 } from "fs";
import { ensureDirSync as ensureDirSync4 } from "fs-extra";
import { getOption as getOption6 } from "@jscpd/core";
import { green as green5 } from "colors/safe";
import { join as join4 } from "path";
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
              <codefragment><![CDATA[${clone.duplicationA.fragment?.replace(/]]>/i, "CDATA_END")}]]></codefragment>
            </file>
            <file path="${escapeXml(getPath(clone.duplicationB.sourceId, this.options))}" line="${clone.duplicationB.start.line}">
              <codefragment><![CDATA[${clone.duplicationB.fragment?.replace(/]]>/i, "CDATA_END")}]]></codefragment>
            </file>
            <codefragment><![CDATA[${clone.duplicationA.fragment?.replace(/]]>/i, "CDATA_END")}]]></codefragment>
        </duplication>
      `;
    });
    xmlDoc += "</pmd-cpd>";
    ensureDirSync4(getOption6("output", this.options));
    writeFileSync4(getOption6("output", this.options) + "/jscpd-report.xml", xmlDoc);
    console.log(green5(`XML report saved to ${join4(this.options.output, "jscpd-report.xml")}`));
  }
};

// src/reporters/silent.ts
import { bold as bold3 } from "colors/safe";
var SilentReporter = class {
  report(clones, statistic) {
    if (statistic) {
      console.log(
        `Duplications detection: Found ${bold3(clones.length.toString())} exact clones with ${bold3(statistic.total.duplicatedLines.toString())}(${statistic.total.percentage}%) duplicated lines in ${bold3(statistic.total.sources.toString())} (${Object.keys(statistic.formats).length} formats) files.`
      );
    }
  }
};

// src/reporters/threshold.ts
import { red as red2 } from "colors/safe";
var ThresholdReporter = class {
  constructor(options) {
    this.options = options;
  }
  // @ts-ignore
  report(clones, statistic) {
    if (statistic && this.options.threshold !== void 0 && this.options.threshold < statistic.total.percentage) {
      const message = `ERROR: jscpd found too many duplicates (${statistic.total.percentage}%) over threshold (${this.options.threshold}%)`;
      console.error(red2(message));
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
export {
  BlamerHook,
  CSVReporter,
  ConsoleFullReporter,
  ConsoleReporter,
  FragmentsHook,
  InFilesDetector,
  JsonReporter,
  MarkdownReporter,
  ProgressSubscriber,
  SilentReporter,
  SkipLocalValidator,
  ThresholdReporter,
  VerboseSubscriber,
  XcodeReporter,
  XmlReporter,
  getFilesToDetect,
  parseFormatsExtensions
};
//# sourceMappingURL=index.mjs.map