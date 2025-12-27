import { IClone, IStatistic, IOptions, ITokenizer, IStore, IMapFrame, Statistic, ISubscriber, IBlamedLines, DetectorEvents, IHandler, ITokenLocation, ICloneValidator, IValidationResult } from '@jscpd/core';
import { Entry } from 'fast-glob';

interface EntryWithContent extends Entry {
    content: string;
}

interface IHook {
    process(clones: IClone[]): Promise<IClone[]>;
}

interface IReporter {
    report(clones: IClone[], statistic: IStatistic | undefined): void;
}

declare class InFilesDetector {
    private readonly tokenizer;
    private readonly store;
    private readonly statistic;
    readonly options: IOptions;
    private readonly reporters;
    private readonly subscribes;
    private readonly postHooks;
    constructor(tokenizer: ITokenizer, store: IStore<IMapFrame>, statistic: Statistic, options: IOptions);
    registerReporter(reporter: IReporter): void;
    registerSubscriber(subscriber: ISubscriber): void;
    registerHook(hook: IHook): void;
    detect(fls: EntryWithContent[]): Promise<IClone[]>;
}

declare function getFilesToDetect(options: IOptions): EntryWithContent[];

declare class BlamerHook implements IHook {
    process(clones: IClone[]): Promise<IClone[]>;
    static blameLines(clone: IClone): Promise<IClone>;
    static getBlamedLines(blamedFiles: Record<string, IBlamedLines>, start: number, end: number): IBlamedLines;
}

declare class FragmentsHook implements IHook {
    process(clones: IClone[]): Promise<IClone[]>;
    static addFragments(clone: IClone): IClone;
}

declare class ProgressSubscriber implements ISubscriber {
    private readonly options;
    constructor(options: IOptions);
    subscribe(): Partial<Record<DetectorEvents, IHandler>>;
}

declare class VerboseSubscriber implements ISubscriber {
    protected options: IOptions;
    constructor(options: IOptions);
    subscribe(): Partial<Record<DetectorEvents, IHandler>>;
}

declare class ConsoleReporter implements IReporter {
    private readonly options;
    constructor(options: IOptions);
    report(clones: IClone[], statistic?: IStatistic | undefined): void;
}

declare class ConsoleFullReporter implements IReporter {
    private readonly options;
    constructor(options: IOptions);
    report(clones: IClone[]): void;
    private cloneFullFound;
}

interface IDuplication {
    format: string;
    lines: number;
    tokens: number;
    firstFile: {
        name: string;
        start: number;
        end: number;
        startLoc: ITokenLocation;
        endLoc: ITokenLocation;
        blame?: IBlamedLines;
    };
    secondFile: {
        name: string;
        start: number;
        end: number;
        startLoc: ITokenLocation;
        endLoc: ITokenLocation;
        blame?: IBlamedLines;
    };
    fragment: string;
}
interface IJsonReport {
    duplicates: IDuplication[];
    statistics: IStatistic;
}
declare class JsonReporter implements IReporter {
    private options;
    constructor(options: IOptions);
    generateJson(clones: IClone[], statistics: IStatistic): IJsonReport;
    report(clones: IClone[], statistic: IStatistic): void;
    private cloneFound;
}

declare class CSVReporter implements IReporter {
    private options;
    constructor(options: IOptions);
    report(clones: IClone[], statistic: IStatistic | undefined): void;
}

declare class MarkdownReporter implements IReporter {
    private options;
    constructor(options: IOptions);
    report(clones: IClone[], statistic: IStatistic | undefined): void;
}

declare class XmlReporter implements IReporter {
    private options;
    constructor(options: IOptions);
    report(clones: IClone[]): void;
}

declare class SilentReporter implements IReporter {
    report(clones: IClone[], statistic: IStatistic): void;
}

declare class ThresholdReporter implements IReporter {
    private options;
    constructor(options: IOptions);
    report(clones: IClone[], statistic: IStatistic | undefined): void;
}

declare class XcodeReporter implements IReporter {
    private readonly options;
    constructor(options: IOptions);
    report(clones: IClone[]): void;
    private cloneFound;
}

declare class SkipLocalValidator implements ICloneValidator {
    validate(clone: IClone, options: IOptions): IValidationResult;
    shouldSkipClone(clone: IClone, options: IOptions): boolean;
    private static isRelative;
}

declare function parseFormatsExtensions(extensions?: string): {
    [key: string]: string[];
} | undefined;

export { BlamerHook, CSVReporter, ConsoleFullReporter, ConsoleReporter, type EntryWithContent, FragmentsHook, type IHook, type IReporter, InFilesDetector, JsonReporter, MarkdownReporter, ProgressSubscriber, SilentReporter, SkipLocalValidator, ThresholdReporter, VerboseSubscriber, XcodeReporter, XmlReporter, getFilesToDetect, parseFormatsExtensions };
