'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  language: 'arff',
  init: function init(Prism) {
    Prism.languages.arff = {
      comment: /%.*/,
      string: {
        pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      keyword: /@(?:attribute|data|end|relation)\b/i,
      number: /\b\d+(?:\.\d+)?\b/,
      punctuation: /[{},]/
    };
  }
};