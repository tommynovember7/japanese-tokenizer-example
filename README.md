# Japanese Tokenizer Example

## Abstract

The multilingualism for the auto-link appears in the matter of text segmentation in an article text. Unlike common West European languages, specific east Asian languages like Japanese don't use spacing for word separation. Therefore, we need to find out extracting Tag words in a text somehow. In many cases, we use Tokeniser for this purpose. It works as a text parser and should presume the word separation and adequately separate each word.

Suppose that we have a Japanese text like this:

> `ココ・シャネル`が手掛けたツイード生地のスーツが、1923年8月パリのコレクションにて披露されました。それをさらに進化させ1954年に完成したのが今の`シャネルスーツ`。上流階級のセレブや公人の多くが`シャネル`のスーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ返るほどの人気ぶりでした。

Three kinds of mutually similar words appear in the text, `ココ・シャネル`, `シャネルスーツ`, `シャネル`, but only two of them are Tags defined by the definition as follows:

```javascript
const definitions = [
  ['ココ・シャネル', 'https://www.vogue.co.jp/tag/coco-chanel'],
  ['シャネル', 'https://www.vogue.co.jp/tag/chanel']
];
```

In this case, we expect the parser to extract each word and markup only two of the tag names as links to each Tag page in the article text:

> <a href="https://www.vogue.co.jp/tag/coco-chanel">ココ・シャネル</a>が手掛けたツイード生地のスーツが、1923年8月パリのコレクションにて披露されました。それをさらに進化させ1954年に完成したのが今のシャネルスーツ。上流階級のセレブや公人の多くが<a href="https://www.vogue.co.jp/tag/chanel">シャネル</a>のスーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ返るほどの人気ぶりでした。

## The realistic options of Japanese Tokeniser

There are several Japanese tokeniser libraries in npm, but we currently have two primary options for practical usage: [TinySegmenter](https://www.npmjs.com/package/tiny-segmenter) and [Kuromoji](https://www.npmjs.com/package/kuromoji). Most others depend on one of them. Both execution performances are good enough, but differences appear in the dictionary extensibility and project data size:

- TinySegmenter
  - Compact and simple functions
  - Dictionary-free
  - Tokenising method: synchronous
- Kuromoji
  - Full range of functions as a Japanese tokeniser
  - Extensible dictionary
  - Tokenising method: asynchronous

### *Snowman* issue

There is a case worth considering, the Snowman issue. 雪だるま is the Japanese translation of the English word *snowman*, and a tokeniser should pick it out from the following text:

> A snowman is a sculpture made of snow. 雪だるまは雪でできた彫刻です。

As you see, `snow` and `snowman` coexist within the text. Tokenisers are expected to extract the words, `snow`, `snowman`, `雪` and `雪だるま`. Kuromoji can do this using its default dictionary, but TinySegmenter can't recognise the word `雪だるま`.

It shows that we should improve the dictionary when facing unrecognisable words. TinySegmenter doesn't use a dictionary to keep its simplicity, so we can't customise its ability. That could be an issue.

### Conclusion

Website Tags are growing day by day and continuously incorporating new words. To expect better performance from a tokeniser, we must constantly improve its dictionary. I think we might have to use Kuromoji to generate links to Tags automatically.

A possible improvement strategy is that we should continuously update the Kuromoji dictionary to add newly entered new Japanese tags. It might be ideal If we can emit a NEW_TAG event, and a particular app queues a batch job to update and deploy the dictionary.

## Example code

### Kuromoji

```javascript
const {asyncTokenizer} = require('./src/kuromoji/asyncTokenizer');

const text = 'A snowman is a sculpture made of snow. 雪だるまは雪でできた彫刻です。';

(async () => {
  const kuromojiTokenizer = await asyncTokenizer();
  const tokens = kuromojiTokenizer.tokenize(text).map((token) => token.surface_form);

  console.log(tokens); // It shows an array of words
})(text);
```

### TinySegmenter

```javascript
const TinySegmenter = require('tiny-segmenter');

const text = 'A snowman is a sculpture made of snow. 雪だるまは雪でできた彫刻です。';
const segmenter = new TinySegmenter();
const tokens = segmenter.segment(text);

console.log(tokens); // It shows an array of words
```

You may find a working example in [sample-kuromoji.js](project/sample-kuromoji.js) and its test in [sample-tinySegmenter.js](project/sample-tinySegmenter.js).

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
