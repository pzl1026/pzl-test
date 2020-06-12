import * as assert from 'assert';
import { tokenize, TokenKind } from './tokenize2';
var index = 0;
function token(value, type, start) {
  if (type === void 0) {
    type = TokenKind.Literal;
  }
  if (start === void 0) {
    start = index;
  }
  var v = {
    start: start,
    end: start + value.length,
    value: value,
    type: type,
  };
  index = v.end;
  return v;
}
var test1 = {
  name: 'style',
  input: '<div><span></span></div>',
  tokens: [
    token('div', TokenKind.OpenTag, 1),
    token('', TokenKind.OpenTagEnd),
    token('span', TokenKind.OpenTag, index + 2),
    token('', TokenKind.OpenTagEnd),
    token('span', TokenKind.CloseTag, index + 3),
    token('div', TokenKind.CloseTag, index + 3),
  ],
};
describe('simple cases', function() {
  console.log(tokenize(test1.input), 'iii');
  it('case test1', function() {
    assert.deepStrictEqual(tokenize(test1.input), test1.tokens);
  });
});
//# sourceMappingURL=tokenize2.spec.js.map
