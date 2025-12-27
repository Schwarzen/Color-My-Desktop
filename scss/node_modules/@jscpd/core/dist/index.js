"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class; var _class2;// src/validators/lines-length-clone.validator.ts
var LinesLengthCloneValidator = class {
  validate(clone, options) {
    const lines = clone.duplicationA.end.line - clone.duplicationA.start.line;
    const status = lines >= Number(_optionalChain([options, 'optionalAccess', _ => _.minLines]));
    return {
      status,
      message: status ? ["ok"] : [`Lines of code less than limit (${lines} < ${options.minLines})`]
    };
  }
};

// src/validators/validator.ts
function runCloneValidators(clone, options, validators) {
  return validators.reduce((acc, validator) => {
    const res = validator.validate(clone, options);
    return {
      ...acc,
      status: res.status && acc.status,
      message: res.message ? [...acc.message, ...res.message] : acc.message
    };
  }, { status: true, message: [], clone });
}

// src/rabin-karp.ts
var RabinKarp = class _RabinKarp {
  constructor(options, eventEmitter, cloneValidators) {
    this.options = options;
    this.eventEmitter = eventEmitter;
    this.cloneValidators = cloneValidators;
  }
  async run(tokenMap, store) {
    return new Promise((resolve) => {
      let mapFrameInStore;
      let clone = null;
      const clones = [];
      const loop = () => {
        const iteration = tokenMap.next();
        store.get(iteration.value.id).then(
          (mapFrameFromStore) => {
            mapFrameInStore = mapFrameFromStore;
            if (!clone) {
              clone = _RabinKarp.createClone(tokenMap.getFormat(), iteration.value, mapFrameInStore);
            }
          },
          () => {
            if (clone && this.validate(clone)) {
              clones.push(clone);
            }
            clone = null;
            if (iteration.value.id) {
              return store.set(iteration.value.id, iteration.value);
            }
          }
        ).finally(() => {
          if (!iteration.done) {
            if (clone) {
              clone = _RabinKarp.enlargeClone(clone, iteration.value, mapFrameInStore);
            }
            loop();
          } else {
            resolve(clones);
          }
        });
      };
      loop();
    });
  }
  validate(clone) {
    const validation = runCloneValidators(clone, this.options, this.cloneValidators);
    if (validation.status) {
      this.eventEmitter.emit("CLONE_FOUND", { clone });
    } else {
      this.eventEmitter.emit("CLONE_SKIPPED", { clone, validation });
    }
    return validation.status;
  }
  static createClone(format, mapFrameA, mapFrameB) {
    return {
      format,
      foundDate: (/* @__PURE__ */ new Date()).getTime(),
      duplicationA: {
        sourceId: mapFrameA.sourceId,
        start: _optionalChain([mapFrameA, 'optionalAccess', _2 => _2.start, 'optionalAccess', _3 => _3.loc, 'optionalAccess', _4 => _4.start]),
        end: _optionalChain([mapFrameA, 'optionalAccess', _5 => _5.end, 'optionalAccess', _6 => _6.loc, 'optionalAccess', _7 => _7.end]),
        range: [mapFrameA.start.range[0], mapFrameA.end.range[1]]
      },
      duplicationB: {
        sourceId: mapFrameB.sourceId,
        start: _optionalChain([mapFrameB, 'optionalAccess', _8 => _8.start, 'optionalAccess', _9 => _9.loc, 'optionalAccess', _10 => _10.start]),
        end: _optionalChain([mapFrameB, 'optionalAccess', _11 => _11.end, 'optionalAccess', _12 => _12.loc, 'optionalAccess', _13 => _13.end]),
        range: [mapFrameB.start.range[0], mapFrameB.end.range[1]]
      }
    };
  }
  static enlargeClone(clone, mapFrameA, mapFrameB) {
    clone.duplicationA.range[1] = mapFrameA.end.range[1];
    clone.duplicationA.end = _optionalChain([mapFrameA, 'optionalAccess', _14 => _14.end, 'optionalAccess', _15 => _15.loc, 'optionalAccess', _16 => _16.end]);
    clone.duplicationB.range[1] = mapFrameB.end.range[1];
    clone.duplicationB.end = _optionalChain([mapFrameB, 'optionalAccess', _17 => _17.end, 'optionalAccess', _18 => _18.loc, 'optionalAccess', _19 => _19.end]);
    return clone;
  }
};

// src/mode.ts
function strict(token) {
  return token.type !== "ignore";
}
function mild(token) {
  return strict(token) && token.type !== "empty" && token.type !== "new_line";
}
function weak(token) {
  return mild(token) && token.format !== "comment" && token.type !== "comment" && token.type !== "block-comment";
}
var MODES = {
  mild,
  strict,
  weak
};
function getModeByName(name) {
  if (name in MODES) {
    return MODES[name];
  }
  throw new Error(`Mode ${name} does not supported yet.`);
}
function getModeHandler(mode) {
  return typeof mode === "string" ? getModeByName(mode) : mode;
}

// src/detector.ts
var _eventemitter3 = require('eventemitter3'); var _eventemitter32 = _interopRequireDefault(_eventemitter3);
var Detector = class extends _eventemitter32.default {
  constructor(tokenizer, store, cloneValidators = [], options) {
    super();
    this.tokenizer = tokenizer;
    this.store = store;
    this.cloneValidators = cloneValidators;
    this.options = options;
    this.initCloneValidators();
    this.algorithm = new RabinKarp(this.options, this, this.cloneValidators);
    this.options.minTokens = this.options.minTokens || 50;
    this.options.maxLines = this.options.maxLines || 500;
    this.options.minLines = this.options.minLines || 5;
    this.options.mode = this.options.mode || mild;
  }
  
  async detect(id, text, format) {
    const tokenMaps = this.tokenizer.generateMaps(id, text, format, this.options);
    this.store.namespace(format);
    const detect = async (tokenMap, clones) => {
      if (tokenMap) {
        this.emit("START_DETECTION", { source: tokenMap });
        return this.algorithm.run(tokenMap, this.store).then((clns) => {
          clones.push(...clns);
          const nextTokenMap = tokenMaps.pop();
          if (nextTokenMap) {
            return detect(nextTokenMap, clones);
          } else {
            return clones;
          }
        });
      }
    };
    const currentTokensMap = tokenMaps.pop();
    return currentTokensMap ? detect(currentTokensMap, []) : [];
  }
  initCloneValidators() {
    if (this.options.minLines || this.options.maxLines) {
      this.cloneValidators.push(new LinesLengthCloneValidator());
    }
  }
};

// src/options.ts
function getDefaultOptions() {
  return {
    executionId: (/* @__PURE__ */ new Date()).toISOString(),
    path: [process.cwd()],
    mode: getModeHandler("mild"),
    minLines: 5,
    maxLines: 1e3,
    maxSize: "100kb",
    minTokens: 50,
    output: "./report",
    reporters: ["console"],
    ignore: [],
    threshold: void 0,
    formatsExts: {},
    debug: false,
    silent: false,
    blame: false,
    cache: true,
    absolute: false,
    noSymlinks: false,
    skipLocal: false,
    ignoreCase: false,
    gitignore: false,
    reportersOptions: {},
    exitCode: 0
  };
}
function getOption(name, options) {
  const defaultOptions = getDefaultOptions();
  return options ? options[name] || defaultOptions[name] : defaultOptions[name];
}

// src/statistic.ts
var Statistic = (_class = class _Statistic {constructor() { _class.prototype.__init.call(this); }
  static getDefaultStatistic() {
    return {
      lines: 0,
      tokens: 0,
      sources: 0,
      clones: 0,
      duplicatedLines: 0,
      duplicatedTokens: 0,
      percentage: 0,
      percentageTokens: 0,
      newDuplicatedLines: 0,
      newClones: 0
    };
  }
  __init() {this.statistic = {
    detectionDate: (/* @__PURE__ */ new Date()).toISOString(),
    formats: {},
    total: _Statistic.getDefaultStatistic()
  }}
  subscribe() {
    return {
      CLONE_FOUND: this.cloneFound.bind(this),
      START_DETECTION: this.matchSource.bind(this)
    };
  }
  getStatistic() {
    return this.statistic;
  }
  cloneFound(payload) {
    const { clone } = payload;
    const id = clone.duplicationA.sourceId;
    const id2 = clone.duplicationB.sourceId;
    const linesCount = clone.duplicationA.end.line - clone.duplicationA.start.line;
    const duplicatedTokens = clone.duplicationA.end.position - clone.duplicationA.start.position;
    this.statistic.total.clones++;
    this.statistic.total.duplicatedLines += linesCount;
    this.statistic.total.duplicatedTokens += duplicatedTokens;
    this.statistic.formats[clone.format].total.clones++;
    this.statistic.formats[clone.format].total.duplicatedLines += linesCount;
    this.statistic.formats[clone.format].total.duplicatedTokens += duplicatedTokens;
    this.statistic.formats[clone.format].sources[id].clones++;
    this.statistic.formats[clone.format].sources[id].duplicatedLines += linesCount;
    this.statistic.formats[clone.format].sources[id].duplicatedTokens += duplicatedTokens;
    this.statistic.formats[clone.format].sources[id2].clones++;
    this.statistic.formats[clone.format].sources[id2].duplicatedLines += linesCount;
    this.statistic.formats[clone.format].sources[id2].duplicatedTokens += duplicatedTokens;
    this.updatePercentage(clone.format);
  }
  matchSource(payload) {
    const { source } = payload;
    const format = source.getFormat();
    if (!(format in this.statistic.formats)) {
      this.statistic.formats[format] = {
        sources: {},
        total: _Statistic.getDefaultStatistic()
      };
    }
    this.statistic.total.sources++;
    this.statistic.total.lines += source.getLinesCount();
    this.statistic.total.tokens += source.getTokensCount();
    this.statistic.formats[format].total.sources++;
    this.statistic.formats[format].total.lines += source.getLinesCount();
    this.statistic.formats[format].total.tokens += source.getTokensCount();
    this.statistic.formats[format].sources[source.getId()] = this.statistic.formats[format].sources[source.getId()] || _Statistic.getDefaultStatistic();
    this.statistic.formats[format].sources[source.getId()].sources = 1;
    this.statistic.formats[format].sources[source.getId()].lines += source.getLinesCount();
    this.statistic.formats[format].sources[source.getId()].tokens += source.getTokensCount();
    this.updatePercentage(format);
  }
  updatePercentage(format) {
    this.statistic.total.percentage = _Statistic.calculatePercentage(
      this.statistic.total.lines,
      this.statistic.total.duplicatedLines
    );
    this.statistic.total.percentageTokens = _Statistic.calculatePercentage(
      this.statistic.total.tokens,
      this.statistic.total.duplicatedTokens
    );
    this.statistic.formats[format].total.percentage = _Statistic.calculatePercentage(
      this.statistic.formats[format].total.lines,
      this.statistic.formats[format].total.duplicatedLines
    );
    this.statistic.formats[format].total.percentageTokens = _Statistic.calculatePercentage(
      this.statistic.formats[format].total.tokens,
      this.statistic.formats[format].total.duplicatedTokens
    );
    Object.entries(this.statistic.formats[format].sources).forEach(([id, stat]) => {
      this.statistic.formats[format].sources[id].percentage = _Statistic.calculatePercentage(
        stat.lines,
        stat.duplicatedLines
      );
      this.statistic.formats[format].sources[id].percentageTokens = _Statistic.calculatePercentage(
        stat.tokens,
        stat.duplicatedTokens
      );
    });
  }
  static calculatePercentage(total, cloned) {
    return total ? Math.round(1e4 * cloned / total) / 100 : 0;
  }
}, _class);

// src/store/memory.ts
var MemoryStore = (_class2 = class {constructor() { _class2.prototype.__init2.call(this);_class2.prototype.__init3.call(this); }
  __init2() {this._namespace = ""}
  __init3() {this.values = {}}
  namespace(namespace) {
    this._namespace = namespace;
    this.values[namespace] = this.values[namespace] || {};
  }
  get(key) {
    return new Promise((resolve, reject) => {
      if (key in this.values[this._namespace]) {
        resolve(this.values[this._namespace][key]);
      } else {
        reject(new Error("not found"));
      }
    });
  }
  set(key, value) {
    this.values[this._namespace][key] = value;
    return Promise.resolve(value);
  }
  close() {
    this.values = {};
  }
}, _class2);











exports.Detector = Detector; exports.MemoryStore = MemoryStore; exports.Statistic = Statistic; exports.getDefaultOptions = getDefaultOptions; exports.getModeByName = getModeByName; exports.getModeHandler = getModeHandler; exports.getOption = getOption; exports.mild = mild; exports.strict = strict; exports.weak = weak;
//# sourceMappingURL=index.js.map