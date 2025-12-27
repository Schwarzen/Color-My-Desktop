import { BlameResult } from './blame-result.interface';
export declare class Blamer {
    blameByFile(path: string): Promise<BlameResult>;
    private getVCSBlamer;
}
