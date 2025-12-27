import { IOptions, IClone, IStatistic } from '@jscpd/core';
import { IReporter } from '@jscpd/finder';

declare class HtmlReporter implements IReporter {
    private options;
    constructor(options: IOptions);
    report(clones: IClone[], statistic: IStatistic): void;
}

export { HtmlReporter as default };
