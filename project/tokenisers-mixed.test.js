const fs = require('fs');
const TinySegmenter = require('tiny-segmenter');
const {asyncTokenizer} = require('./src/kuromoji/asyncTokenizer');
const {markupTagNames} = require('./src/linkAutogen/markup');

const materialText = fs.readFileSync('./material/mixedLang-en.txt', 'utf-8');
const tagDefinitions = [
  ['Snowman', '/tag/snowman'],
  ['雪だるま', '/tag/snowman'],
  ['Snowball', '/tag/snowball'],
  ['雪玉', '/tag/snowball'],
  ['SNOW', '/tag/snow'],
  ['雪', '/tag/snow']
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
        const tokens = (new TinySegmenter()).segment(text);

        expect(tagNames.every((tagName) => tokens.includes(tagName[0].toLowerCase()))).toBeFalsy();
        tagNames.forEach((tagName) => {
          expect(tokens).toContain(tagName[0].toLowerCase());
        });
      });
    });
  });

  describe('Kuromoji', () => {
    describe('tokenize', () => {
      it('picks up all expected words from sample text', async () => {
        const kuromojiTokenizer = await asyncTokenizer();
        const tokens = kuromojiTokenizer.tokenize(text).map((token) => token.surface_form);

        expect(tagNames.every((tagName) => tokens.includes(tagName[0].toLowerCase()))).toBeTruthy();
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
  const expectedText = '粉雪で<a href="/tag/snowman">雪だるま</a>を作るのは、粉雪自体がくっつかない上に、' +
    '<a href="/tag/snow">雪</a>の温度が下がるとクラストと呼ばれる粉雪の密度が高くなり使い物にならないので、' +
    '難しいです。したがって、雪だるまを作るには、十分な量の雪が降った次の暖かい午後に直接作るのがよいかもしれません。' +
    'コンパクトな雪を使えば、転がすだけで大きな<a href="/tag/snowball">雪玉</a>を作ることができる。雪玉が芝生の' +
    '底に着くと、芝生や砂利、土の跡を拾うことがあります。Making a <a href="/tag/snowman">snowman</a> of ' +
    'powdered <a href="/tag/snow">snow</a> is difficult since it will not stick to itself, and if the ' +
    'temperature of packing snow drops, it will form an unusable denser form of powdered snow called the ' +
    'crust. Thus, a good time to build a snowman may be the next warm afternoon directly following ' +
    'a snowfall with a sufficient amount of snow. Using more compact snow allows for the construction ' +
    'of a large <a href="/tag/snowball">snowball</a> by simply rolling it until it grows to the desired ' +
    'size. If the snowball reaches the bottom of the grass it may pick up traces of grass, gravel, or dirt.';

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

  describe('Kuromoji', () => {
    it('marks up all expected tag names', async () => {
      const kuromojiTokenizer = await asyncTokenizer();
      const tokens = kuromojiTokenizer.tokenize(text).map((token) => token.surface_form);
      markupTagNames(tokens, [...tagNames]);

      expect(tokens.join('')).toEqual(expectedText);
    });
  });
});
