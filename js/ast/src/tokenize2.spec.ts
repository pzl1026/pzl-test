import * as assert from 'assert';
import { tokenize, TokenKind } from './tokenize2';

let index = 0;

function token(
  value: string,
  type: TokenKind = TokenKind.Literal,
  start = index,
) {
  const v = {
    start: start,
    end: start + value.length,
    value,
    type,
  };
  index = v.end;
  return v;
}

let test1 = {
  name: 'style',
  input: `<div><span></span></div>`,
  tokens: [
    token('div', TokenKind.OpenTag, 1),
    token('', TokenKind.OpenTagEnd),
    token('span', TokenKind.OpenTag, index + 2),
    token('', TokenKind.OpenTagEnd),
    token('span', TokenKind.CloseTag, index + 3),
    token('div', TokenKind.CloseTag, index + 3),
  ],
};

describe('simple cases', () => {
  console.log(tokenize(test1.input), 'iii');

  it(`case test1`, () => {
    assert.deepStrictEqual(tokenize(test1.input), test1.tokens);
  });
});
