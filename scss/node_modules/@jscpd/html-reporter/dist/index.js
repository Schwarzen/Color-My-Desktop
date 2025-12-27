"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => HtmlReporter
});
module.exports = __toCommonJS(src_exports);
var import_path = require("path");
var import_finder = require("@jscpd/finder");
var import_fs_extra = require("fs-extra");
var import_safe = require("colors/safe");
var pug = __toESM(require("pug"));
var HtmlReporter = class {
  constructor(options) {
    this.options = options;
  }
  report(clones, statistic) {
    const jsonReporter = new import_finder.JsonReporter(this.options);
    const json = jsonReporter.generateJson(clones, statistic);
    const result = pug.renderFile((0, import_path.join)(__dirname, "./templates/main.pug"), json);
    if (this.options.output) {
      const destination = (0, import_path.join)(this.options.output, "html/");
      try {
        (0, import_fs_extra.copySync)((0, import_path.join)(__dirname, "../public"), destination, { overwrite: true });
        const index = (0, import_path.join)(destination, "index.html");
        (0, import_fs_extra.writeFileSync)(index, result);
        (0, import_fs_extra.writeFileSync)(
          (0, import_path.join)(destination, "jscpd-report.json"),
          JSON.stringify(json, null, "  ")
        );
        console.log((0, import_safe.green)(`HTML report saved to ${(0, import_path.join)(this.options.output, "html/")}`));
      } catch (e) {
        console.log((0, import_safe.red)(e));
      }
    }
  }
};
//# sourceMappingURL=index.js.map