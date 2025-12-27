import { ITokensMap, IMapFrame, IToken, IOptions, ITokenizer } from '@jscpd/core';

interface IFormatMeta {
    exts: string[];
    parent?: string;
}

interface ISourceOptions {
    id: string;
    format: string;
    source?: string;
    isNew?: boolean;
    detectionDate?: number;
    lastUpdateDate?: number;
    lines?: number;
    range?: number[];
}

declare class TokensMap implements ITokensMap, Iterator<IMapFrame | boolean>, Iterable<IMapFrame | boolean> {
    private readonly id;
    private readonly data;
    private readonly tokens;
    private readonly format;
    private readonly options;
    private position;
    private hashMap;
    constructor(id: string, data: string, tokens: IToken[], format: string, options: any);
    getTokensCount(): number;
    getId(): string;
    getLinesCount(): number;
    getFormat(): string;
    [Symbol.iterator](): Iterator<IMapFrame | boolean>;
    next(): IteratorResult<IMapFrame | boolean>;
}
declare function generateMapsForFormats(id: string, data: string, tokens: IToken[], options: any): TokensMap[];
declare function createTokensMaps(id: string, data: string, tokens: IToken[], options: any): TokensMap[];

declare function tokenize(code: string, language: string): IToken[];
declare function createTokenMapBasedOnCode(id: string, data: string, format: string, options?: Partial<IOptions>): TokensMap[];

declare const FORMATS: {
    [key: string]: IFormatMeta;
};
declare function getSupportedFormats(): string[];
declare function getFormatByFile(path: string, formatsExts?: {
    [key: string]: string[];
}): string | undefined;

declare class Tokenizer implements ITokenizer {
    generateMaps(id: string, data: string, format: string, options: Partial<IOptions>): ITokensMap[];
}

export { FORMATS, type IFormatMeta, type ISourceOptions, Tokenizer, TokensMap, createTokenMapBasedOnCode, createTokensMaps, generateMapsForFormats, getFormatByFile, getSupportedFormats, tokenize };
