'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  language: 'ini',
  init: function init(Prism) {
    Prism.languages.ini = {
      comment: /^[ \t]*;.*$/m,
      selector: /^[ \t]*\[.*?\]/m,
      constant: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m,
      'attr-value': {
        pattern: /=.*/,
        inside: {
          punctuation: /^[=]/
        }
      }
    };
  }
};