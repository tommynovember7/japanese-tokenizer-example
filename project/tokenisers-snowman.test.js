const TinySegmenter = require('tiny-segmenter');
const {asyncTokenizer} = require('./src/kuromoji/asyncTokenizer');

const materialText = 'A snowman is a sculpture made of snow. 雪だるまは雪でできた彫刻です。';
const tagDefinitions = [
  ['Snowman', '/tag/snowman'],
  ['雪だるま', '/tag/snowman'],
  ['SNOW', '/tag/snow'],
  ['雪', '/tag/snow']
];

describe('Tokenizers', () => {
  let tagNames;

  beforeEach(() => {
    tagNames = [...tagDefinitions];
  });

  describe('TinySegmenter', () => {
    describe('segment', () => {
      it('picks up all expected words from sample text', () => {
        const tokens = (new TinySegmenter()).segment(materialText);

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
        const kuromojiTokenizer = await asyncTokenizer('./node_modules/kuromoji/dict');
        const tokens = kuromojiTokenizer.tokenize(materialText).map((token) => token.surface_form);

        expect(tagNames.every((tagName) => tokens.includes(tagName[0].toLowerCase()))).toBeTruthy();
        tagNames.forEach((tagName) => {
          expect(tokens).toContain(tagName[0].toLowerCase());
        });
      });
    });
  });
});
