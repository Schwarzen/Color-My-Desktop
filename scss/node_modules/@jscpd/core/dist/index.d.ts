import EventEmitter from 'eventemitter3';

interface IClone {
    format: string;
    isNew?: boolean;
    foundDate?: number;
    duplicationA: {
        sourceId: string;
        start: ITokenLocation;
        end: ITokenLocation;
        range: [number, number];
        fragment?: string;
        blame?: IBlamedLines;
    };
    duplicationB: {
        sourceId: string;
        start: ITokenLocation;
        end: ITokenLocation;
        range: [number, number];
        fragment?: string;
        blame?: IBlamedLines;
    };
}

interface IOptions {
    executionId?: string;
    minLines?: number;
    maxLines?: number;
    maxSize?: string;
    minTokens?: number;
    threshold?: number;
    formatsExts?: Record<string, string[]>;
    output?: string;
    path?: string[];
    pattern?: string;
    ignorePattern?: string[];
    mode?: any;
    config?: string;
    ignore?: string[];
    format?: string[];
    store?: string;
    reporters?: string[];
    listeners?: string[];
    blame?: boolean;
    cache?: boolean;
    silent?: boolean;
    debug?: boolean;
    verbose?: boolean;
    list?: boolean;
    absolute?: boolean;
    noSymlinks?: boolean;
    skipLocal?: boolean;
    ignoreCase?: boolean;
    gitignore?: boolean;
    reportersOptions?: Record<string, any>;
    tokensToSkip?: string[];
    hashFunction?: (value: string) => string;
    exitCode?: number;
}
type TOption = keyof IOptions;

interface IStatisticRow {
    lines: number;
    tokens: number;
    sources: number;
    duplicatedLines: number;
    duplicatedTokens: number;
    clones: number;
    percentage: number;
    percentageTokens: number;
    newDuplicatedLines: number;
    newClones: number;
}
interface IStatisticFormat {
    sources: Record<string, IStatisticRow>;
    total: IStatisticRow;
}
interface IStatistic {
    total: IStatisticRow;
    detectionDate: string;
    formats: Record<string, IStatisticFormat>;
}

interface ISubscriber {
    subscribe(): Partial<Record<DetectorEvents, IHandler>>;
}
interface IHandler {
    (payload: IEventPayload): void;
}
interface IEventPayload {
    clone?: IClone;
    source?: ITokensMap;
    validation?: IValidationResult;
}

interface IStore<TValue> {
    namespace(name: string): void;
    get(key: string): Promise<TValue>;
    set(key: string, value: TValue): Promise<TValue>;
    close(): void;
}

interface IBlamedLines {
    [line: string]: {
        rev: string;
        author: string;
        date: string;
        line: string;
    };
}

interface ICloneValidator {
    validate(clone: IClone, options: IOptions): IValidationResult;
}

interface IValidationResult {
    status: boolean;
    message?: string[];
    clone?: IClone;
}

interface IToken {
    type: string;
    value: string;
    length: number;
    format: string;
    range: [number, number];
    loc?: {
        start: ITokenLocation;
        end: ITokenLocation;
    };
}

interface ITokenLocation {
    line: number;
    column?: number;
    position?: number;
}

interface IMapFrame {
    id: string;
    sourceId: string;
    start: IToken;
    end: IToken;
    isClone?: boolean;
    localDuplicate?: boolean;
}

interface ITokensMap {
    getFormat(): string;
    getLinesCount(): number;
    getTokensCount(): number;
    getId(): string;
    next(): IteratorResult<IMapFrame | boolean>;
}

interface ITokenizer {
    generateMaps(id: string, data: string, format: string, options: Partial<IOptions>): ITokensMap[];
}

type DetectorEvents = 'CLONE_FOUND' | 'CLONE_SKIPPED' | 'START_DETECTION';
declare class Detector extends EventEmitter<DetectorEvents> {
    private readonly tokenizer;
    private readonly store;
    private readonly cloneValidators;
    private readonly options;
    private algorithm;
    constructor(tokenizer: ITokenizer, store: IStore<IMapFrame>, cloneValidators: ICloneValidator[], options: IOptions);
    detect(id: string, text: string, format: string): Promise<IClone[]>;
    private initCloneValidators;
}

type IMode = (token: IToken, options?: IOptions) => boolean;
declare function strict(token: IToken): boolean;
declare function mild(token: IToken): boolean;
declare function weak(token: IToken): boolean;
declare function getModeByName(name: string): IMode;
declare function getModeHandler(mode: string | IMode): IMode;

declare function getDefaultOptions(): IOptions;
declare function getOption(name: TOption, options?: IOptions): any;

declare class Statistic implements ISubscriber {
    private static getDefaultStatistic;
    private statistic;
    subscribe(): Partial<Record<DetectorEvents, IHandler>>;
    getStatistic(): IStatistic;
    private cloneFound;
    private matchSource;
    private updatePercentage;
    private static calculatePercentage;
}

declare class MemoryStore<IMapFrame> implements IStore<IMapFrame> {
    private _namespace;
    protected values: Record<string, Record<string, IMapFrame>>;
    namespace(namespace: string): void;
    get(key: string): Promise<IMapFrame>;
    set(key: string, value: IMapFrame): Promise<IMapFrame>;
    close(): void;
}

export { Detector, type DetectorEvents, type IBlamedLines, type IClone, type ICloneValidator, type IEventPayload, type IHandler, type IMapFrame, type IMode, type IOptions, type IStatistic, type IStatisticFormat, type IStatisticRow, type IStore, type ISubscriber, type IToken, type ITokenLocation, type ITokenizer, type ITokensMap, type IValidationResult, MemoryStore, Statistic, type TOption, getDefaultOptions, getModeByName, getModeHandler, getOption, mild, strict, weak };
