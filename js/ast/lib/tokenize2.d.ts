/*!
 *
 * Copyright 2017 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2017-08-19 00:54:29
 * @version 1.0.0
 * @desc tokenize.ts
 */
export declare enum TokenKind {
  Literal = 'Literal',
  OpenTag = 'OpenTag',
  OpenTagEnd = 'OpenTagEnd',
  CloseTag = 'CloseTag',
  Whitespace = 'Whitespace',
  AttrValueEq = 'AttrValueEq',
  AttrValueNq = 'AttrValueNq',
  AttrValueSq = 'AttrValueSq',
  AttrValueDq = 'AttrValueDq',
}
export interface IToken {
  start: number;
  end: number;
  value: string;
  type: TokenKind;
}
export declare function tokenize(input: string): IToken[];
