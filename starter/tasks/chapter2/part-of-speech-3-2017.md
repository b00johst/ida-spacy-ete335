---
title: 'Part of speech'
description:
  'Part of speech tagging'
type: task
location: tasks
id: 20173
prev: null
next: null
---


# Part of speech tagging
The evaluation of a part-of-speech tagger produced the following confusion matrix.The marked cell gives the number of times the system tagged a word as a verb (VB)whereas the gold standard specified it as a noun (NN).

<exercise id="40" title="Confusion Matrix">


<multi-answer>

Estimate the relevant probabilities from the following document collection usingMaximum Likelihood estimation. Answer with fractions.

|     | NN                   | JJ     | VB   |
|-----|----------------------|--------|------|
| NN  |58                    |6       | 1    |
| JJ  |5                     |11      | 2    |
| VB  |0                     |7       | 43   |

a) Set up a fraction for the tagger’s accuracy.  
<regex-input regex="12\/133" id=1></regex-input>
<br>
<br>
b) Set up fractions for the tagger’s recall on verbs and its precision on nouns. 
<regex-input regex="58\/63" id=2></regex-input>

</multi-answer>





</exercise>


<exercise id=13>
Set up a fraction for the tagger’s accuracy.


<multi-answer>

<strong>P(</strong><regex-input regex="right" id=1></regex-input><strong>|</strong><regex-input regex="left" id=1></regex-input><strong>)</strong>

</multi-answer>


</exercise>
