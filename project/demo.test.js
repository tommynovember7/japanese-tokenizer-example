const TinySegmenter = require('tiny-segmenter');
const {generateLinks} = require('./demo');

describe('TinySegmenter', () => {
  let text;
  let tagNames;

  beforeEach(() => {
    text = 'ココ・シャネルが手掛けたツイード生地のスーツが、1923年8月パリのコレクションにて披露されました。' +
      'それをさらに進化させ1954年に完成したのが今のシャネルスーツ。上流階級のセレブや公人の多くが' +
      'シャネルのスーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ返る' +
      'ほどの人気ぶりでした。';
  });

  describe('TinySegmenter.segment', () => {
    it('pick expected words up from sample text', () => {
      tagNames = [
        ['ココ・シャネル', '/tag/coco-chanel'],
        ['シャネルスーツ', '/tag/chanel-suits'],
        ['シャネル', '/tag/chanel']
      ];
      const segments = (new TinySegmenter()).segment(text);
      tagNames.map((tagName) => expect(segments).toContain(tagName[0]));
    });
  });

  describe('generateLinks', () => {
    it('replace expected words with anchor tags', () => {
      tagNames = [
        ['ココ・シャネル', '/tag/coco-chanel'],
        ['シャネル', '/tag/chanel']
      ];
      const expectedText = '<a href="/tag/coco-chanel">ココ・シャネル</a>が手掛けたツイード生地のスーツが、1923年8月パリの' +
        'コレクションにて披露されました。それをさらに進化させ1954年に完成したのが今のシャネルスーツ。上流階級のセレブや公人の' +
        '多くが<a href="/tag/chanel">シャネル</a>のスーツを愛用したことで世界的に流行し、そのデザインをコピーしたもので溢れ' +
        '返るほどの人気ぶりでした。';
      const segments = (new TinySegmenter()).segment(text);

      generateLinks(segments, [...tagNames]);
      expect(segments.join('')).toEqual(expectedText);
    });
  });
});
