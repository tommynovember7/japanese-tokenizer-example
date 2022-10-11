# Japanese Tokenizer Example

## Abstract

The multilingualism for the auto-link appears in the matter of word separation 
in an article text. Unlike common West European languages, specific east Asian 
languages like Japanese don't use spacing for word separation. Therefore, the 
parser to extract tag words from a text should presume the meaning of the text
and adequately pick the tag words up.

Suppose that we have a text like this:

> ココ・シャネルが手掛けたツイード生地のスーツが、1923年8月パリのコレクションにて披露されました。それをさらに進化させ1954年に完成したのが今のシャネルスーツ。上流階級のセレブや公人の多くがシャネルのスーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ返るほどの人気ぶりでした。

Three types of mutually similar words appear in a text, `ココ・シャネル`, `シャネルスーツ`,
`シャネル`, but only two of them are Tags defined by the definition as follows: 

```javascript
const definitions = [
  ['ココ・シャネル', 'https://www.vogue.co.jp/tag/coco-chanel'],
  ['シャネル', 'https://www.vogue.co.jp/tag/chanel']
];
```

We expect the parser to pick up those tag names correctly and markup them as a
link to each Tag page in the article text:


> <a href="/tag/coco-chanel">ココ・シャネル</a>が手掛けたツイード生地のスーツが、1923年8月パリのコレクションにて披露されました。それをさらに進化させ1954年に完成したのが今のシャネルスーツ。上流階級のセレブや公人の多くが<a href="/tag/chanel">シャネル</a>のスーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ返るほどの人気ぶりでした。

## Example Code

There are several Japanese tokenizer libraries in npm, but I chose
[tiny-segmenter](https://www.npmjs.com/package/tiny-segmenter) this time because 
it's the most lightweight. It works without any dictionary, and it's written in 
pure JavaScript. It's also easy to use like as follows:

```javascript
const TinySegmenter = require('tiny-segmenter');
const segmenter = new TinySegmenter();
const text = 'ココ・シャネルが手掛けたツイード生地のスーツが、1923年8月パリのコレクションにて披露されました。それをさらに進化させ1954年に完成したのが今のシャネルスーツ。上流階級のセレブや公人の多くがシャネルのスーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ返るほどの人気ぶりでした。';
const tokens = segmenter.tokenize(text);

console.log(tokens); // It shows an array of tokens
```

You may find working code in [demo.js](demo.js) and its test in [demo.test.js](demo.test.js).
