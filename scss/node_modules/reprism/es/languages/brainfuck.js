'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  language: 'brainfuck',
  init: function init(Prism) {
    Prism.languages.brainfuck = {
      pointer: {
        pattern: /<|>/,
        alias: 'keyword'
      },
      increment: {
        pattern: /\+/,
        alias: 'inserted'
      },
      decrement: {
        pattern: /-/,
        alias: 'deleted'
      },
      branching: {
        pattern: /\[|\]/,
        alias: 'important'
      },
      operator: /[.,]/,
      comment: /\S+/
    };
  }
};