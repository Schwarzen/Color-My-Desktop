// ../../node_modules/.pnpm/tsup@8.0.2_postcss@8.4.38_ts-node@10.9.2_@types+node@20.12.12_typescript@5.4.5__typescript@5.4.5/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import { join } from "path";
import { ensureDirSync, readJsonSync, writeFileSync } from "fs-extra";
import { green } from "colors/safe";
import { SarifBuilder, SarifResultBuilder, SarifRuleBuilder, SarifRunBuilder } from "node-sarif-builder";
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
      const pkg = readJsonSync(join(__dirname, "../package.json"));
      const sarifBuilder = new SarifBuilder();
      const sarifRunBuilder = new SarifRunBuilder().initSimple({
        toolDriverName: "jscpd",
        toolDriverVersion: pkg.version,
        url
      });
      sarifRunBuilder.addRule(
        new SarifRuleBuilder().initSimple({
          ruleId: "duplication",
          shortDescriptionText: "Found code duplication",
          helpUri: url
        })
      );
      sarifRunBuilder.addRule(
        new SarifRuleBuilder().initSimple({
          ruleId: "duplications-threshold",
          shortDescriptionText: "Level of duplication is too high",
          helpUri: url
        })
      );
      for (const clone of clones) {
        const sarifResultBuilder = new SarifResultBuilder();
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
        const sarifResultBuilderThreshold = new SarifResultBuilder();
        sarifRunBuilder.addResult(
          sarifResultBuilderThreshold.initSimple({
            level: "error",
            messageText: `The duplication level (${statistic.total.percentage}%) is bigger than threshold (${this.options.threshold}%)`,
            ruleId: "duplications-threshold"
          })
        );
      }
      const path2 = join(this.options.output, "jscpd-sarif.json");
      sarifBuilder.addRun(sarifRunBuilder);
      const sarifJsonString = sarifBuilder.buildSarifJsonString({ indent: false });
      ensureDirSync(this.options.output);
      writeFileSync(path2, sarifJsonString);
      console.log(green(`SARIF report saved to ${path2}`));
    }
  }
};
export {
  SarifReporter as default
};
//# sourceMappingURL=index.mjs.map