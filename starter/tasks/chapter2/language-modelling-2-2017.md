---
title: 'Language Modelling'
description:
  'Language modelling'
type: task
location: tasks
id: 20172
prev: null
next: null
---


# Corpus of Contemporary 
For the 520 million word Corpus of Contemporary American English, 
we have thefollowing counts of unigrams and bigrams:
- your, 883,614; rights, 80,891;
- doorposts,21; 
- your rights, 378; 
- your doorposts, 0.

<exercise id="41" title="Confusion Matrix">


<multi-answer>

a) Estimate the probabilities $P(your)$ and $P(rights∣your)$ using Maximum Likeli-hood estimation. Answer with fractions.


|                  | Answer                                           |
|------------------|--------------------------------------------------|
| $P(your)$        | <regex-input regex="12\/133" id=1></regex-input> |
| $P(rights∣your)$ | <regex-input regex="12\/133" id=2></regex-input> |


<br>
<br>

<br>
<br>

b) Estimate the bigram probability $P(doorposts∣your)$ using Maximum Likelihoodestimation and add- k smoothing with $k = 0.01$. Assume that the vocabularyconsists of $1,254,193$ unique words. Answer with a fraction.

Answer:
<regex-input regex="58\/63" id=3></regex-input>

</multi-answer>





</exercise>


<exercise id=13>
Set up a fraction for the tagger’s accuracy.


<multi-answer>

<strong>P(</strong><regex-input regex="right" id=1></regex-input><strong>|</strong><regex-input regex="left" id=2></regex-input><strong>)</strong>

</multi-answer>


</exercise>
