const fs = require('fs');
const TinySegmenter = require('tiny-segmenter');
const {asyncTokenizer} = require('./src/kuromoji/asyncTokenizer');
const {markupTagNames} = require('./src/linkAutogen/markup');

const materialText = fs.readFileSync('./material/japanese.txt', 'utf-8');
const tagDefinitions = [
  ['ココ・シャネル', '/tag/coco-chanel'],
  ['シャネルスーツ', '/tag/chanel-suits'],
  ['シャネル', '/tag/chanel']
];


describe('Tokenizers', () => {
  let text;
  let tagNames;

  beforeEach(() => {
    text = materialText.split(/\r?\n/).join('');
    tagNames = [...tagDefinitions];
  });

  describe('TinySegmenter', () => {
    describe('segment', () => {
      it('picks up all expected words from sample text', () => {
        const segments = (new TinySegmenter()).segment(text);

        tagNames.forEach((tagName) => {
          expect(segments).toContain(tagName[0]);
        });
      });
    });
  });

  describe('kuromoji', () => {
    describe('tokenize', () => {
      it('picks up all expected words from sample text', async () => {
        const kuromojiTokenizer = await asyncTokenizer();
        const tokens = kuromojiTokenizer.tokenize(text).map((token) => token.surface_form);

        tagNames.forEach((tagName) => {
          expect(tokens).toContain(tagName[0].toLowerCase());
        });
      });
    });
  });
});


describe('generateTagLinks', () => {
  let text;
  let tagNames;
  const expectedText = '<a href="/tag/coco-chanel">ココ・シャネル</a>が手掛けたツイード生地のスーツが、1923年8月パリの' +
    'コレクションにて披露されました。それをさらに進化させ1954年に完成したのが今の' +
    '<a href="/tag/chanel-suits">シャネルスーツ</a>。上流階級のセレブや公人の多くが<a href="/tag/chanel">シャネル</a>の' +
    'スーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ返るほどの人気ぶりでした。';

  beforeEach(() => {
    text = materialText.split(/\r?\n/).join('');
    tagNames = [...tagDefinitions];
  });

  describe('TinySegmenter', () => {
    it('marks up all expected tag names', () => {
      const tokens = (new TinySegmenter()).segment(text);
      markupTagNames(tokens, [...tagNames]);

      expect(tokens.join('')).toEqual(expectedText);
    });
  });

  describe('kuromoji', () => {
    it('marks up all expected tag names', async () => {
      const kuromojiTokenizer = await asyncTokenizer();
      const tokens = kuromojiTokenizer.tokenize(text).map((token) => token.surface_form);
      markupTagNames(tokens, [...tagNames]);

      expect(tokens.join('')).toEqual(expectedText);
    });
  });
});
