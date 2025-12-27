export interface BlamedLine {
    rev: string;
    author: string;
    date: string;
    line: string;
}
export interface BlameResult {
    [path: string]: {
        [line: string]: BlamedLine;
    };
}
