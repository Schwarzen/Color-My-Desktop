'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  language: 'properties',
  init: function init(Prism) {
    Prism.languages.properties = {
      comment: /^[ \t]*[#!].*$/m,
      'attr-value': {
        pattern: /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?: *[=:] *| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,
        lookbehind: true
      },
      'attr-name': /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?= *[=:] *| )/m,
      punctuation: /[=:]/
    };
  }
};