import React from 'react'
import rehypeReact from 'rehype-react'


import CodeBlock from './components/code'
import { Link } from './components/link'
import Slides from './components/slides'
import Choice from './components/answer-types/choice'
import { H3, Hr, Ol, Ul, Li, InlineCode } from './components/typography'
import TaskExercise from './components/task-exercise';
import Math from './components/math';
import MultiChoice from './components/answer-types/multi-choice'
import { RegexInput } from './components/answer-types/input-type';
import { ExactMatch, NumericMatch, RangeMatch, RexegMatch } from './components/answer-types/match-type'
import MultiAnswer from './components/multi-answer'
import SelectChoice from './components/answer-types/select-choice'
import Video from './components/video'
import { Text } from './components/text'
import { Option } from './components/answer-types/option'

export const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        exercise: TaskExercise, //Exercise
        slides: Slides,
        codeblock: CodeBlock,
        choice: Choice,
        multichoice: MultiChoice,
        opt: Option,
        a: Link,
        hr: Hr,
        h3: H3,
        ol: Ol,
        ul: Ul,
        li: Li,
        code: InlineCode,
        "exact-match": ExactMatch,
        "numeric-match": NumericMatch,
        "range-match": RangeMatch,
        math: Math,
        "video": Video,
        text: Text,
        "regex-input": RegexInput,
        "regex-match": RexegMatch,
        "multi-answer": MultiAnswer,
        "select-choice" : SelectChoice
    },
}).Compiler
