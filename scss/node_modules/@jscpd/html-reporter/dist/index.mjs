// ../../node_modules/.pnpm/tsup@8.0.2_postcss@8.4.38_ts-node@10.9.2_@types+node@20.12.12_typescript@5.4.5__typescript@5.4.5/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import { join } from "path";
import { JsonReporter } from "@jscpd/finder";
import { copySync, writeFileSync } from "fs-extra";
import { green, red } from "colors/safe";
import * as pug from "pug";
var HtmlReporter = class {
  constructor(options) {
    this.options = options;
  }
  report(clones, statistic) {
    const jsonReporter = new JsonReporter(this.options);
    const json = jsonReporter.generateJson(clones, statistic);
    const result = pug.renderFile(join(__dirname, "./templates/main.pug"), json);
    if (this.options.output) {
      const destination = join(this.options.output, "html/");
      try {
        copySync(join(__dirname, "../public"), destination, { overwrite: true });
        const index = join(destination, "index.html");
        writeFileSync(index, result);
        writeFileSync(
          join(destination, "jscpd-report.json"),
          JSON.stringify(json, null, "  ")
        );
        console.log(green(`HTML report saved to ${join(this.options.output, "html/")}`));
      } catch (e) {
        console.log(red(e));
      }
    }
  }
};
export {
  HtmlReporter as default
};
//# sourceMappingURL=index.mjs.map