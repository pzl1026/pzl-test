/*!
 *
 * Copyright 2017 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2017-08-19 00:54:29
 * @version 1.0.0
 * @desc tokenize.ts
 */
var State;
(function(State) {
  State['Literal'] = 'Literal';
  State['BeforeOpenTag'] = 'BeforeOpenTag';
  State['OpeningTag'] = 'OpeningTag';
  State['AfterOpenTag'] = 'AfterOpenTag';
  State['InValueNq'] = 'InValueNq';
  State['InValueSq'] = 'InValueSq';
  State['InValueDq'] = 'InValueDq';
  State['ClosingOpenTag'] = 'ClosingOpenTag';
  State['OpeningSpecial'] = 'OpeningSpecial';
  State['OpeningDoctype'] = 'OpeningDoctype';
  State['OpeningNormalComment'] = 'OpeningNormalComment';
  State['InNormalComment'] = 'InNormalComment';
  State['InShortComment'] = 'InShortComment';
  State['ClosingNormalComment'] = 'ClosingNormalComment';
  State['ClosingTag'] = 'ClosingTag';
})(State || (State = {}));
export var TokenKind;
(function(TokenKind) {
  TokenKind['Literal'] = 'Literal';
  TokenKind['OpenTag'] = 'OpenTag';
  TokenKind['OpenTagEnd'] = 'OpenTagEnd';
  TokenKind['CloseTag'] = 'CloseTag';
  TokenKind['Whitespace'] = 'Whitespace';
  TokenKind['AttrValueEq'] = 'AttrValueEq';
  TokenKind['AttrValueNq'] = 'AttrValueNq';
  TokenKind['AttrValueSq'] = 'AttrValueSq';
  TokenKind['AttrValueDq'] = 'AttrValueDq';
})(TokenKind || (TokenKind = {}));
var state;
var buffer;
var bufSize;
var sectionStart;
var index;
var tokens;
var char;
var inScript;
var inStyle;
var offset;
function makeCodePoints(input) {
  return {
    lower: input
      .toLowerCase()
      .split('')
      .map(function(c) {
        return c.charCodeAt(0);
      }),
    upper: input
      .toUpperCase()
      .split('')
      .map(function(c) {
        return c.charCodeAt(0);
      }),
    length: input.length,
  };
}
var doctype = makeCodePoints('!doctype');
var style = makeCodePoints('style');
var script = makeCodePoints('script');
var Chars;
(function(Chars) {
  Chars[(Chars['_S'] = ' '.charCodeAt(0))] = '_S';
  Chars[(Chars['_N'] = '\n'.charCodeAt(0))] = '_N';
  Chars[(Chars['_T'] = '\t'.charCodeAt(0))] = '_T';
  Chars[(Chars['_R'] = '\r'.charCodeAt(0))] = '_R';
  Chars[(Chars['_F'] = '\f'.charCodeAt(0))] = '_F';
  Chars[(Chars['Lt'] = '<'.charCodeAt(0))] = 'Lt';
  Chars[(Chars['Ep'] = '!'.charCodeAt(0))] = 'Ep';
  Chars[(Chars['Cl'] = '-'.charCodeAt(0))] = 'Cl';
  Chars[(Chars['Sl'] = '/'.charCodeAt(0))] = 'Sl';
  Chars[(Chars['Gt'] = '>'.charCodeAt(0))] = 'Gt';
  Chars[(Chars['Qm'] = '?'.charCodeAt(0))] = 'Qm';
  Chars[(Chars['La'] = 'a'.charCodeAt(0))] = 'La';
  Chars[(Chars['Lz'] = 'z'.charCodeAt(0))] = 'Lz';
  Chars[(Chars['Ua'] = 'A'.charCodeAt(0))] = 'Ua';
  Chars[(Chars['Uz'] = 'Z'.charCodeAt(0))] = 'Uz';
  Chars[(Chars['Eq'] = '='.charCodeAt(0))] = 'Eq';
  Chars[(Chars['Sq'] = "'".charCodeAt(0))] = 'Sq';
  Chars[(Chars['Dq'] = '"'.charCodeAt(0))] = 'Dq';
  Chars[(Chars['Ld'] = 'd'.charCodeAt(0))] = 'Ld';
  Chars[(Chars['Ud'] = 'D'.charCodeAt(0))] = 'Ud';
})(Chars || (Chars = {}));
function isWhiteSpace() {
  return (
    char === Chars._S ||
    char === Chars._N ||
    char === Chars._T ||
    char === Chars._T ||
    char === Chars._R ||
    char === Chars._F
  );
}
function init(input) {
  state = State.Literal;
  buffer = input;
  bufSize = input.length;
  sectionStart = 0;
  index = 0;
  tokens = [];
  inScript = false;
  inStyle = false;
  offset = 0;
}
export function tokenize(input) {
  init(input);
  while (index < bufSize) {
    char = buffer.charCodeAt(index);
    switch (state) {
      case State.Literal:
        parseLiteral();
        break;
      case State.BeforeOpenTag:
        parseBeforeOpenTag();
        break;
      case State.OpeningTag:
        parseOpeningTag();
        break;
      case State.AfterOpenTag:
        parseAfterOpenTag();
        break;
      case State.InValueNq:
        parseInValueNq();
        break;
      case State.InValueSq:
        parseInValueSq();
        break;
      case State.InValueDq:
        parseInValueDq();
        break;
      case State.ClosingOpenTag:
        parseClosingOpenTag();
        break;
      case State.OpeningSpecial:
        parseOpeningSpecial();
        break;
      case State.OpeningDoctype:
        parseOpeningDoctype();
        break;
      case State.OpeningNormalComment:
        parseOpeningNormalComment();
        break;
      case State.InNormalComment:
        parseNormalComment();
        break;
      case State.InShortComment:
        parseShortComment();
        break;
      case State.ClosingNormalComment:
        parseClosingNormalComment();
        break;
      case State.ClosingTag:
        parseClosingTag();
        break;
      default:
        unexpected();
        break;
    }
    index++;
  }
  switch (state) {
    case State.Literal:
    case State.BeforeOpenTag:
    case State.InValueNq:
    case State.InValueSq:
    case State.InValueDq:
    case State.ClosingOpenTag:
    case State.InNormalComment:
    case State.InShortComment:
    case State.ClosingNormalComment:
      emitToken(TokenKind.Literal);
      break;
    case State.OpeningTag:
      emitToken(TokenKind.OpenTag);
      break;
    case State.AfterOpenTag:
      break;
    case State.OpeningSpecial:
      emitToken(TokenKind.OpenTag, State.InShortComment);
      break;
    case State.OpeningDoctype:
      if (index - sectionStart === doctype.length) {
        emitToken(TokenKind.OpenTag);
      } else {
        emitToken(TokenKind.OpenTag, void 0, sectionStart + 1);
        emitToken(TokenKind.Literal);
      }
      break;
    case State.OpeningNormalComment:
      if (index - sectionStart === 2) {
        emitToken(TokenKind.OpenTag);
      } else {
        emitToken(TokenKind.OpenTag, void 0, sectionStart + 1);
        emitToken(TokenKind.Literal);
      }
      break;
    case State.ClosingTag:
      emitToken(TokenKind.CloseTag);
      break;
    default:
      break;
  }
  var _tokens = tokens;
  init('');
  return _tokens;
}
function emitToken(kind, newState, end) {
  if (newState === void 0) {
    newState = state;
  }
  if (end === void 0) {
    end = index;
  }
  console.log(kind, newState, end, 'jjj');
  var value = buffer.substring(sectionStart, end);
  if (kind === TokenKind.OpenTag || kind === TokenKind.CloseTag) {
    value = value.toLowerCase();
  }
  if (kind === TokenKind.OpenTag) {
    if (value === 'script') {
      inScript = true;
    } else if (value === 'style') {
      inStyle = true;
    }
  }
  if (kind === TokenKind.CloseTag) {
    inScript = inStyle = false;
  }
  if (
    !(
      (kind === TokenKind.Literal || kind === TokenKind.Whitespace) &&
      end === sectionStart
    )
  ) {
    // empty literal should be ignored
    tokens.push({ type: kind, start: sectionStart, end: end, value: value });
  }
  if (kind === TokenKind.OpenTagEnd || kind === TokenKind.CloseTag) {
    sectionStart = end + 1;
    state = State.Literal;
  } else {
    sectionStart = end;
    state = newState;
  }
}
function parseLiteral() {
  if (char === Chars.Lt) {
    // <
    emitToken(TokenKind.Literal, State.BeforeOpenTag);
  }
}
function parseBeforeOpenTag() {
  if (inScript || inStyle) {
    if (char === Chars.Sl) {
      state = State.ClosingTag;
      sectionStart = index + 1;
    } else {
      state = State.Literal;
    }
    return;
  }
  if (
    (char >= Chars.La && char <= Chars.Lz) ||
    (char >= Chars.Ua && char <= Chars.Uz)
  ) {
    // <d
    state = State.OpeningTag;
    sectionStart = index;
  } else if (char === Chars.Sl) {
    // </
    state = State.ClosingTag;
    sectionStart = index + 1;
  } else if (char === Chars.Lt) {
    // <<
    emitToken(TokenKind.Literal);
  } else if (char === Chars.Ep) {
    // <!
    state = State.OpeningSpecial;
    sectionStart = index;
  } else if (char === Chars.Qm) {
    // <?
    // treat as short comment
    sectionStart = index;
    emitToken(TokenKind.OpenTag, State.InShortComment);
  } else {
    // <>
    // any other chars covert to normal state
    state = State.Literal;
  }
}
function parseOpeningTag() {
  if (isWhiteSpace()) {
    // <div ...
    emitToken(TokenKind.OpenTag, State.AfterOpenTag);
  } else if (char === Chars.Gt) {
    // <div>
    emitToken(TokenKind.OpenTag);
    emitToken(TokenKind.OpenTagEnd);
  } else if (char === Chars.Sl) {
    // <div/
    emitToken(TokenKind.OpenTag, State.ClosingOpenTag);
  }
}
function parseAfterOpenTag() {
  if (char === Chars.Gt) {
    // <div >
    emitToken(TokenKind.Whitespace);
    emitToken(TokenKind.OpenTagEnd);
  } else if (char === Chars.Sl) {
    // <div /
    emitToken(TokenKind.Whitespace, State.ClosingOpenTag);
  } else if (char === Chars.Eq) {
    // <div ...=...
    emitToken(TokenKind.Whitespace);
    emitToken(TokenKind.AttrValueEq, void 0, index + 1);
  } else if (char === Chars.Sq) {
    // <div ...'...
    emitToken(TokenKind.Whitespace, State.InValueSq);
  } else if (char === Chars.Dq) {
    // <div ..."...
    emitToken(TokenKind.Whitespace, State.InValueDq);
  } else if (!isWhiteSpace()) {
    // <div ...name...
    emitToken(TokenKind.Whitespace, State.InValueNq);
  }
}
function parseInValueNq() {
  if (char === Chars.Gt) {
    // <div xxx>
    emitToken(TokenKind.AttrValueNq);
    emitToken(TokenKind.OpenTagEnd);
  } else if (char === Chars.Sl) {
    // <div xxx/
    emitToken(TokenKind.AttrValueNq, State.ClosingOpenTag);
  } else if (char === Chars.Eq) {
    // <div xxx=
    emitToken(TokenKind.AttrValueNq);
    emitToken(TokenKind.AttrValueEq, State.AfterOpenTag, index + 1);
  } else if (isWhiteSpace()) {
    // <div xxx ...
    emitToken(TokenKind.AttrValueNq, State.AfterOpenTag);
  }
}
function parseInValueSq() {
  if (char === Chars.Sq) {
    // <div 'xxx'
    emitToken(TokenKind.AttrValueSq, State.AfterOpenTag, index + 1);
  }
}
function parseInValueDq() {
  if (char === Chars.Dq) {
    // <div "xxx", problem same to Sq
    emitToken(TokenKind.AttrValueDq, State.AfterOpenTag, index + 1);
  }
}
function parseClosingOpenTag() {
  if (char === Chars.Gt) {
    // <div />
    emitToken(TokenKind.OpenTagEnd);
  } else {
    // <div /...>
    emitToken(TokenKind.AttrValueNq, State.AfterOpenTag);
    parseAfterOpenTag();
  }
}
function parseOpeningSpecial() {
  switch (char) {
    case Chars.Cl: // <!-
      state = State.OpeningNormalComment;
      break;
    case Chars.Ld: // <!d
    case Chars.Ud: // <!D
      state = State.OpeningDoctype;
      break;
    default:
      emitToken(TokenKind.OpenTag, State.InShortComment);
      break;
  }
}
function parseOpeningDoctype() {
  offset = index - sectionStart;
  if (offset === doctype.length) {
    // <!d, <!d , start: 0, index: 2
    if (isWhiteSpace()) {
      emitToken(TokenKind.OpenTag, State.AfterOpenTag);
    } else {
      unexpected();
    }
  } else if (char === Chars.Gt) {
    // <!DOCT>
    emitToken(TokenKind.OpenTag, void 0, sectionStart + 1);
    emitToken(TokenKind.Literal);
    emitToken(TokenKind.OpenTagEnd);
  } else if (doctype.lower[offset] !== char && doctype.upper[offset] !== char) {
    // <!DOCX...
    emitToken(TokenKind.OpenTag, State.InShortComment, sectionStart + 1);
  }
}
function parseOpeningNormalComment() {
  if (char === Chars.Cl) {
    // <!--
    emitToken(TokenKind.OpenTag, State.InNormalComment, index + 1);
  } else {
    emitToken(TokenKind.OpenTag, State.InShortComment, sectionStart + 1);
  }
}
function parseNormalComment() {
  if (char === Chars.Cl) {
    // <!-- ... -
    emitToken(TokenKind.Literal, State.ClosingNormalComment);
  }
}
function parseShortComment() {
  if (char === Chars.Gt) {
    // <! ... >
    emitToken(TokenKind.Literal);
    emitToken(TokenKind.OpenTagEnd);
  }
}
function parseClosingNormalComment() {
  offset = index - sectionStart;
  if (offset === 2) {
    if (char === Chars.Gt) {
      // <!-- xxx -->
      emitToken(TokenKind.OpenTagEnd);
    } else if (char === Chars.Cl) {
      // <!-- xxx ---
      emitToken(TokenKind.Literal, void 0, sectionStart + 1);
    } else {
      // <!-- xxx --x
      state = State.InNormalComment;
    }
  } else if (char !== Chars.Cl) {
    // <!-- xxx - ...
    state = State.InNormalComment;
  }
}
function parseClosingTag() {
  offset = index - sectionStart;
  if (inStyle) {
    if (char === Chars.Lt) {
      sectionStart -= 2;
      emitToken(TokenKind.Literal, State.BeforeOpenTag);
    } else if (offset < style.length) {
      if (style.lower[offset] !== char && style.upper[offset] !== char) {
        sectionStart -= 2;
        state = State.Literal;
      }
    } else if (char === Chars.Gt) {
      emitToken(TokenKind.CloseTag);
    } else if (!isWhiteSpace()) {
      sectionStart -= 2;
      state = State.Literal;
    }
  } else if (inScript) {
    if (char === Chars.Lt) {
      sectionStart -= 2;
      emitToken(TokenKind.Literal, State.BeforeOpenTag);
    } else if (offset < script.length) {
      if (script.lower[offset] !== char && script.upper[offset] !== char) {
        sectionStart -= 2;
        state = State.Literal;
      }
    } else if (char === Chars.Gt) {
      emitToken(TokenKind.CloseTag);
    } else if (!isWhiteSpace()) {
      sectionStart -= 2;
      state = State.Literal;
    }
  } else if (char === Chars.Gt) {
    // </ xxx >
    emitToken(TokenKind.CloseTag);
  }
}
function unexpected() {
  throw new SyntaxError(
    'Unexpected token "' +
      buffer.charAt(index) +
      '" at ' +
      index +
      ' when parse ' +
      state,
  );
}
//# sourceMappingURL=tokenize2.js.map
