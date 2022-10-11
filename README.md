# Japanese Tokenizer Example

## Abstract

The multilingualism for the auto-link appears in the matter of word separation in an article text. Unlike common West European languages, specific east Asian languages like Japanese don't use spacing for word separation. Therefore, we need to find out extracting Tag words in a text somehow. In many cases, we use Tokeniser for this purpose. It works as a text parser and should presume the word separation and adequately separate each word.

Suppose that we have a Japanese text like this:

> `ココ・シャネル`が手掛けたツイード生地のスーツが、1923年8月パリのコレクションにて披露されました。それをさらに進化させ1954年に完成したのが今の`シャネルスーツ`。上流階級のセレブや公人の多くが`シャネル`のスーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ返るほどの人気ぶりでした。

Three kinds of mutually similar words appear in a text, `ココ・シャネル`, `シャネルスーツ`, `シャネル`, but only two of them are Tags defined by the definition as follows:

```javascript
const definitions = [
  ['ココ・シャネル', 'https://www.vogue.co.jp/tag/coco-chanel'],
  ['シャネル', 'https://www.vogue.co.jp/tag/chanel']
];
```

We expect the parser to pick up those tag names and markup them as a link to each Tag page in the article text:

> <a href="https://www.vogue.co.jp/tag/coco-chanel">ココ・シャネル</a>が手掛けたツイード生地のスーツが、1923年8月パリのコレクションにて披露されました。それをさらに進化させ1954年に完成したのが今のシャネルスーツ。上流階級のセレブや公人の多くが<a href="https://www.vogue.co.jp/tag/chanel">シャネル</a>のスーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ返るほどの人気ぶりでした。

## Example Code

There are several Japanese tokenizer libraries in npm, but I chose
[tiny-segmenter](https://www.npmjs.com/package/tiny-segmenter) this time because it's the most lightweight. It works without any dictionary, and it's written in pure JavaScript. It's also easy to use like as follows:

```javascript
const TinySegmenter = require('tiny-segmenter');
const segmenter = new TinySegmenter();
const text = 'ココ・シャネルが手掛けたツイード生地のスーツが、1923年8月パリのコレクションにて披露されました。それをさらに進化させ1954年に完成したのが今のシャネルスーツ。上流階級のセレブや公人の多くがシャネルのスーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ返るほどの人気ぶりでした。';
const tokens = segmenter.tokenize(text);

console.log(tokens); // It shows an array of tokens
```

You may find working code in [demo.js](demo.js) and its test in [demo.test.js](demo.test.js).

## Appendix

## How to set up the project

Whether you use the `.bashrc` or not is optional, so it is totally up to you, but I encourage you to give it a try to see once. If you use the `.bashrc`, run the following commands to create a dot file and edit them to fill required credentials or customise:

```bash
cat docker/.env.dist > docker/.env
```

Then, source the `.bashrc` if you'd like. You might want to use a terminal multiplexer like [tmux](https://github.com/tmux/tmux/wiki) to avoid env vars and command alias contamination:

```bash
source .bashrc
```
