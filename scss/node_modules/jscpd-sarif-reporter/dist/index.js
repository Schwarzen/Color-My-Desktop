"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => SarifReporter
});
module.exports = __toCommonJS(src_exports);
var import_path = require("path");
var import_fs_extra = require("fs-extra");
var import_safe = require("colors/safe");
var import_node_sarif_builder = require("node-sarif-builder");
function getSourceLocation(start, end) {
  return `${start.line}:${start.column} - ${end.line}:${end.column}`;
}
var SarifReporter = class {
  constructor(options) {
    this.options = options;
  }
  report(clones, statistic) {
    const url = "https://github.com/kucherenko/jscpd/";
    if (this.options.output) {
      const pkg = (0, import_fs_extra.readJsonSync)((0, import_path.join)(__dirname, "../package.json"));
      const sarifBuilder = new import_node_sarif_builder.SarifBuilder();
      const sarifRunBuilder = new import_node_sarif_builder.SarifRunBuilder().initSimple({
        toolDriverName: "jscpd",
        toolDriverVersion: pkg.version,
        url
      });
      sarifRunBuilder.addRule(
        new import_node_sarif_builder.SarifRuleBuilder().initSimple({
          ruleId: "duplication",
          shortDescriptionText: "Found code duplication",
          helpUri: url
        })
      );
      sarifRunBuilder.addRule(
        new import_node_sarif_builder.SarifRuleBuilder().initSimple({
          ruleId: "duplications-threshold",
          shortDescriptionText: "Level of duplication is too high",
          helpUri: url
        })
      );
      for (const clone of clones) {
        const sarifResultBuilder = new import_node_sarif_builder.SarifResultBuilder();
        sarifRunBuilder.addResult(
          sarifResultBuilder.initSimple(
            {
              // Transcode to a SARIF level:  can be "warning" or "error" or "note"
              level: "warning",
              messageText: `Clone detected in ${clone.format}, - ${clone.duplicationA.sourceId}[${getSourceLocation(clone.duplicationA.start, clone.duplicationA.end)}] and ${clone.duplicationB.sourceId}[${getSourceLocation(clone.duplicationB.start, clone.duplicationB.end)}]`,
              ruleId: "duplication",
              fileUri: clone.duplicationA.sourceId,
              startLine: clone.duplicationA.start.line,
              startColumn: clone.duplicationA.start.column,
              endLine: clone.duplicationA.end.line,
              endColumn: clone.duplicationA.end.column
            }
          )
        );
      }
      if (statistic.total?.percentage >= (this.options.threshold || 100)) {
        const sarifResultBuilderThreshold = new import_node_sarif_builder.SarifResultBuilder();
        sarifRunBuilder.addResult(
          sarifResultBuilderThreshold.initSimple({
            level: "error",
            messageText: `The duplication level (${statistic.total.percentage}%) is bigger than threshold (${this.options.threshold}%)`,
            ruleId: "duplications-threshold"
          })
        );
      }
      const path = (0, import_path.join)(this.options.output, "jscpd-sarif.json");
      sarifBuilder.addRun(sarifRunBuilder);
      const sarifJsonString = sarifBuilder.buildSarifJsonString({ indent: false });
      (0, import_fs_extra.ensureDirSync)(this.options.output);
      (0, import_fs_extra.writeFileSync)(path, sarifJsonString);
      console.log((0, import_safe.green)(`SARIF report saved to ${path}`));
    }
  }
};
//# sourceMappingURL=index.js.map