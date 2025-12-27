import { IOptions, IClone, IStatistic } from '@jscpd/core';
import { IReporter } from '@jscpd/finder';

declare class SarifReporter implements IReporter {
    private options;
    constructor(options: IOptions);
    report(clones: IClone[], statistic: IStatistic): void;
}

export { SarifReporter as default };
