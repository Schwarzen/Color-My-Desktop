"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blamer = void 0;
const git_1 = require("./vcs/git");
class Blamer {
    async blameByFile(path) {
        return this.getVCSBlamer()(path);
    }
    getVCSBlamer() {
        return git_1.git;
    }
}
exports.Blamer = Blamer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JsYW1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBZ0M7QUFFaEMsTUFBYSxNQUFNO0lBQ1YsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFZO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyxZQUFZO1FBQ2xCLE9BQU8sU0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUNGO0FBUkQsd0JBUUMifQ==