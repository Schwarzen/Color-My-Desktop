import { IOptions, IStore, IMapFrame, IClone } from '@jscpd/core';

declare const detectClones: (opts: IOptions, store?: IStore<IMapFrame> | undefined) => Promise<IClone[]>;
declare function jscpd(argv: string[], exitCallback?: (code: number) => {}): Promise<IClone[]>;

export { detectClones, jscpd };
