/*!
 *
 * Copyright 2017 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2017-08-19 14:15:25
 * @version 1.0.0
 * @desc tokenize.spec.ts
 */
import { __values } from 'tslib';
import * as assert from 'assert';
import { tokenize, TokenKind } from './tokenize';
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
var cases = [
  {
    name: 'single Literal',
    input: 'hello',
    tokens: [token('hello', TokenKind.Literal, 0)],
  },
  {
    name: 'Literal end with <',
    input: 'hello<',
    tokens: [token('hello', void 0, 0), token('<')],
  },
  {
    name: 'Literal unexpected <',
    input: 'hello< world',
    tokens: [token('hello', void 0, 0), token('< world')],
  },
  {
    name: 'OpenTag EOF',
    input: '<div',
    tokens: [token('div', TokenKind.OpenTag, 1)],
  },
  {
    name: 'attribute names',
    input: "<div a1 'b2' \"c3\" 'd4'e5 'f6\"' \"g7'\"></div>",
    tokens: [
      token('div', TokenKind.OpenTag, 1),
      token(' ', TokenKind.Whitespace),
      token('a1', TokenKind.AttrValueNq),
      token(' ', TokenKind.Whitespace),
      token("'b2'", TokenKind.AttrValueSq),
      token(' ', TokenKind.Whitespace),
      token('"c3"', TokenKind.AttrValueDq),
      token(' ', TokenKind.Whitespace),
      token("'d4'", TokenKind.AttrValueSq),
      token('e5', TokenKind.AttrValueNq),
      token(' ', TokenKind.Whitespace),
      token("'f6\"'", TokenKind.AttrValueSq),
      token(' ', TokenKind.Whitespace),
      token('"g7\'"', TokenKind.AttrValueDq),
      token('', TokenKind.OpenTagEnd),
      token('div', TokenKind.CloseTag, index + 3),
    ],
  },
  {
    name: 'attribute values',
    input:
      '<div a b= c=1 d e = f = g \'h\'=i "j"k=lmn o=\'pq\' r="st"u>M</div>',
    tokens: [
      token('div', TokenKind.OpenTag, 1),
      token(' ', TokenKind.Whitespace),
      token('a', TokenKind.AttrValueNq),
      token(' ', TokenKind.Whitespace),
      token('b', TokenKind.AttrValueNq),
      token('=', TokenKind.AttrValueEq),
      token(' ', TokenKind.Whitespace),
      token('c', TokenKind.AttrValueNq),
      token('=', TokenKind.AttrValueEq),
      token('1', TokenKind.AttrValueNq),
      token(' ', TokenKind.Whitespace),
      token('d', TokenKind.AttrValueNq),
      token(' ', TokenKind.Whitespace),
      token('e', TokenKind.AttrValueNq),
      token(' ', TokenKind.Whitespace),
      token('=', TokenKind.AttrValueEq),
      token(' ', TokenKind.Whitespace),
      token('f', TokenKind.AttrValueNq),
      token(' ', TokenKind.Whitespace),
      token('=', TokenKind.AttrValueEq),
      token(' ', TokenKind.Whitespace),
      token('g', TokenKind.AttrValueNq),
      token(' ', TokenKind.Whitespace),
      token("'h'", TokenKind.AttrValueSq),
      token('=', TokenKind.AttrValueEq),
      token('i', TokenKind.AttrValueNq),
      token(' ', TokenKind.Whitespace),
      token('"j"', TokenKind.AttrValueDq),
      token('k', TokenKind.AttrValueNq),
      token('=', TokenKind.AttrValueEq),
      token('lmn', TokenKind.AttrValueNq),
      token(' ', TokenKind.Whitespace),
      token('o', TokenKind.AttrValueNq),
      token('=', TokenKind.AttrValueEq),
      token("'pq'", TokenKind.AttrValueSq),
      token(' ', TokenKind.Whitespace),
      token('r', TokenKind.AttrValueNq),
      token('=', TokenKind.AttrValueEq),
      token('"st"', TokenKind.AttrValueDq),
      token('u', TokenKind.AttrValueNq),
      token('', TokenKind.OpenTagEnd),
      token('M', void 0, index + 1),
      token('div', TokenKind.CloseTag, index + 2),
    ],
  },
  {
    name: 'normal doctype',
    input: '<!doctype html>',
    tokens: [
      token('!doctype', TokenKind.OpenTag, 1),
      token(' ', TokenKind.Whitespace),
      token('html', TokenKind.AttrValueNq),
      token('', TokenKind.OpenTagEnd),
    ],
  },
  {
    name: 'unexpected eof end doctype',
    input: '<!doctype',
    tokens: [token('!doctype', TokenKind.OpenTag, 1)],
  },
  {
    name: 'unexpected eof in doctype',
    input: '<!doctyp',
    tokens: [token('!', TokenKind.OpenTag, 1), token('doctyp')],
  },
  {
    name: 'normal comment',
    input: '<!-- hello world -->',
    tokens: [
      token('!--', TokenKind.OpenTag, 1),
      token(' hello world '),
      token('--', TokenKind.OpenTagEnd),
    ],
  },
  {
    name: 'short comment',
    input: '<? hello world ?><!- hello world ->',
    tokens: [
      token('', TokenKind.OpenTag, 1),
      token('? hello world ?'),
      token('', TokenKind.OpenTagEnd),
      token('!', TokenKind.OpenTag, index + 2),
      token('- hello world -'),
      token('', TokenKind.OpenTagEnd),
    ],
  },
  {
    name: 'open tag end',
    input:
      '<a1><b2/><c3 /><d4  /   ><e5    f6/><g7     /h8><i9      /j10/><k11//>',
    tokens: [
      token('a1', TokenKind.OpenTag, 1),
      token('', TokenKind.OpenTagEnd),
      token('b2', TokenKind.OpenTag, index + 2),
      token('/', TokenKind.OpenTagEnd),
      token('c3', TokenKind.OpenTag, index + 2),
      token(' ', TokenKind.Whitespace),
      token('/', TokenKind.OpenTagEnd),
      token('d4', TokenKind.OpenTag, index + 2),
      token('  ', TokenKind.Whitespace),
      token('/', TokenKind.AttrValueNq),
      token('   ', TokenKind.Whitespace),
      token('', TokenKind.OpenTagEnd),
      token('e5', TokenKind.OpenTag, index + 2),
      token('    ', TokenKind.Whitespace),
      token('f6', TokenKind.AttrValueNq),
      token('/', TokenKind.OpenTagEnd),
      token('g7', TokenKind.OpenTag, index + 2),
      token('     ', TokenKind.Whitespace),
      token('/', TokenKind.AttrValueNq),
      token('h8', TokenKind.AttrValueNq),
      token('', TokenKind.OpenTagEnd),
      token('i9', TokenKind.OpenTag, index + 2),
      token('      ', TokenKind.Whitespace),
      token('/', TokenKind.AttrValueNq),
      token('j10', TokenKind.AttrValueNq),
      token('/', TokenKind.OpenTagEnd),
      token('k11', TokenKind.OpenTag, index + 2),
      token('/', TokenKind.AttrValueNq),
      token('/', TokenKind.OpenTagEnd),
    ],
  },
  {
    name: 'close tag',
    input: '</div></ div >',
    tokens: [
      token('div', TokenKind.CloseTag, 2),
      token(' div ', TokenKind.CloseTag, index + 3),
    ],
  },
  {
    name: 'special normal comment',
    input: '<!---- - -- ---->',
    tokens: [
      token('!--', TokenKind.OpenTag, 1),
      token('-- '),
      token('- '),
      token('-- '),
      token('-'),
      token('-'),
      token('--', TokenKind.OpenTagEnd),
    ],
  },
  {
    name: 'script',
    input: '<script></div></script</script >',
    tokens: [
      token('script', TokenKind.OpenTag, 1),
      token('', TokenKind.OpenTagEnd),
      token('</div>', TokenKind.Literal, index + 1),
      token('</script'),
      token('script ', TokenKind.CloseTag, index + 2),
    ],
  },
  {
    name: 'style',
    input: '<style></div></style</style >',
    tokens: [
      token('style', TokenKind.OpenTag, 1),
      token('', TokenKind.OpenTagEnd),
      token('</div>', TokenKind.Literal, index + 1),
      token('</style'),
      token('style ', TokenKind.CloseTag, index + 2),
    ],
  },
];
// let a = {
//   name: 'style',
//   input: `<div class="widget-body" data-spm-anchor-id="a1z4o.xxss.i3.14803e15bAFF41">
//   <span class="ctr-val g-csscut-more" style="display: inline-block;vertical-align: top;width:200px;”>
//   <a target="_blank" href="positionDetail.htm?id=44106" title="欢迎应聘蚂蚁金服支付宝前端工程师-杭州、上海、北京、成都">
//   欢迎应聘蚂蚁金服支付宝前端工程师-杭州、上海、北京、成都
//   </a></span></div>`,
//   tokens: [
//     token('style', TokenKind.OpenTag, 1),
//     token('', TokenKind.OpenTagEnd),
//     token('</div>', TokenKind.Literal, index + 1),
//     token('</style'),
//     token('style ', TokenKind.CloseTag, index + 2),
//   ],
// };
var a2 = {
  name: 'style',
  input: '<div><span></span></div>',
  tokens: [
    token('style', TokenKind.OpenTag, 1),
    token('', TokenKind.OpenTagEnd),
    token('</div>', TokenKind.Literal, index + 1),
    token('</style'),
    token('style ', TokenKind.CloseTag, index + 2),
  ],
};
describe('simple cases', function() {
  var e_1, _a;
  // console.log(88888);
  console.log(tokenize(a2.input), 'iii');
  var _loop_1 = function(_case) {
    it('case "' + _case.name + '"', function() {
      var tokens = tokenize(_case.input);
      // console.log(_case.input, tokens, 'tokens');
      assert.deepStrictEqual(tokens, _case.tokens);
    });
  };
  try {
    for (
      var cases_1 = __values(cases), cases_1_1 = cases_1.next();
      !cases_1_1.done;
      cases_1_1 = cases_1.next()
    ) {
      var _case = cases_1_1.value;
      _loop_1(_case);
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (cases_1_1 && !cases_1_1.done && (_a = cases_1.return))
        _a.call(cases_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
});
//# sourceMappingURL=tokenize.spec.js.map
