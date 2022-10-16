const TinySegmenter = require('tiny-segmenter');

const text = 'A snowman is a sculpture made of snow. 雪だるまは雪でできた彫刻です。';
const segmenter = new TinySegmenter();
const tokens = segmenter.segment(text);

console.log(tokens); // It shows an array of words
