"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAst = void 0;

var _react = _interopRequireDefault(require("react"));

var _rehypeReact = _interopRequireDefault(require("rehype-react"));

var _exercise = _interopRequireDefault(require("./components/exercise"));

var _code = _interopRequireDefault(require("./components/code"));

var _link = require("./components/link");

var _slides = _interopRequireDefault(require("./components/slides"));

var _choice = _interopRequireWildcard(require("./components/answer-types/choice"));

var _typography = require("./components/typography");

var _taskExercise = _interopRequireDefault(require("./components/task-exercise"));

var _math = _interopRequireDefault(require("./components/math"));

var _multiChoice = _interopRequireDefault(require("./components/answer-types/multi-choice"));

var _shortAnswer = _interopRequireWildcard(require("./components/answer-types/short-answer"));

var _numerical = _interopRequireDefault(require("./components/answer-types/numerical"));

var _inputType = require("./components/answer-types/input-type");

var _tableAnswer = _interopRequireDefault(require("./components/answer-types/table-answer"));

var _questions = require("./components/answer-types/questions");

var _video = _interopRequireDefault(require("./components/video"));

var _text = require("./components/text");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderAst = new _rehypeReact["default"]({
  createElement: _react["default"].createElement,
  components: {
    exercise: _taskExercise["default"],
    //Exercise
    slides: _slides["default"],
    codeblock: _code["default"],
    choice: _choice["default"],
    multichoice: _multiChoice["default"],
    opt: _choice.Option,
    input: _shortAnswer.Input,
    a: _link.Link,
    hr: _typography.Hr,
    h3: _typography.H3,
    ol: _typography.Ol,
    ul: _typography.Ul,
    li: _typography.Li,
    code: _typography.InlineCode,
    "exact-input": _inputType.ExactInput,
    "exact-numeric": _inputType.ExactNumeric,
    "ranged-numeric": _inputType.RangedNumeric,
    math: _math["default"],
    questions: _questions.questions,
    "video": _video["default"],
    text: _text.Text,
    matchraw: _inputType.TableInput,
    match: _inputType.RexegMatch,
    "table-answer": _tableAnswer["default"]
  }
}).Compiler;
exports.renderAst = renderAst;