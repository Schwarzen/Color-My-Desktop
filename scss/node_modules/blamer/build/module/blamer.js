import { git } from './vcs/git';
export class Blamer {
    async blameByFile(path) {
        return this.getVCSBlamer()(path);
    }
    getVCSBlamer() {
        return git;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JsYW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRWhDLE1BQU0sT0FBTyxNQUFNO0lBQ1YsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFZO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyxZQUFZO1FBQ2xCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUNGIn0=