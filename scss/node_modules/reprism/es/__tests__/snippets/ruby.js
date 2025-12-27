"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "# Pick a random number.\nrno = rand(100) + 1\nprint \"Your magic number is \", rno, \"\n\"\n\n# Perform all sort of totally uselss test on it and report the results.\nif rno % 2 == 1 then\n    print \"Ooooh, that's an odd number.\n\"\nelse\n    print \"That's an even number.\n\"\n    if rno > 2 then\n        print \"It's not prime, BTW.\n\"\n    end\nend\n\nif rno > 50\n    print \"That's more than half as big as it could be!\n\"\nelsif rno == 42\n    print \"That's the ultimate magic number!!!!\n\"\nelsif rno < 10\n    print \"That's pretty small, actually.\n\"\nelse\n    print \"What a boring number.\n\"\nend\n\nif rno == 100 then print \"Gosh, you've maxxed out!\n\" end";